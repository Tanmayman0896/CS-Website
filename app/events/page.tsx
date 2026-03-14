"use client";

import { useEffect, useRef } from "react";
import React from "react";
import TiltedPhotoGrid from "@/src/components/common/TiltedPhotoGrid";
import Eventcard from "@/src/components/common/Eventcard";



export default function Event() {
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
    <>
      {/* <section className="relative min-h-screen bg-gradient-to-b from-gray-500 to-black overflow-hidden">

        <div className="absolute inset-0 z-0">
          
        </div>

        <TornEdge />

      </section>

      <section className="relative bg-black overflow-hidden">
        <Eventcard />
      </section> */}
      <section
        ref={landingRef}
        className="h-screen sticky top-0 flex items-center justify-between px-32 bg-[#1a1a1a] text-white z-10 relative"
        >
          <TiltedPhotoGrid />
        </section>

      <section
        ref={section2Ref}
        className="relative h-[100vh] flex items-center justify-center bg-black text-white relative z-20"
      >
        <img
        src="/images/events/tear.svg"
        alt="tear divider"
        className="absolute w-full -translate-y-[60vh] opacity-100"
      />
      <section className=" bg-black w-screen overflow-hidden z-30">
        <Eventcard />
      </section>
      </section>

      {/* <section className="relative bg-black overflow-hidden">
        <Eventcard />
      </section> */}
    </>
  );
}