"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/common/CardStack.module.css";
import { motion } from "framer-motion";

const images = [
  "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781932982587_dsmmlt.avif",
  "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781932593544_yg7km7.avif",
  "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781890098603_s975e.avif",
  "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781931700933_k94jd.avif",
  "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781931822598_b2n7xi.avif",
  "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781932315150_odb4va.avif",
  "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781932135318_m303ra.avif",
];

export default function CardStack() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            setOpen(true);
          }, 500);

          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div id="card-stack-section">
      <style>{`
        @media (max-width: 767px) {
          .mobile-events-title-container {
            padding-top: clamp(6rem, 15vh, 10rem) !important;
          }
          .mobile-events-cards-section {
            min-height: 60vh !important;
            padding-bottom: clamp(4rem, 10vh, 6rem) !important;
            padding-top: 2rem !important;
          }
        }
      `}</style>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="mobile-events-title-container w-full flex flex-col items-center"
        style={{
          paddingTop: "3rem",
          marginBottom: "1rem",
        }}
      >
          <h2 style={{
            display: "inline-block",
            textAlign: "center",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            background: "linear-gradient(to right, #ffffff, #f9ba1f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(2.75rem, 8vw, 5.25rem)",
            lineHeight: 1.15,
            padding: "0px 0px 0.15em 0px",
            letterSpacing: "-0.03em",
            margin: 0,
          }}>
            Our Events
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
      </motion.div>
      <section ref={containerRef} className={`${styles.container} mobile-events-cards-section`} style={{ minHeight: "100vh", paddingBottom: "10rem", paddingTop: "4rem" }}>
        <div className={`${styles.cards} ${open ? styles.open : ""}`}>
          {images.map((src, index) => (
            <div key={index} className={styles.card}>
              <img
                src={src}
                alt={`card-${index}`}
                draggable="false"
                loading="eager"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}