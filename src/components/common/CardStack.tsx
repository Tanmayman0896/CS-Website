"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/common/CardStack.module.css";

const images = [
  "/images/events/1.avif",
  "/images/events/2.avif",
  "/images/events/3.avif",
  "/images/events/4.avif",
  "/images/events/5.avif",
  "/images/events/6.avif",
  "/images/events/7.avif",
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
      <h2 style={{
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: "clamp(1.8rem, 5vmin, 3rem)",
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginBottom: "2rem",
        paddingTop: "3rem",
      }}>
        Our Events
      </h2>
      <section ref={containerRef} className={styles.container} style={{ minHeight: "100vh", paddingBottom: "10rem", paddingTop: "4rem" }}>
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