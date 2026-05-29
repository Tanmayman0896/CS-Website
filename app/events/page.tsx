"use client";

import { useRef } from "react";
import React from "react";
import TiltedPhotoGrid from "@/src/components/common/TiltedPhotoGrid";
import Eventcard from "@/src/components/common/Eventcard";

export default function Event() {
  const landingRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);

  return (
    <>

      <section
        ref={landingRef}
        className="h-screen sticky top-0 flex items-center justify-between px-32 bg-[#1a1a1a] text-white z-10 relative"
      >
        <TiltedPhotoGrid />
      </section>

      <section
        ref={section2Ref}
        className="relative h-fit flex items-center justify-center bg-black text-white relative z-20"
      >
        <img
          src="/images/events/tear.svg"
          alt="tear divider"
          className="absolute w-full -top-[200px] opacity-100"
        />

        <section className="bg-black w-screen overflow-hidden z-40 flex items-center justify-center">
          <Eventcard />
        </section>
      </section>

    </>
  );
}