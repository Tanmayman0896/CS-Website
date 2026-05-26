"use client";

import dynamic from "next/dynamic";
const TeamsInfoComponent = dynamic(() => import("@/components/common/TeamsInfoComponent"), { ssr: false });
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import FAQ from "@/components/FAQ";
const TeamCard = dynamic(() => import("@/app/team/TeamCard"), { ssr: false });
const HorizontalGallery = dynamic(() => import("@/app/gallery/HorizontalGallery"), { ssr: false });
const CardStack = dynamic(() => import("@/components/common/CardStack"), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/common/ProjectCard"), { ssr: false });
const LandingText = dynamic(() => import("@/components/common/LandingText"), { ssr: false });
const HeroImageSequence = dynamic(() => import("@/components/common/HeroImageSequence"), { ssr: false });
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
const NewComponent = dynamic(() => import("@/components/common/newComponent"),{ ssr: false });
import LineBackground from "@/components/LineBackground";
import Newsletter from "@/components/Newsletter";
import ScrollVelocity from "@/components/ScrollVelocity";

const HELLO_LANGUAGES = [
  "नमस्ते",
  "வணக்கம்",
  "నమస్కారం",
  "ನಮಸ್ಕಾರ",
  "നമസ്കാരം",
  "নমস্কার",
  "ਨਮਸਤੇ",
  "नमस्कार",
];

const WORD_DURATION = 450;
const TOTAL_INTRO = HELLO_LANGUAGES.length * WORD_DURATION + 1000;

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroPinRef = useRef<HTMLDivElement>(null);

  // ── Transform-based pinning ──
  // Replaces CSS `position: sticky` which triggers a main-thread layout
  // recalculation on every scroll frame, causing subpixel vertical jitter.
  // Instead, we compute a translateY that counteracts the scroll, running
  // entirely on the GPU compositor — no layout thrashing, no pixel snapping.
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroPinRef,
    offset: ["start start", "end end"]
  });
  // As the 200vh wrapper scrolls through the viewport, the inner element
  // needs translateY = scrollProgress * 100% of its own height (100vh)
  // to stay visually "pinned" at the top.
  const stickyY = useTransform(heroScrollProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) =>
        i >= HELLO_LANGUAGES.length - 1 ? i : i + 1
      );
    }, WORD_DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), TOTAL_INTRO);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <SmoothScrollProvider>
      <div className="fixed inset-0 -z-10">
        <LineBackground
          lineColor="rgba(180, 140, 60, 0.75)"
          backgroundColor="#0d0d0d"
          lineCount={14}
          animated={true}
        />
      </div>
     
  
      {/* Pinning Wrapper for Hero Section */}
      <div ref={heroPinRef} className="relative h-[200vh] z-10">
        <motion.div
          className="h-screen w-full overflow-hidden flex items-center justify-center"
          style={{
            y: stickyY,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* ScrollVelocity (behind) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <ScrollVelocity
              texts={['We Are IEEE CS,', 'We Are IEEE CS']} 
              velocity={30}
              className="custom-scroll-text"
              scrollContainerRef={heroPinRef}
            />
          </div>
          
        {/* HeroImageSequence (foreground) */}
          <div className="relative z-10 w-full h-full">
            <HeroImageSequence scrollContainerRef={heroPinRef} />
          </div>
        </motion.div>
      </div>
      
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                  style={{
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  }}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
                    • {HELLO_LANGUAGES[currentIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>


      {/* LandingText and subsequent content */}
      <div className="relative z-20">
        <LandingText />
      </div>
      <div className="mt-32">
        <HorizontalGallery />
      </div>
      <div>
        <NewComponent />
      </div>
      {/* CardStack and TeamsInfoComponent in normal scroll flow */}
      <div className="relative">
        <div>
          <CardStack />
        </div>
        <div>
          <TeamsInfoComponent />
        </div>
      </div>


      
      <div>
        <ProjectCard />
      </div>

        <div className="mt-24"><Newsletter/></div>

        <div><FAQ/></div>

    </SmoothScrollProvider>
  );
}