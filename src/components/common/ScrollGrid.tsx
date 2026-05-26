'use client';

import { useRef, useState, useEffect, memo } from 'react';
import {
    useScroll,
    useTransform,
    motion,
    MotionValue,
    AnimatePresence,
} from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const IMAGES = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=600&q=80',
    'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80',
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=90',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80',
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80',
    'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=600&q=80',
];

interface CellProps {
    index: number;
    scrollProgress: MotionValue<number>;
    activeIndex: number | null;
    gridComplete: boolean;
    onClick: () => void;
    cols: number;
    heroIndex: number;
}

// Memoised — only re-renders when its own props change, not on every scroll tick
const GridCell = memo(function GridCell({
    index,
    scrollProgress,
    activeIndex,
    gridComplete,
    onClick,
    cols,
    heroIndex,
}: CellProps) {
    const isHero = index === heroIndex;
    const isActive = activeIndex === index;
    const hasActive = activeIndex !== null;

    const col = index % cols;
    const row = Math.floor(index / cols);
    const heroCOL = heroIndex % cols;
    const heroROW = Math.floor(heroIndex / cols);
    const dx = col - heroCOL;
    const dy = row - heroROW;
    const dist = Math.max(Math.abs(dx), Math.abs(dy));

    // Reduce the delay scale to make elements appear faster in succession
    const delay = dist * 0.03;

    // Start earlier, end earlier, smaller gap
    const enterStart = 0.10 + delay;
    const enterEnd = Math.min(enterStart + 0.25, 0.95);

    // Speed up hero transformation to match
    const heroScale = useTransform(scrollProgress, [0, 0.3], [2.5, 1]);
    const heroBorderRadius = useTransform(scrollProgress, [0, 0.3], [12, 4]);

    const siblingY = useTransform(scrollProgress, [enterStart, enterEnd], [`${dy * 80 + 40}px`, '0px']);
    const siblingX = useTransform(scrollProgress, [enterStart, enterEnd], [`${dx * 25}px`, '0px']);
    const siblingScale = useTransform(scrollProgress, [enterStart, enterEnd], [0.82, 1]);

    const dimFilter = hasActive && !isActive ? 'grayscale(100%) brightness(0.5)' : 'none';
    const dimOpacity = hasActive && !isActive ? 0.6 : 1;

    if (isHero) {
        return (
            <motion.div
                layoutId={`img-${index}`}
                className="relative w-full aspect-square overflow-hidden cursor-pointer"
                onClick={gridComplete ? onClick : undefined}
                style={{
                    scale: heroScale,
                    borderRadius: heroBorderRadius,
                    aspectRatio: '1/1',
                    zIndex: isActive ? 50 : 10,
                    willChange: 'transform',
                }}
                animate={{ filter: dimFilter, opacity: dimOpacity }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                <img
                    src={IMAGES[index]}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    style={{ transform: 'translateZ(0)', display: 'block' }}
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            layoutId={`img-${index}`}
            className="relative w-full aspect-square overflow-hidden cursor-pointer"
            onClick={gridComplete ? onClick : undefined}
            style={{
                y: siblingY,
                x: siblingX,
                scale: siblingScale,
                borderRadius: 4,
                zIndex: isActive ? 50 : 1,
            }}
            animate={{
                filter: dimFilter,
                opacity: hasActive && !isActive ? 0.6 : (gridComplete ? 1 : 0),
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <img
                src={IMAGES[index]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ transform: 'translateZ(0)', display: 'block' }}
            />
        </motion.div>
    );
});

export default function ScrollGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [gridComplete, setGridComplete] = useState(false);
    
    // Check if on mobile view
    const isMobile = useMediaQuery({ maxWidth: 767 });
    
    const cols = isMobile ? 3 : 5;
    const heroIndex = isMobile ? 4 : 7;
    const totalItems = isMobile ? 9 : 15;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Subscribe once, re-subscribe only when gridComplete changes — properly cleaned up
    useEffect(() => {
        const unsub = scrollYProgress.on('change', (v) => {
            if (v > 0.55 && !gridComplete) setGridComplete(true);
            if (v < 0.35 && gridComplete) {
                setGridComplete(false);
                setActiveIndex(null);
            }
        });
        return unsub;
    }, [scrollYProgress, gridComplete]);

    const handleClick = (index: number) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    const gridOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0]);

    return (
        <div ref={containerRef} style={{ height: '350vh', position: 'relative' }}>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 30,
                }}
            >
                <AnimatePresence>
                    {activeIndex !== null && (
                        <motion.div
                            key="backdrop"
                            className="absolute inset-0 z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
                            onClick={() => setActiveIndex(null)}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {activeIndex !== null && (
                        <motion.div
                            key={`zoomed-${activeIndex}`}
                            layoutId={`img-${activeIndex}`}
                            className="absolute z-40 overflow-hidden cursor-pointer"
                            style={{ borderRadius: 8, width: 'min(80vw, 560px)', aspectRatio: '1/1' }}
                            initial={false}
                            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                            onClick={() => setActiveIndex(null)}
                        >
                            <img
                                src={IMAGES[activeIndex]}
                                alt=""
                                className="w-full h-full object-cover"
                                style={{ display: 'block' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: gridOpacity,
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridAutoRows: 'auto',
                            gap: 'clamp(4px, 1.2vw, 16px)',
                            width: isMobile ? 'min(92vw, 400px)' : 'min(96vw, 960px)',
                            height: 'max-content',
                            alignContent: 'center',
                            zIndex: 20,
                            position: 'relative'
                        }}
                    >
                        {Array.from({ length: totalItems }).map((_, i) => (
                            <GridCell
                                key={i}
                                index={i}
                                scrollProgress={scrollYProgress}
                                activeIndex={activeIndex}
                                gridComplete={gridComplete}
                                onClick={() => handleClick(i)}
                                cols={cols}
                                heroIndex={heroIndex}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
            <br /><br />
        </div>
        
    );
}
