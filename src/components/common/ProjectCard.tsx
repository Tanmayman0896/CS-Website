"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Barlow_Condensed, Barlow } from 'next/font/google';

function progressToBg(t: number): string {
  const alpha = Math.min(0.8, Math.max(0, t));
  return `rgba(255,255,255,${alpha})`;
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
}

const cards: CardProps[] = [
  {
    title: "Project",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/photo1.svg",
  },
  {
    title: "Project",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/pic2.svg",
  },
  {
    title: "Project",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/pic3.svg",
  },
  {
    title: "Project",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, veniam.",
    image: "/images/team/pic4.svg",
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

const Card = ({ image, title, description }: CardProps) => {
  return (
    <div className={`w-full h-full rounded-[7px] overflow-hidden bg-[#111] border border-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative transition-colors duration-[250ms] ease-in hover:bg-[#F4A119] hover:border-[#F4A119] cursor-pointer group flex flex-col ${barlow.className}`}>
      <div style={{ padding: "14px 14px 2px 14px" }} className="w-full">
        <div className="relative w-full h-[200px] sm:h-[260px] rounded-[8px] overflow-hidden">
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
          <h2 className={`font-extrabold text-[30px] sm:text-[38px] tracking-[0.03em] uppercase text-white leading-none m-0 flex overflow-hidden ${barlowCondensed.className}`}>
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
            <span
              className="inline-block relative overflow-hidden transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center"
              style={{ transitionDelay: `${title.length * 30}ms` }}
            >
              <span className="inline-flex transition-transform duration-[400ms] group-hover:-translate-y-full items-center justify-center">
                <ArrowIcon />
              </span>
              <span className="absolute left-0 top-full inline-flex transition-transform duration-[400ms] group-hover:-translate-y-full text-white items-center justify-center">
                <ArrowIcon />
              </span>
            </span>
          </div>
        </div>

        <p className="text-[13px] sm:text-[15px] leading-[1.55] text-white/90 font-normal m-0 p-0 transition-colors duration-[250ms] font-medium">
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
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const scrolled = windowH - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      onProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onProgress]);

  return (
    <section ref={sectionRef} className="w-full py-[40px] px-4">
      <div className="grid grid-cols-2 gap-[12px]">
        {cards.map((card, index) => (
          <div key={index} className="h-[340px]">
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

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = -rect.top;
      const totalScrollable = rect.height - windowH;

      if (scrolled < 0) {
        onProgress(0);
        setVisibleCount(0);
        return;
      }

      const clampedScrolled = Math.min(scrolled, totalScrollable);
      const progress = clampedScrolled / totalScrollable;
      onProgress(Math.min(1, Math.max(0, progress)));
      const count = Math.min(cards.length, Math.floor(progress * cards.length) + 1);
      setVisibleCount(count);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onProgress]);

  return (
    <div ref={containerRef} style={{ height: `${cards.length * 100}vh` }} className="relative">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center px-4 md:px-8">
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
  const [bgColor, setBgColor] = useState("rgba(255,255,255,0)");

  const handleProgress = useCallback((progress: number) => {
    setBgColor(progressToBg(progress));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.05s linear",
      }}
    >
      {isMobile
        ? <MobileGrid onProgress={handleProgress} />
        : <DesktopScroll onProgress={handleProgress} />}
    </div>
  );
};

export default CascadingCards;