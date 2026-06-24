"use client";

import dynamic from "next/dynamic";
const TeamsInfoComponent = dynamic(() => import("@/components/common/TeamsInfoComponent"), { ssr: false });
import { useState, useEffect, useRef } from "react";
const TeamCard = dynamic(() => import("@/app/team/TeamCard"), { ssr: false });
const HorizontalGallery = dynamic(() => import("@/app/gallery/HorizontalGallery"), { ssr: false });
const CardStack = dynamic(() => import("@/components/common/CardStack"), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/common/ProjectCard"), { ssr: false });
const LandingText = dynamic(() => import("@/components/common/LandingText"), { ssr: false });
const HeroImageSequence = dynamic(() => import("@/components/common/HeroImageSequence"), { ssr: false });
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import { useLoading } from "@/context/LoadingContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
//const NewComponent = dynamic(() => import("@/components/common/newComponent"),{ ssr: false });
import LineBackground from "@/components/LineBackground";
import ScrollVelocity from "@/components/ScrollVelocity";

const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false });
const Newsletter = dynamic(() => import("@/components/Newsletter"), { ssr: false });

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
  const { isReady } = useLoading();
  const [startIntro, setStartIntro] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const heroPinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isReady) return;

    // Delay starting the intro text sequence until the preloader's 1-second exit animation is complete
    const delayTimer = setTimeout(() => {
      setStartIntro(true);
    }, 1000);

    return () => clearTimeout(delayTimer);
  }, [isReady]);

  useGSAP(() => {
    if (!startIntro || !introRef.current || !textRef.current) return;

    const customEaseIn = "power4.in";
    const customEaseOut = "power4.out";

    const tl = gsap.timeline({
      onComplete: () => {
        // Cinematic lens focus fade-out: slight expansion, backdrop-blur fade-out, and opacity fade
        gsap.to(introRef.current, {
          opacity: 0,
          scale: 1.03,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: () => {
            setShowIntro(false);
          }
        });
      }
    });

    HELLO_LANGUAGES.forEach((lang, index) => {
      if (index > 0) {
        // Position subsequent languages at the bottom of the clipping mask with opacity 0 and blur
        tl.set(textRef.current, { 
          textContent: `• ${lang}`, 
          y: 40, 
          opacity: 0, 
          filter: "blur(6px)" 
        });

        // Slide up + Fade in + Remove blur (snappy 0.3s duration)
        tl.to(textRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.3,
          ease: customEaseOut,
        });
      } else {
        // Guarantee first language starts correctly positioned
        tl.set(textRef.current, { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)" 
        });
      }

      // Snappy word stay duration (0.2s stay time)
      tl.to(textRef.current, {
        duration: 0.2,
      });

      // Slide up + Fade out + Add blur (except for the last greeting, snappy 0.2s duration)
      if (index < HELLO_LANGUAGES.length - 1) {
        tl.to(textRef.current, {
          y: -40,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.2,
          ease: customEaseIn,
        });
      } else {
        // Let the last language stay slightly longer before overlay exit
        tl.to(textRef.current, {
          duration: 0.3,
        });
      }
    });

  }, { dependencies: [startIntro], scope: introRef });

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
        <div
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          {/* ScrollVelocity (behind) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <ScrollVelocity
              texts={['WE ARE IEEE CS,', 'WE ARE IEEE CS']} 
              velocity={35}
              className="custom-scroll-text"
              scrollContainerRef={heroPinRef}
            />
          </div>
          
        {/* HeroImageSequence (foreground) */}
          <div className="relative z-10 w-full h-full">
            <HeroImageSequence scrollContainerRef={heroPinRef} />
          </div>
        </div>
      </div>
      
      {showIntro ? (
        <div
          ref={introRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ 
            willChange: "transform, opacity, filter",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Vertical mask viewport to clip sliding text */}
          <div className="text-center overflow-hidden h-[120px] flex items-center justify-center">
            <span
              ref={textRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white block select-none"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                willChange: "transform, opacity, filter",
                opacity: 1,
                transform: "translate3d(0, 0px, 0)",
              }}
            >
              • नमस्ते
            </span>
          </div>
        </div>
      ) : null}


      {/* LandingText and subsequent content */}
      <div className="relative z-20">
        <LandingText />
      </div>
      <div>
        <HorizontalGallery />
      </div>

      {/*<div>
        <NewComponent />
      </div>*/}
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