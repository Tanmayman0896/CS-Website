"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StackingImageProps {
  src: string;
  alt?: string;
  targetId: string; 
}

export default function StackingImage({
  src,
  alt = "",
  targetId,
}: StackingImageProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targetEl = document.getElementById(targetId);
    let trigger: ReturnType<typeof ScrollTrigger.create> | null = null;

    if (targetEl) {
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.set(targetEl, {
            scale: 1 - self.progress * 0.04,
            filter: `brightness(${1 - self.progress * 0.28})`,
          });
        },
        onLeaveBack: () => {
          gsap.set(targetEl, { scale: 1, filter: "brightness(1)" });
        },
      });
    }

    return () => {
      trigger?.kill();
      if (targetEl) gsap.set(targetEl, { scale: 1, filter: "brightness(1)" });
    };
  }, [targetId]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </section>
  );
}
