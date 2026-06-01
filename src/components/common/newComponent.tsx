"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewComponent() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageDivRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageDivRef.current,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5, 
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="mobile-new-component-section relative min-h-screen py-20 lg:py-0 lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[10vh] overflow-x-hidden"
    >
      <style>{`
        @media (max-width: 1023px) {
          .mobile-new-component-section {
            padding-top: clamp(6rem, 15vh, 10rem) !important;
            padding-bottom: clamp(6rem, 18vh, 10rem) !important;
          }
        }
      `}</style>
      
      <div className="flex flex-col justify-center gap-6 lg:gap-10 w-full lg:w-[40vw] px-6 lg:px-0">
        <h1 className="font-bold text-[#f9a71f] text-4xl md:text-5xl lg:text-6xl text-center lg:text-left">
          World <br className="hidden lg:block" /> Drivers&apos;
        </h1>

        <h1 className="text-[#f9a71f] text-4xl md:text-5xl lg:text-6xl text-center lg:text-left lg:-translate-y-10 font-serif">
          Champion
        </h1>

        <p className="text-[#f9a71f] text-lg md:text-xl lg:text-2xl text-center lg:text-left">
          Celebrate this incredible moment with a collection designed for the
          fans who never stopped believing. Wear it, frame it, treasure it
          forever.
        </p>

        <button className="text-[#000000] text-lg border-4 border-[#f9a71f] bg-[#f9a71f] w-fit self-center lg:self-start px-6 py-2">
          Visit the Store
        </button>
      </div>

      {/* Images */}
      <div
        ref={imageDivRef}
        className="relative w-full lg:w-[40vw] h-[50vh] lg:h-[80vh] will-change-transform flex items-center justify-center lg:block"
      >
        <img
          src="/images/events/2.avif"
          alt="cover"
          className="h-full object-cover lg:translate-x-20"
        />

        <img
          src="/images/team/pic3.svg"
          alt="cover"
          className="top-[5vh] lg:top-[20vh] right-[5vw] lg:right-[2vh] absolute h-[25%] lg:h-[30%] object-cover lg:translate-x-20"
        />

        <img
          src="/images/team/pic4.svg"
          alt="cover"
          className="-bottom-[5vh] lg:-bottom-[8vh] left-[5vw] lg:-left-20 absolute h-[25%] lg:h-[30%] object-cover lg:translate-x-20"
        />
      </div>
    </div>
  );
}
