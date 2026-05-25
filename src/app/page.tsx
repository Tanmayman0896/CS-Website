"use client";

import dynamic from "next/dynamic";
const TeamsInfoComponent = dynamic(() => import("@/components/common/TeamsInfoComponent"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-[#0d0d0d]" />
});
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import FAQ from "@/components/FAQ";
const TeamCard = dynamic(() => import("@/app/team/TeamCard"), {
  ssr: false,
  loading: () => <div className="w-full h-80 bg-zinc-900/50 animate-pulse rounded-2xl" />
});
const HorizontalGallery = dynamic(() => import("@/app/gallery/HorizontalGallery"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#f9a71f]/30 border-t-[#f9a71f] rounded-full animate-spin" /></div>
});
const CardStack = dynamic(() => import("@/components/common/CardStack"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-[#0d0d0d]" />
});
const ProjectCard = dynamic(() => import("@/components/common/ProjectCard"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-[#0d0d0d]" />
});
const LandingText = dynamic(() => import("@/components/common/LandingText"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#f9a71f]/30 border-t-[#f9a71f] rounded-full animate-spin" /></div>
});
const HeroImageSequence = dynamic(() => import("@/components/common/HeroImageSequence"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#0d0d0d]" />
});
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
const NewComponent = dynamic(() => import("@/components/common/newComponent"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-[#0d0d0d]" />
});
import LineBackground from "@/components/LineBackground";
import Newsletter from "@/components/Newsletter";
import ScrollVelocity from "@/components/ScrollVelocity";

export default function Home() {
  const heroPinRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroPinRef.current || !heroContentRef.current) return;

    ScrollTrigger.create({
      trigger: heroPinRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: heroContentRef.current,
      pinType: "fixed",
      pinSpacing: false,
      anticipatePin: 1,
    });
  }, { scope: heroPinRef });

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
      <div id="hero-scroll-track" ref={heroPinRef} className="relative h-[200vh] z-10">
        <div
          ref={heroContentRef}
          className="h-dvh w-full overflow-hidden flex items-center justify-center"
          style={{
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
        </div>
      </div>
      



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