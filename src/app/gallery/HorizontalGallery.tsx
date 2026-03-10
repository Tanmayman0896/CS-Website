'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scroller.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.skill-set');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: scroller.current,
          pin: true,
          scrub: 0.8,
          snap: 1 / (sections.length - 1),
          invalidateOnRefresh: true,
          anticipatePin: 1,
          end: () => '+=' + scroller.current!.offsetWidth,
        },
      });
    }, scroller);

    return () => {
      ctx.revert(); // Kills animation and unpins the trigger
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={scroller}
        className="flex w-[200vw] min-h-screen text-white relative bg-transparent"
      >

        {/* SECTION 1 */}
        <section className="skill-set relative w-screen h-full px-12">
          <div className="absolute right-[600px] top-[150px] w-[25vw] h-[35vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">QATAR_2024</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa04b14a1ca33c0b25_ln-home-horiz-1.webp"
              alt="Image 1"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>

          <div className="absolute right-[600px] bottom-[120px] w-[15vw] h-[20vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">QATAR_2024</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baab12220595c8223b3_ln-home-horiz-2.webp"
              alt="Image 2"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>

          <div className="absolute right-[0px] bottom-[120px] w-[28vw] h-[45vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">QATAR_2024</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302babcf12f0111d96322e_ln-home-horiz-3-p-500.webp"
              alt="Image 3"
              fill
              className="object-contain object-left"
              sizes="50vw"
              priority
            />
          </div>

          <div className="absolute right-[0px] top-[120px] w-[28vw] h-[45vh]">
            <p className="text-[#f9ba1f] text-[12px]">It doesn’t matter where</p>
            <p className="text-[#f9ba1f] text-[12px]">you start, it’s how you</p>
            <p className="text-[#f9ba1f] text-[12px]">progress from there.</p>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="skill-set relative w-screen h-full flex items-center justify-center px-12">
          <div className="absolute left-[100px] top-[150px] w-[18vw] h-[18vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">
              MONACO, 2023</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa798e2cc6e02ac38a_ln-home-horiz-4-p-500.webp"
              alt="Image 4"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>
          <div className="absolute left-[180px] bottom-[180px] w-[27vw] h-[27vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">
              BRITAIN, 2025</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68da85d632bfefc552a0faac_Britain-25%20(1).webp"
              alt="Image 5"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>
          <div className="absolute left-[570px] bottom-[80px] w-[25vw] h-[25vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">
              BATTERSEA, 2024</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa14a96f3cdd2f9a95_ln-home-horiz-6-p-500.webp"
              alt="Image 6"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>
          <div className="absolute right-[720px] top-[180px] w-[20vw] h-[20vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">
              HIGH PERFORMANCE GALA, 2024</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302bab3ee6e26b1f434a7d_ln-home-horiz-7.webp"
              alt="Image 7"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>
          <div className="absolute right-[200px] top-[150px] w-[30vw] h-[48vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">
              BARCELONA, 2024</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baaedf821dd2e3a7c74_ln-home-horiz-8-p-500.webp"
              alt="Image 8"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>
          <div className="absolute right-[200px] bottom-[180px] w-[30vw] h-[10vh]">
            <p className="text-[#f9ba1f] text-[22px] p-0">Since I was 7 years old and had my first</p>
            <p className="text-[#f9ba1f] text-[22px] p-0">experience with kart racing, I’ve worked</p>
            <p className="text-[#f9ba1f] text-[22px] p-0">tirelessly to make that dream come true.</p>
          </div>
          <div className="absolute right-[40px] bottom-[130px] w-[10vw] h-[25vh]">
            <p className="text-[#f9ba1f] text-[7px] translate-y-[-25px]">
              BARCELONA, 2024</p>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302bab4f762cdbc5e93415_ln-home-horiz-10.webp"
              alt="Image 9"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>
        </section>

      </div>
    </div>
  );
}