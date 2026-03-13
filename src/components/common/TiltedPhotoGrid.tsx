"use client";

import React from "react";
import Image from "next/image";
import { eventImages } from "@/src/data/eventImages";

export default function TiltedPhotoGrid() {
  const gridItems = Array(10).fill(eventImages).flat();

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden h-full w-full pointer-events-none">

      <div
        className="absolute origin-center transition-transform duration-[2000ms] ease-out will-change-transform"
        style={{
          transform: "rotate(-30deg) scale(1.3)",
          width: "200vw",
          height: "200vh",
        }}
      >
        <div
          className="grid gap-[0.5vw] h-full items-center justify-center content-center"
          style={{
            gridTemplateColumns: "repeat(10, minmax(150px, 15vw))",
          }}
        >
          {gridItems.map((src, index) => (
            <div
              key={index}
              className="relative w-[15vw] h-[22vw] min-w-[150px] min-h-[220px] rounded-[1vw] overflow-hidden bg-zinc-800 flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Grid image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className={
                  index === Math.floor(gridItems.length / 2)
                    ? ""
                    : "grayscale"
                }
                sizes="(max-width: 768px) 30vw, 15vw"
                quality={75}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}