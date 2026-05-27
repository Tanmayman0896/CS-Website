import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16, // gorgeous overlapping stagger cascade (approx. 14.5% of duration)
      delayChildren: 0.08,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    x: -15, // elegant cinematic shift following the sweep
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1, // premium weighty duration
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const boxVariants = {
  hidden: {
    x: "0%", // gold box is static and present initially
  },
  visible: {
    x: "103%", // slides out cleanly to reveal text
    transition: {
      duration: 1.1, // matching weighted duration
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function CinematicLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {},
      }}
      className="relative flex justify-center items-center select-none w-full -my-1 sm:-my-2"
    >
      {/* Boxed Reveal Container bounds the block to the text dimensions with ample vertical padding */}
      <div className="relative overflow-hidden px-4 py-3 sm:py-5 flex items-center justify-center">
        {/* Animated text layer */}
        <motion.div
          variants={textVariants}
          className="relative z-10 transform-gpu flex items-center justify-center py-1"
          style={{
            willChange: "transform, opacity",
          }}
        >
          {children}
        </motion.div>

        {/* Solid gold reveal block */}
        <motion.div
          variants={boxVariants}
          className="absolute inset-0 bg-[#F4A119] z-20 pointer-events-none transform-gpu"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    </motion.div>
  );
}

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
      `}</style>

      <section className="w-full py-6 sm:py-8 lg:py-10 flex justify-center items-center px-4 md:px-8 bg-transparent relative z-10 selection:bg-[#F4A119] selection:text-black">
        <div className="max-w-[85rem] mx-auto text-center flex flex-col items-center justify-center text-[#e4e4e1]">

          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="text-[1.7rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.0] sm:leading-[0.95] lg:leading-[0.9] tracking-tight uppercase font-black flex flex-col items-center w-full"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >

            {/* Line 1 */}
            <CinematicLine>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
                <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">REDEFINING</span>
                </Word>
                <Word>LIMITS,</Word>
              </div>
            </CinematicLine>

            {/* Line 2 */}
            <CinematicLine>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
                <Word>FIGHTING</Word>
                <Word>FOR</Word>
                <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">WINS,</span>
                </Word>
              </div>
            </CinematicLine>

            {/* Line 3 */}
            <CinematicLine>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
                <Word>BRINGING</Word>
                <Word>IT</Word>
                <Word>ALL</Word>
                <Word>IN</Word>
              </div>
            </CinematicLine>

            {/* Line 4 */}
            <CinematicLine>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
                <Word>ALL</Word>
                <Word>WAYS.</Word>
                <Word>DEFINING</Word>
                <Word>A</Word>
              </div>
            </CinematicLine>

            {/* Line 5 */}
            <CinematicLine>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
                <Word className="text-[#F4A119] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">LEGACY</span>
                </Word>
                <Word>IN</Word>
                <Word>FORMULA</Word>
                <Word>1</Word>
              </div>
            </CinematicLine>

            {/* Line 6 */}
            <CinematicLine>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
                <Word>ON</Word>
                <Word>AND</Word>
                <Word>OFF</Word>
                <Word>THE</Word>
              </div>
            </CinematicLine>

            {/* Line 7 */}
            <CinematicLine>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full">
                <Word>TRACK.</Word>
              </div>
            </CinematicLine>

          </motion.h2>
        </div>
      </section>

      <br /><br /><br /><br /><br />
    </>
  );
}