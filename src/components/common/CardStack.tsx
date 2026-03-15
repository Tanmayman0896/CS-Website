"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/src/components/common/CardStack.module.css";

const images = [
  "/images/events/1.png",
  "/images/events/2.png",
  "/images/events/3.png",
  "/images/events/4.png",
  "/images/events/5.png",
  "/images/events/6.png",
  "/images/events/7.png",
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
    <section ref={containerRef} id="card-stack-section" className={styles.container}>
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
  );
}