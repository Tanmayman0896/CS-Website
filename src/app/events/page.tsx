"use client";

import { useEffect, useRef } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";

const TiltedPhotoGrid = dynamic(() => import("@/components/common/TiltedPhotoGrid"), { ssr: false });
const Eventcard = dynamic(() => import("@/components/common/Eventcard"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Event() {
  const landingRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!landingRef.current || !section2Ref.current) return;

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <section
        ref={landingRef}
        className="h-screen sticky top-0 flex items-center justify-between px-32 bg-[#1a1a1a] text-white z-10 relative"
      >
        <TiltedPhotoGrid />
      </section>

      <section
        ref={section2Ref}
        className="relative h-fit flex items-center justify-center bg-black text-white z-20"
      >
        <img
          src="/images/events/tear.svg"
          alt="tear divider"
          className="absolute w-full -top-17 md:-top-50 opacity-100"
        />
        <section className="bg-black w-screen overflow-hidden z-40 flex items-center justify-center -mt-12 md:mt-0">
          <Eventcard />
        </section>
      </section>
    </SmoothScrollProvider>
  );
}