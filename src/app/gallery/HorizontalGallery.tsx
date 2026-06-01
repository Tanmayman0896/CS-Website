'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from 'framer-motion';
import BoxReveal from '@/components/common/BoxReveal';

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.15,
    },
  },
};

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const scroller = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!scroller.current || !wrapper.current) return;

    // Scoped query for sections to prevent transition conflicts
    const sections = gsap.utils.toArray<HTMLElement>('.skill-set', wrapper.current);
    if (sections.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollDistance = () => {
        if (!scroller.current) return 0;
        return scroller.current.scrollWidth - window.innerWidth;
      };

      // 1. Pinned Horizontal Track ScrollTrigger (Handles locking full-screen at top top)
      const st = ScrollTrigger.create({
        trigger: scroller.current,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        start: "top top",
        end: () => '+=' + getScrollDistance(),
        id: "gallery-pin",
      });

      // 2. Horizontal Translation Animation ScrollTrigger (Starts sliding early at 50% scroll)
      ScrollTrigger.create({
        trigger: scroller.current,
        scrub: 1,
        invalidateOnRefresh: true,
        start: "top center", // Starts horizontal translation early when gallery reaches center
        end: () => '+=' + (getScrollDistance() + window.innerHeight / 2), // Total scroll distance from center to end of pin
        animation: gsap.to(scroller.current, {
          x: () => -getScrollDistance(),
          ease: 'none',
        }),
        id: "gallery-anim",
      });

      // 3. Section 1 Items Fade/Slide-in
      const section1Items = gsap.utils.toArray<HTMLElement>('.skill-set:nth-child(1) > div', wrapper.current);
      gsap.set(section1Items, { y: 120, x: 60, opacity: 0 });

      ScrollTrigger.create({
        trigger: scroller.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(section1Items, {
            y: 0,
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            stagger: 0.12,
            duration: 0.9,
          });
        },
        id: "gallery-fade-in-1",
      });

      // 4. Section 2 Items Scrub Transition (Synced with anim start)
      const section2Items = gsap.utils.toArray<HTMLElement>('.skill-set:nth-child(2) > div', wrapper.current);
      gsap.set(section2Items, { y: 120, x: 60, opacity: 0 });

      ScrollTrigger.create({
        trigger: scroller.current,
        scrub: 0.8,
        start: 'top center', // Synced with animation start at center
        end: () => '+=' + (getScrollDistance() + window.innerHeight / 2),
        animation: gsap.to(section2Items, {
          y: 0,
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.05,
        }),
        id: "gallery-scrub-2",
      });
    });

    // Mobile specific animations if any
    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray<HTMLElement>('.skill-set > div:not(.no-gsap)', wrapper.current);

      items.forEach((item) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    });

    // Safe delayed refresh to allow images/fonts/Next.js hydration layout to stabilize
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, { scope: wrapper });


  return (
    <div
      ref={wrapper}
      className="overflow-hidden transition-colors duration-500"
    >
      <style>{`
        @media (max-width: 767px) {
          .mobile-gallery-section {
            padding-top: clamp(6rem, 15vh, 10rem) !important;
          }
          .mobile-gallery-end-section {
            padding-bottom: clamp(6rem, 15vh, 10rem) !important;
          }
        }
      `}</style>
      <div
        ref={scroller}
        className="flex flex-col md:flex-row md:w-[200vw] w-full min-h-screen text-white relative bg-transparent"
      >
        {/* Background Curves (Mobile) */}
        <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none md:hidden overflow-hidden opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 4000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 0C-100 800 500 1600 0 2400C500 3200 -100 3800 400 4000" stroke="#f9ba1f" strokeWidth="2" />
            <circle cx="200" cy="800" r="250" stroke="#f9ba1f" strokeWidth="0.5" />
            <circle cx="100" cy="2000" r="200" stroke="#f9ba1f" strokeWidth="0.5" />
            <circle cx="350" cy="3400" r="300" stroke="#f9ba1f" strokeWidth="0.5" />
          </svg>
        </div>

        {/* SECTION 1 */}
        <section className="skill-set mobile-gallery-section relative w-full md:w-screen h-auto md:h-full px-6 md:px-12 pt-[clamp(3.5rem,10vw,6rem)] pb-20 md:py-0 flex flex-col md:block gap-32 md:gap-20">
          <div className="relative md:absolute md:right-[600px] md:top-[150px] w-[80%] md:w-[25vw] h-[40vh] md:h-[35vh] ml-auto mt-8 md:mt-0">
            <BoxReveal
              align="justify-start md:justify-end"
              className="md:translate-y-[-25px] md:absolute right-0 md:right-auto mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">QATAR_2024</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa04b14a1ca33c0b25_ln-home-horiz-1.webp"
              alt="Image 1"
              fill
              className="z-0 translate-y-6 md:translate-y-0 object-contain object-right md:object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:right-[600px] md:bottom-[120px] w-[65%] md:w-[15vw] h-[35vh] md:h-[20vh] mr-auto">
            <BoxReveal
              align="justify-start"
              className="md:translate-y-[-25px] md:absolute mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">QATAR_2024</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baab12220595c8223b3_ln-home-horiz-2.webp"
              alt="Image 2"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:right-[0px] md:bottom-[120px] w-[75%] md:w-[28vw] h-[45vh] md:h-[45vh] ml-auto">
            <BoxReveal
              align="justify-start md:justify-end"
              className="md:translate-y-[-25px] md:absolute right-0 md:right-auto mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">QATAR_2024</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302babcf12f0111d96322e_ln-home-horiz-3-p-500.webp"
              alt="Image 3"
              fill
              className="object-contain object-right md:object-left"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:right-[0px] md:top-[120px] w-full md:w-[28vw] pb-4 -translate-y-16 md:translate-y-0 md:mt-0 md:pb-0 md:py-0 text-center md:text-right no-gsap flex flex-col items-center md:items-end">
            <motion.div
              variants={textContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="w-full flex flex-col items-center md:items-end"
            >
              <BoxReveal align="justify-center md:justify-end" boxColor="#f9ba1f" duration={2.5} widthClass="w-fit">
                <p className="text-[#f9ba1f] text-[18px] md:text-[12px]">It doesn&apos;t matter where</p>
              </BoxReveal>
              <BoxReveal align="justify-center md:justify-end" boxColor="#f9ba1f" duration={2.5} widthClass="w-fit">
                <p className="text-[#f9ba1f] text-[18px] md:text-[12px]">you start, it&apos;s how you</p>
              </BoxReveal>
              <BoxReveal align="justify-center md:justify-end" boxColor="#f9ba1f" duration={2.5} widthClass="w-fit">
                <p className="text-[#f9ba1f] text-[18px] md:text-[12px]">progress from there.</p>
              </BoxReveal>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="skill-set mobile-gallery-end-section relative w-full md:w-screen h-auto md:h-full flex flex-col md:items-center md:justify-center px-6 md:px-12 py-20 md:py-0 gap-32 md:gap-20">
          <div className="relative md:absolute md:left-[100px] md:top-[150px] w-[60%] md:w-[18vw] h-[35vh] md:h-[18vh] mr-auto">
            <BoxReveal
              align="justify-start"
              className="md:translate-y-[-25px] md:absolute mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">MONACO, 2023</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa798e2cc6e02ac38a_ln-home-horiz-4-p-500.webp"
              alt="Image 4"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:left-[180px] md:bottom-[180px] w-[80%] md:w-[27vw] h-[45vh] md:h-[27vh] ml-auto">
            <BoxReveal
              align="justify-start md:justify-end"
              className="md:translate-y-[-25px] md:absolute right-0 md:right-auto mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">BRITAIN, 2025</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68da85d632bfefc552a0faac_Britain-25%20(1).webp"
              alt="Image 5"
              fill
              className="object-contain object-right md:object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:left-[570px] md:bottom-[80px] w-[70%] md:w-[25vw] h-[40vh] md:h-[25vh] mr-auto">
            <BoxReveal
              align="justify-start"
              className="-translate-y-6 md:translate-y-[-25px] md:absolute mb-2 z-20"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">BATTERSEA, 2024</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa14a96f3cdd2f9a95_ln-home-horiz-6-p-500.webp"
              alt="Image 6"
              fill
              className="z-0 object-contain object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:right-[720px] md:top-[180px] w-[65%] md:w-[20vw] h-[35vh] md:h-[20vh] ml-auto">
            <BoxReveal
              align="justify-start md:justify-end"
              className="md:translate-y-[-25px] md:absolute right-0 md:right-auto mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">HIGH PERFORMANCE GALA, 2024</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302bab3ee6e26b1f434a7d_ln-home-horiz-7.webp"
              alt="Image 7"
              fill
              className="object-contain object-right md:object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:right-[200px] md:top-[150px] w-[85%] md:w-[30vw] h-[55vh] md:h-[48vh] mr-auto">
            <BoxReveal
              align="justify-start"
              className="md:translate-y-[-25px] md:absolute mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">BARCELONA, 2024</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baaedf821dd2e3a7c74_ln-home-horiz-8-p-500.webp"
              alt="Image 8"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="relative md:absolute md:right-[200px] md:bottom-[180px] w-full md:w-[30vw] py-10 md:py-0 text-center md:text-left flex flex-col items-center md:items-start">
            <motion.div
              variants={textContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="w-full flex flex-col items-center md:items-start"
            >
              <BoxReveal align="justify-center md:justify-start" boxColor="#f9ba1f" duration={2.5} widthClass="w-fit">
                <p className="text-[#f9ba1f] text-[20px] md:text-[22px] p-0">Since I was 7 years old and had my first</p>
              </BoxReveal>
              <BoxReveal align="justify-center md:justify-start" boxColor="#f9ba1f" duration={2.5} widthClass="w-fit">
                <p className="text-[#f9ba1f] text-[20px] md:text-[22px] p-0">experience with kart racing, I&apos;ve worked</p>
              </BoxReveal>
              <BoxReveal align="justify-center md:justify-start" boxColor="#f9ba1f" duration={2.5} widthClass="w-fit">
                <p className="text-[#f9ba1f] text-[20px] md:text-[22px] p-0">tirelessly to make that dream come true.</p>
              </BoxReveal>
            </motion.div>
          </div>

          <div className="relative md:absolute md:right-[40px] md:bottom-[130px] w-full md:w-[10vw] h-[40vh] md:h-[25vh]">
            <BoxReveal
              align="justify-start"
              className="md:translate-y-[-25px] md:absolute mb-2"
              widthClass="w-fit"
              marginClass="my-0"
              paddingClass="p-0"
              boxColor="#f9ba1f"
              duration={2.5}
              standalone={true}
            >
              <p className="text-[#f9ba1f] text-[10px] md:text-[7px]">BARCELONA, 2024</p>
            </BoxReveal>
            <Image
              src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302bab4f762cdbc5e93415_ln-home-horiz-10.webp"
              alt="Image 9"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>
        </section>

      </div>
    </div>
  );
}