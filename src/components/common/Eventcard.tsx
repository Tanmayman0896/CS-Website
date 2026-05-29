"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { eventsData, type EventItem } from "@/src/data/eventsData";

interface EventCardProps {
  exhibition: EventItem;
}

function EventCard({ exhibition }: EventCardProps) {
  return (
    <article className="relative bg-[#121212] overflow-hidden w-full max-w-xs flex flex-col rounded-[3px] min-h-[calc(100%+3px)]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={exhibition.image}
          alt={exhibition.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {/* Tag */}
        <span 
        style={{padding: "5px"}}
        className="absolute top-0 right-0 bg-[#9AC53F] text-black text-[11px] rounded-bl-[7px] font-semibold tracking-widest uppercase">
          {exhibition.tag}
        </span>
      </div>

      {/* Content */}
      <div 
      style={{padding: "15px 15px 0px 15px"}}
      className="flex flex-col flex-1 px-6 pt-6">
        {/* Date */}
        <p className="text-[#F4A119] text-xs font-semibold tracking-[0.18em] uppercase mb-2">
          {exhibition.date}
        </p>

        {/* Title */}
        <h3 className="text-white text-2xl font-semibold leading-tight mb-2">
          {exhibition.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-12 line-clamp-3">
          {exhibition.description}
        </p>
      </div>

      {/* Footer */}
      <div 
      style={{padding: "0px 15px 15px 15px"}}
      className="flex items-center justify-between px-6 pb-6">


        <Link
          href={`/events/${exhibition.id}`}
          className="text-white text-sm font-medium border-b border-[#F4A119] pb-1 flex items-center gap-2"
        >
          Learn more →
        </Link>
      </div>
    </article>
  );
}

export default function PastExhibitions() {
  const filtered = eventsData;
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const heading = titleRef.current;
    if (!heading) return;
    const chars = heading.querySelectorAll<HTMLElement>(".eventsChar");
    let inView = false;

    const setInitialState = () => {
      gsap.set(chars, {
        yPercent: 110,
        rotateX: -65,
        opacity: 0,
        transformOrigin: "50% 100%",
      });
      gsap.set(heading, { filter: "blur(8px)" });
    };

    setInitialState();

    const animateIn = () => {
      gsap.fromTo(
        chars,
        {
          yPercent: 110,
          rotateX: -65,
          opacity: 0,
          transformOrigin: "50% 100%",
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "transform,opacity",
        }
      );

      gsap.fromTo(
        heading,
        { filter: "blur(8px)" },
        {
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power2.out",
          clearProps: "filter",
        }
      );
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !inView) {
            inView = true;
            animateIn();
          } else if (!entry.isIntersecting && inView) {
            inView = false;
            gsap.killTweensOf(chars);
            gsap.killTweensOf(heading);
            setInitialState();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(heading);

    return () => {
      obs.disconnect();
      gsap.killTweensOf(chars);
      gsap.killTweensOf(heading);
    };
  }, []);

  return (
    <section className="relative bg-black min-h-screen font-sans overflow-visible">

      <div className="relative z-10 m-16 md:m-24 max-w-7xl justify-items-center mx-auto px-8 pt-8 pb-32 flex flex-col items-center gap-[40px]">
        {/* Header */}

        <h1
          ref={titleRef}
          className="relative text-6xl md:text-8xl lg:text-9xl font-extrabold leading-tight tracking-tight text-center w-full mb-8 eventsTitle"
          style={{ color: "white", textShadow: "0 0 30px rgba(244,161,25,0.2)" }}
        >
          <span className="eventsWord">
            <span className="eventsChar text-white">E</span>
            <span className="eventsChar text-white">V</span>
            <span className="eventsChar text-white">E</span>
          </span>
          <span className="eventsWord">
            <span className="eventsChar" style={{ color: "#F4A119" }}>N</span>
            <span className="eventsChar" style={{ color: "#F4A119" }}>T</span>
            <span className="eventsChar" style={{ color: "#F4A119" }}>S</span>
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-24 w-full border-b border-zinc-800 pb-8">

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Past Events
          </h2>

          <Link
            href="/events/calendar"
            className="text-sm text-[#F4A119] tracking-widest uppercase flex items-center gap-3 font-bold hover:gap-5 transition-all"
          >
            View calendar <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center w-full max-w-5xl mx-auto mt-[50px]">
            {filtered.map((ex) => (
              <EventCard key={ex.id} exhibition={ex} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-zinc-600 text-lg italic">No exhibitions found.</p>
          </div>
        )}
      </div>

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}