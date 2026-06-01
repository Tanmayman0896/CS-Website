import React from 'react';
import { motion } from 'framer-motion';
import BoxReveal from './BoxReveal';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18, // slightly faster stagger (approx 14% of duration)
      delayChildren: 0.08,
    },
  },
};

function Word({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`whitespace-nowrap ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}

export default function ImpactText() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@700;800;900&display=swap');
        
        @media (max-width: 767px) {
          .mobile-hero-section {
            padding-bottom: clamp(6rem, 18vh, 10rem) !important;
          }
        }
      `}</style>

      <section className="mobile-hero-section w-full pt-6 pb-[clamp(3.5rem,12vw,7rem)] sm:py-8 lg:py-10 flex justify-center items-center px-4 md:px-8 bg-transparent relative z-10 selection:bg-[#F4A119] selection:text-black">
        <div className="max-w-[85rem] mx-auto text-center flex flex-col items-center justify-center text-[#e4e4e1]">

          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-25% 0px" }}
            className="text-[1.7rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.0] sm:leading-[0.95] lg:leading-[0.9] tracking-tight uppercase font-black flex flex-col items-center w-full"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >

            {/* Line 1 */}
            <BoxReveal duration={2.5} widthClass="w-fit">
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-fit">
                <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">REDEFINING</span>
                </Word>
                <Word>BOUNDARIES,</Word>
              </div>
            </BoxReveal>

            {/* Line 2 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-fit">
              <BoxReveal duration={2.5} widthClass="w-fit">
                <div className="flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
                  <Word>DRIVING</Word>
                  <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                    <span className="uppercase">INNOVATION</span>
                  </Word>
                </div>
              </BoxReveal>
              <BoxReveal duration={2.5} widthClass="w-fit">
                <Word>FORWARD.</Word>
              </BoxReveal>
            </div>

            {/* Line 3 */}
            <BoxReveal duration={2.5} widthClass="w-fit">
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-fit">
                <Word>UNITING</Word>
                <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">STRENGTHS,</span>
                </Word>
              </div>
            </BoxReveal>

            {/* Line 4 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-fit">
              <BoxReveal duration={2.5} widthClass="w-fit">
                <div className="flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
                  <Word>SHAPING</Word>
                  <Word>TECHNOLOGY'S</Word>
                </div>
              </BoxReveal>
              <BoxReveal duration={2.5} widthClass="w-fit">
                <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">FUTURE.</span>
                </Word>
              </BoxReveal>
            </div>

          </motion.h2>
        </div>
      </section>
    </>
  );
}