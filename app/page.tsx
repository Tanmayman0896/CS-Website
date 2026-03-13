"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Carousel from "@/components/Carousel";
const TeamCard = dynamic(() => import("@/src/components/common/TeamCard"), { ssr: false });
const HorizontalGallery = dynamic(() => import("@/src/app/gallery/HorizontalGallery"), { ssr: false });
const CardStack = dynamic(() => import("@/src/components/common/CardStack"), { ssr: false });
const CascadingCards = dynamic(() => import("@/src/components/common/CascadingCards"), { ssr: false });
const ImpactText = dynamic(() => import("@/src/components/common/ImpactText"), { ssr: false });

import LineBackground from "@/components/LineBackground";
import Newsletter from "@/components/Newsletter";

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
    <>
      <div className="fixed inset-0 -z-10">
        <LineBackground
          lineColor="rgba(180, 140, 60, 0.75)"
          backgroundColor="#0d0d0d"
          lineCount={14}
          animated={true}
        />
      </div>
      {/* Line 2 
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

*/}
      <div>
        <ImpactText />
      </div>
      <div className="mt-32">
        <HorizontalGallery />
      </div>
      <div>
        <CardStack />
      </div>
      <div>
        <CascadingCards />
      </div>


      <div>
        <Carousel

        />
      </div>
      <div>
        <Newsletter />
      </div>

    </>
  );
}