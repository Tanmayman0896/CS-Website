"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./calendar.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ── helper types & data ── */
interface CalendarEvent {
  id: number;
  title: string;
  type: "bar" | "card" | "image";
  color: string;
  month: number; // 0=Jan … 11=Dec
  time?: string;
  progress?: number;
  attachments?: number;
  imageSrc?: string;
}

// color map removed (events rendered as unified pill style)

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SAMPLE_EVENTS: CalendarEvent[] = [
  { id: 1, title: "Venom", type: "image", color: "orange", month: 0,  },
  { id: 2, title: "Snatch", type: "image", color: "orange", month: 1,  },
  { id: 3, title: "Bazinga", type: "image", color: "orange", month: 2,  },
  { id: 4, title: "Hackathon", type: "image", color: "orange", month: 2, },
  { id: 5, title: "Workshop", type: "image", color: "orange", month: 2,  },
  { id: 6, title: "OVER", type: "image", color: "orange", month: 3,  },
];

export default function RollingSections() {
  const landingRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!landingRef.current || !section2Ref.current || !logoRef.current) return;

    gsap.to(landingRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top 70%",
        end: "top top",
        scrub: true,
      },
    });
  }, []);

  const eventsForMonth = (monthIndex: number) =>
    SAMPLE_EVENTS.filter((e) => e.month === monthIndex);

  return (
    <div>
      
      <section
        ref={landingRef}
        className="h-screen sticky top-0 flex items-center justify-between px-32 bg-[#1a1a1a] text-white z-10 relative"
      >
        <div className="z-10 translate-x-30">
          <p
            className="text-white font-bold text-3xl
            [-webkit-text-stroke:2px_#facc15]
            [paint-order:stroke_fill]
            drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]
            drop-shadow-[0_0_16px_rgba(250,204,21,0.5)]"
          >
            What&apos;s On
          </p>
          <h1
            className="font-bold text-8xl
            [-webkit-text-stroke:2px_#facc15]
            [paint-order:stroke_fill]
            drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]
            drop-shadow-[0_0_16px_rgba(250,204,21,0.5)]"
          >
            Events
          </h1>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="logoWrapper relative flex items-center justify-center">
            <Image
              ref={logoRef}
              src="/logos/calendar-logo-center.png"
              alt="cal-logo"
              width={350}
              height={350}
              className="object-contain relative z-10 mix-blend-screen"
            />
            <div className="sparkContainer">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="spark"></span>
              ))}
            </div>
          </div>
        </div>

        <div className="z-10 -translate-x-20">
          <h1
            className="font-bold text-8xl
            [-webkit-text-stroke:2px_#facc15]
            [paint-order:stroke_fill]
            drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]
            drop-shadow-[0_0_16px_rgba(250,204,21,0.5)]"
          >
            Calendar
          </h1>
        </div>
      </section>

      <section
        ref={section2Ref}
        className="relative items-center justify-center bg-black text-white relative z-20"
      >
        
      </section>

      <section className={styles.calendarSection}>
        <h2 className={styles.sectionTitle}>Events</h2>

        <div className={styles.calendarContainer}>
         
          <div className={styles.calendarHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.monthTitle}>
                {currentYear}
              </span>
              <span className={styles.yearBadge}>
                Yearly Calendar
              </span>
            </div>
           
          </div>

          <div className={styles.calendarGrid}>
            {MONTH_NAMES.map((name: string, idx: number) => {
              const isCurrentMonth = idx === currentMonth;
              const monthEvents = eventsForMonth(idx);

              return (
                <div className={styles.dayRow} key={idx}>
                  {/* Label */}
                  <div
                    className={`${styles.dayLabel} ${isCurrentMonth ? styles.todayLabel : ""}`}
                  >
                    <span className={styles.dayName}>{name}</span>
                  </div>

                  <div className={styles.eventArea}>
                    {monthEvents.length === 0 && (
                      <span style={{ color: "#d1d5db", fontSize: "0.8rem", fontStyle: "italic" }}>
                        No events
                      </span>
                    )}

                    {monthEvents.map((ev: CalendarEvent, evIdx: number) => {
                      return (
                        <div
                          key={ev.id}
                          className={styles.pillEvent}
                          style={{ animationDelay: `${evIdx * 0.08}s` }}
                        >
                          <span className={styles.pillTitle}>{ev.title}</span>
                          {ev.time && (
                            <span className={styles.pillTime} aria-hidden>{ev.time}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}