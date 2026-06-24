"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Barlow_Condensed, Barlow } from 'next/font/google';

function progressToBg(t: number): string {
  return "rgba(0,0,0,0)";
}

const barlowCondensed = Barlow_Condensed({
  weight: ['700', '800'],
  subsets: ['latin'],
});

const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
});

interface CardProps {
  image: string;
  title: string;
  description: string;
  github?: string;
}

const cards: CardProps[] = [
  {
    title: "Venom Portal",
    description: "The VENOM portal gave teams their room numbers, threw tasks at them, and kept the whole game running in real time. Avoiding boards and manual back and forth .",
    image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781890098603_s975e.avif",
    github: "https://github.com/Tanmayman0896/Snakes-ladders.git",
  },
  {
    title: "Campus Cab",
    description: "CampusCab lets verified students coordinate rides, split costs, and get around without the chaos .No waiting, no strangers, no guesswork. Just open the app and you’re ready to go.",
    image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781890043018_ugfop6.avif",
    github: "https://github.com/Tanmayman0896/Campus-cab-project.git",
  },
  {
    title: "CScrypt",
    description: "CScrypt is an interactive encryption and decryption website developed by IEEE CS MUJ to help users explore and understand classical cryptography techniques.",
    image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781890052192_ziz7r5.avif",
    github: "https://github.com/idkdolly/CS-Crypt.git",
  },
  {
    title: "CS Tijori",
    description: "CS Tijori is IEEE CS MUJ's in-house financial platform. It’s built to track budgets, invoices, and expenses without the mess. One centralized system. Full transparency. Every rupee accounted for.",
    image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781890266264_66l66g.avif",
    github: "https://github.com/AwesomeSam9523/expense-tracker.git",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Card = ({ image, title, description, github }: CardProps) => {
  const githubUrl = github ?? "https://github.com";

  return (
    <div
      className={`w-full h-full rounded-[7px] overflow-hidden bg-[#111] border border-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative transition-colors duration-[250ms] ease-in hover:bg-[#F4A119] hover:border-[#F4A119] cursor-pointer group flex flex-col ${barlow.className}`}
    >
      <div style={{ padding: "14px 14px 2px 14px" }} className="w-full">
        <div
          className="relative w-full rounded-[8px] overflow-hidden"
          style={{ height: "clamp(100px, 28vw, 200px)" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top block transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div style={{ padding: "14px" }} className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-[10px]">
          <h2
            className={`font-extrabold text-[30px] sm:text-[38px] tracking-[0.03em] uppercase text-white leading-none m-0 flex overflow-hidden ${barlowCondensed.className}`}
          >
            {title.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block relative transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <span className="inline-block transition-transform duration-[400ms] group-hover:-translate-y-full">
                  {char === " " ? "\u00A0" : char}
                </span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-[400ms] group-hover:-translate-y-full text-white">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h2>

          <div className="flex items-center justify-center text-white shrink-0">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center">
              <span className="inline-flex relative overflow-hidden items-center justify-center" style={{ transitionDelay: `${title.length * 30}ms` }}>
                <span className="inline-flex transition-transform duration-[400ms] group-hover:-translate-y-full items-center justify-center">
                  <ArrowIcon />
                </span>
                <span className="absolute left-0 top-full inline-flex transition-transform duration-[400ms] group-hover:-translate-y-full text-white items-center justify-center">
                  <ArrowIcon />
                </span>
              </span>
            </a>
          </div>
        </div>

        <p className="text-[13px] sm:text-[15px] leading-[1.55] text-white/90 font-medium m-0 p-0 transition-colors duration-[250ms]">
          {description}
        </p>
      </div>
    </div>
  );
};

const MobileGrid = ({ onProgress }: { onProgress: (p: number) => void }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const rect = section.getBoundingClientRect();
        const windowH = window.innerHeight;
        const total = rect.height + windowH;
        const scrolled = windowH - rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / total));
        onProgress(progress);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onProgress]);

  return (
    <section ref={sectionRef} className="w-full py-[40px] px-4">
      <h2
        style={{
          textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          background: "linear-gradient(to right, #ffffff, #f9ba1f)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "clamp(2.75rem, 8vw, 5.25rem)",
          lineHeight: 1.15,
          paddingBottom: "0.15em",
          letterSpacing: "-0.03em",
          marginBottom: "0px",
        }}
      >
        Our Projects
      </h2>
      <div
        style={{
          width: "32px",
          height: "3px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.5)",
          marginTop: "10px",
          marginBottom: "2rem",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "999px",
        }}
      />
      <div className="grid grid-cols-2 gap-[12px]">
        {cards.map((card, index) => (
          <div key={index} style={{ minHeight: "clamp(220px, 55vw, 340px)" }}>
            <Card {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

const DesktopScroll = ({ onProgress }: { onProgress: (p: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let rafId = 0;
    let lastCount = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const rect = container.getBoundingClientRect();
        const windowH = window.innerHeight;
        const scrolled = -rect.top;
        const totalScrollable = rect.height - windowH;

        if (scrolled < 0) {
          onProgress(0);
          if (lastCount !== 0) {
            lastCount = 0;
            setVisibleCount(0);
          }
          return;
        }

        const clampedScrolled = Math.min(scrolled, totalScrollable);
        const progress = clampedScrolled / totalScrollable;
        onProgress(Math.min(1, Math.max(0, progress)));
        const count = Math.min(cards.length, Math.floor(progress * cards.length) + 1);
        if (count !== lastCount) {
          lastCount = count;
          setVisibleCount(count);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onProgress]);

  return (
    <div ref={containerRef} style={{ height: `${cards.length * 100}vh` }} className="relative">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2rem",
            opacity: visibleCount > 0 ? 1 : 0,
            transform: visibleCount > 0 ? "translateY(0px)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              background: "linear-gradient(to right, #ffffff, #f9ba1f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(2.75rem, 8vw, 5.25rem)",
              lineHeight: 1.15,
              paddingBottom: "0.15em",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Our Projects
          </h2>
          <div
            style={{
              width: "32px",
              height: "3px",
              backgroundColor: "#ffffff",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.5)",
              marginTop: "10px",
              borderRadius: "999px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-[20px]">
          {cards.map((card, index) => {
            const isVisible = index < visibleCount;
            return (
              <div
                key={index}
                style={{
                  marginTop: index * 48,
                  width: 280,
                  height: 440,
                  transform: isVisible ? "translateY(0px)" : "translateY(80px)",
                  opacity: isVisible ? 1 : 0,
                  transition: "transform 0.75s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease",
                }}
                className="flex shrink-0"
              >
                <Card {...card} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CascadingCards = () => {
  const [isMobile, setIsMobile] = useState(false);

  // progressToBg always returns transparent, so no state needed.
  // Using a no-op callback avoids setState during scroll entirely.
  const handleProgress = useCallback((_progress: number) => {}, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const initialMatch = mq.matches;
    const timer = setTimeout(() => {
      setIsMobile(initialMatch);
    }, 0);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener("change", handler);
    };
  }, []);

  return (
    <div
      className="mobile-projects-wrapper"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .mobile-projects-wrapper {
            padding-top: clamp(3rem, 8vh, 5rem) !important;
            padding-bottom: clamp(3rem, 8vh, 5rem) !important;
          }
        }
      `}</style>
      {isMobile
        ? <MobileGrid onProgress={handleProgress} />
        : <DesktopScroll onProgress={handleProgress} />}
    </div>
  );
};

export default CascadingCards;