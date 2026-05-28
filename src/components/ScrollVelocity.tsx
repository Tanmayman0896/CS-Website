import React, { useRef, useLayoutEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

/**
 * Measures element width WITHOUT triggering React re-renders.
 * Uses a ref instead of useState to avoid re-render cascades during scroll/resize.
 * The width is read directly in the animation frame where it's needed.
 */
function useElementWidthRef<T extends HTMLElement>(ref: React.RefObject<T | null>): React.MutableRefObject<number> {
  const widthRef = useRef(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    // Set initial width
    widthRef.current = element.offsetWidth;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        if (rect) {
          widthRef.current = rect.width;
        } else {
          widthRef.current = element.offsetWidth;
        }
      }
    });

    resizeObserver.observe(element);

    // Also trigger update once fonts are fully loaded to avoid layout shifts
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        if (ref.current) {
          widthRef.current = ref.current.offsetWidth;
        }
      });
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return widthRef;
}

function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className = '',
  damping,
  stiffness,
  numCopies,
  velocityMapping,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}: VelocityTextProps) {
  const baseX = useMotionValue(0);

  // Track the actual window scroll (page scroll) instead of the non-scrollable container ref.
  // This eliminates layout thrashing/reflow on every scroll event and correctly measures velocity.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Use a much higher damping and lower stiffness by default to smooth out any instant velocity spikes.
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 100,
    stiffness: stiffness ?? 100
  });

  // Cap the velocity factor map to [0, 1.2] and enable clamping to prevent wild spinning on rapid scrolls.
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 1.2],
    { clamp: true }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  // Use ref-based width measurement to prevent React re-renders during scroll
  const copyWidthRef = useElementWidthRef(copyRef);

  const wrap = useCallback((min: number, max: number, v: number): number => {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }, []);

  const x = useTransform(baseX, v => {
    const w = copyWidthRef.current;
    if (w === 0) return '0px';
    // Round to nearest pixel to prevent subpixel font rendering instability
    // (large text at fractional pixel positions causes visible baseline jitter)
    return `${Math.round(wrap(-w, 0, v))}px`;
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    // Clamp frame delta to prevent massive jumps/glitches during lag spikes or tab switching
    const clampedDelta = Math.min(delta, 100);
    const rawVFactor = velocityFactor.get();
    
    // Extra safety cap: guarantee the speedup factor is always bounded to prevent visual blur/stutter
    const vFactor = Math.max(-1.5, Math.min(1.5, rawVFactor));
    let moveBy = directionFactor.current * baseVelocity * (clampedDelta / 1000);

    // Dead zone: prevent direction flipping when velocity is near zero
    // (spring oscillation around 0 causes rapid reversals = visual stutter)
    if (vFactor < -0.05) {
      directionFactor.current = -1;
    } else if (vFactor > 0.05) {
      directionFactor.current = 1;
    }
    // else: keep current direction (dead zone)

    moveBy += directionFactor.current * moveBy * vFactor;
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < (numCopies ?? 6); i++) {
    spans.push(
      <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
        {children}&nbsp;
      </span>
    );
  }

  return (
    <div className={`${parallaxClassName || ''} relative overflow-hidden`} style={parallaxStyle}>
      <motion.div
        className={`${scrollerClassName || ''} flex whitespace-nowrap text-center font-sans text-2xl font-bold tracking-[-0.02em] antialiased sm:text-4xl md:text-[5rem] md:leading-[5rem]`}
        style={{ 
          x, 
          willChange: "transform",
          backfaceVisibility: "hidden",
          ...scrollerStyle 
        }}
      >
        {spans}
      </motion.div>
    </div>
  );
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 50, // Premium slower base velocity
  className = '',
  damping = 100, // Higher damping for smoother transitions
  stiffness = 100, // Lower stiffness to avoid speed spikes
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 1.2] }, // Capped speedup factor
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
