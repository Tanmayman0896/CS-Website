"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function RollingSections() {
  const landingRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!landingRef.current || !section2Ref.current || !logoRef.current) return;

    gsap.to(landingRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
        trigger: section2Ref.current,
        start: "top 70%",
        end: "top top",
        scrub: true,
        },
    });


    }, []);

  return (
    <div>

      <section
        ref={landingRef}
        className="h-screen sticky top-0 flex items-center justify-between px-32 bg-[#1a1a1a] text-white z-10 relative"
        >

        <div className="z-10 translate-x-30">
            <p
            className="text-white font-bold text-3xl
            [-webkit-text-stroke:2px_#facc15]
            [paint-order:stroke_fill]
            drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]
            drop-shadow-[0_0_16px_rgba(250,204,21,0.5)]">
            What's On
            </p>

            <h1
            className="font-bold text-8xl
            [-webkit-text-stroke:2px_#facc15]
            [paint-order:stroke_fill]
            drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]
            drop-shadow-[0_0_16px_rgba(250,204,21,0.5)]">
            Events
            </h1>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  
            <div className="logoWrapper relative flex items-center justify-center">

                <Image
                ref={logoRef}
                src="/logos/calendar-logo-center.png"
                alt="cal-logo"
                width={350}
                height={350}
                className="object-contain relative z-10 mix-blend-screen "
                />
                
                <div className="sparkContainer">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="spark"></span>
                ))}
                </div>

            </div>

            </div>

        <div className="z-10 -translate-x-20">
            <h1
            className="font-bold text-8xl
            [-webkit-text-stroke:2px_#facc15]
            [paint-order:stroke_fill]
            drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]
            drop-shadow-[0_0_16px_rgba(250,204,21,0.5)]">
            Calendar
            </h1>
        </div>

        </section>

      <section
        ref={section2Ref}
        className="h-screen flex items-center justify-center bg-black text-white relative z-20"
      >
        <img
        src="/images/events/tear.svg"
        alt="tear divider"
        className="w-full -translate-y-[60vh] opacity-100"
      />
      </section>

      <section className="h-screen flex items-center justify-center bg-gray-900 text-white">
        
      </section>

    </div>
  );
}