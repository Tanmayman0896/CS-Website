import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordAnim = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
} as const;

function Word({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.span
      variants={wordAnim}
      className={`whitespace-nowrap ${className}`}
      style={style}
    >
      {children}
    </motion.span>
  );
}

export default function ImpactText() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@700;800;900&display=swap');
      `}</style>

      <section className="w-full py-6 sm:py-8 lg:py-10 flex justify-center items-center px-4 md:px-8 bg-transparent relative z-10 selection:bg-[#F4A119] selection:text-black">
        <div className="max-w-[85rem] mx-auto text-center flex flex-col items-center justify-center text-[#e4e4e1]">

          <motion.h2
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-[1.7rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] sm:leading-[0.85] lg:leading-[0.8] tracking-tight uppercase font-black flex flex-col items-center w-full"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >

            {/* Line 1 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
              <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                <span className="uppercase">REDEFINING</span>
              </Word>
              <Word>BOUNDARIES,</Word>
            </div>

            {/* Line 2 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full mt-1 sm:mt-2 lg:mt-3">
              <Word>DRIVING</Word>
              <Word>INNOVATION</Word>
              <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                <span className="uppercase">FORWARD.</span>
              </Word>
            </div>

            {/* Line 3 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full mt-1 sm:mt-2 lg:mt-3">
              <Word>SHAPING</Word>
              <Word>A</Word>
              <Word>LEGACY</Word>
              <Word>IN</Word>
            </div>

            {/* Line 4 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full mt-1 sm:mt-2 lg:mt-3">
              <Word>TECHNOLOGY</Word>
              <Word>WHERE</Word>
              <Word>INNOVATION</Word>
              <Word>EVOLVES</Word>
            </div>

            {/* Line 5 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full mt-1 sm:mt-2 lg:mt-3">
              <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                <span className="uppercase">INTO</span>
              </Word>
              <Word>LASTING</Word>
              <Word>IMPACT.</Word>
              
            </div>
              
            {/* Line 6 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full mt-1 sm:mt-2 lg:mt-3">
              <Word>ON</Word>
              <Word>AND</Word>
              <Word>OFF</Word>
              <Word>THE</Word>
            </div>

            {/* Line 7 */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full mt-1 sm:mt-2 lg:mt-3">
              <Word>TRACK.</Word>
            </div>

          </motion.h2>
        </div>
      </section>

      <br /><br /><br /><br /><br />
    </>
  );
}