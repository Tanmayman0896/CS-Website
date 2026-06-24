"use client";

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface NewsletterEdition {
  title: string;
  image: string;
  link: string;
  rotation: number;
}

const Card = () => {
  const editions: NewsletterEdition[] = [
    {
      title: "December Edition",
      image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781938278806_4brat5.avif",
      link: "https://drive.google.com/file/d/1ENxnjOMPHC0sKmIHTOVrUUPhiByjjb94/view?usp=drive_link",
      rotation: -15,
    },
    {
      title: "January Edition",
      image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781938292685_sjmw6x.avif",
      link: "https://drive.google.com/file/d/1oKVilyYfa5voYXlreLnsZRVlEhcemeb9/view?usp=drive_link",
      rotation: 5,
    },
    {
      title: "February Edition",
      image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781938286381_62c7ei.avif",
      link: "https://drive.google.com/file/d/1OFuQI6MQBNebnPUIsR3xxa8WZFcCsCBN/view?usp=drive_link",
      rotation: 25,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="mobile-newsletter-section"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(60px)",
        transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .mobile-newsletter-section {
            padding-top: clamp(3rem, 8vh, 5rem) !important;
            padding-bottom: clamp(5rem, 12vh, 8rem) !important;
          }
        }
      `}</style>
      <h2 style={{
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
        paddingTop: "2rem",
      }}>
        Our Newsletter
      </h2>
      <div
        style={{
          width: "40px",
          height: "3px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.5)",
          marginTop: "10px",
          marginBottom: "5rem",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "999px",
        }}
      />
      <StyledWrapper>
        <div className="container">
          {editions.map((edition, index) => (
            <a
              key={index}
              href={edition.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-link"
            >
              <div
                data-text={edition.title}
                style={{ 
                  "--r": edition.rotation,
                  "--i": index - 1
                } as React.CSSProperties}
                className="glass"
              >
                <img
                  src={edition.image}
                  alt={edition.title}
                  className="glass-image"
                />
              </div>
            </a>
          ))}
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    --spread-width: 188px;
  }

  .glass-link {
    text-decoration: none;
    cursor: pointer;
  }

  .container .glass {
    position: relative;
    width: 280px;
    height: 400px;
    background: linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.02));
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    border-radius: 10px;
    margin: 0 -80px;
    /* Removed backdrop-filter: blur(10px) — forces per-frame recompositing
       of all layers behind this element during scroll, causing jitter. */
    transform: rotate(calc(var(--r) * 1deg));
    overflow: hidden;
    will-change: transform;
  }

  .container:hover .glass {
    transform: translateX(calc(var(--i) * var(--spread-width))) rotate(0deg);
  }

  .glass-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 52px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
    letter-spacing: 0.05em;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 10;
  }

  /* ---------- Responsive ---------- */

  @media (max-width: 1024px) {
    .container {
      --spread-width: 148px;
    }
    .container .glass {
      width: 220px;
      height: 320px;
      margin: 0 -60px;
    }
  }

  /* Tablet */
@media (max-width: 768px) {
  .container {
    --spread-width: 118px;
  }
  .container .glass {
    width: 180px;
    height: 260px;
    margin: 0 -45px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .container {
    --spread-width: 18vw;
  }
  .container .glass {
    width: 28vw;
    height: 42vw;
    margin: 0 -7vw;
  }
}
`;

export default Card;