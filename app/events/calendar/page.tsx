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
  progress?: number;
  attachments?: number;
  imageSrc?: string;
}

const COLOR_MAP: Record<string, string> = {
  teal: styles.eventTeal,
  orange: styles.eventOrange,
  pink: styles.eventPink,
  purple: styles.eventPurple,
  green: styles.eventGreen,
  blue: styles.eventBlue,
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SAMPLE_EVENTS: CalendarEvent[] = [
  { id: 1, title: "Venom", type: "image", color: "orange", month: 0, imageSrc: "/images/events/1.png" },
  { id: 2, title: "Snatch", type: "image", color: "orange", month: 1, imageSrc: "/images/events/2.png" },
  { id: 3, title: "Bazinga", type: "image", color: "orange", month: 2, imageSrc: "/images/events/3.png" },
  { id: 4, title: "hackathon", type: "image", color: "orange", month: 2, imageSrc: "/images/events/4.png" },
  { id: 5, title: "hackathon", type: "image", color: "orange", month: 2, imageSrc: "/images/events/5.png" },
  { id: 6, title: "OVER", type: "image", color: "orange", month: 3, imageSrc: "/images/events/6.png" },
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
        className="flex items-center justify-center bg-black text-white relative z-20"
      >
        <img
          src="/images/events/tear.svg"
          alt="tear divider"
          className="w-full -translate-y-[60vh] opacity-100 overflow-hidden"
        />
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
                      if (ev.type === "image") {
                        return (
                          <div key={ev.id} className={styles.eventImageWrapper} style={{ animationDelay: `${evIdx * 0.08}s` }}>
                             <img src={ev.imageSrc} alt={ev.title} className={styles.eventImage} />
                          </div>
                        );
                      }
                      return ev.type === "bar" ? (
                        <div
                          key={ev.id}
                          className={`${styles.eventBar} ${COLOR_MAP[ev.color] || styles.eventTeal}`}
                          style={{ animationDelay: `${evIdx * 0.08}s` }}
                        >
                          <span className={styles.eventText}>{ev.title}</span>
                          <span className={styles.eventIcon}>✓</span>
                        </div>
                      ) : (
                        <div
                          key={ev.id}
                          className={styles.eventCard}
                          style={{ animationDelay: `${evIdx * 0.08}s` }}
                        >
                          <div className={styles.cardHeader}>
                            <span className={styles.cardTitle}>{ev.title}</span>
                            <span className={styles.cardMenu}>•••</span>
                          </div>
                          {ev.progress !== undefined && (
                            <span className={styles.cardProgress}>
                              {ev.progress}%
                            </span>
                          )}
                          <div className={styles.cardFooter}>
                            {ev.attachments && (
                              <span className={styles.cardAttachment}>
                                📎 {ev.attachments}
                              </span>
                            )}
                          </div>
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