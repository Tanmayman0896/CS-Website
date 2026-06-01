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
      image: "/images/december.avif",
      link: "https://example.com/[7]December.png",
      rotation: -15,
    },
    {
      title: "January Edition",
      image: "/images/january.avif",
      link: "https://example.com/january",
      rotation: 5,
    },
    {
      title: "February Edition",
      image: "/images/february.avif",
      link: "https://example.com/february",
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
        fontWeight: "bold",
        color: "white",
        fontSize: "clamp(1.8rem, 5vmin, 3rem)",
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginBottom: "2rem",
        paddingTop: "2rem",
      }}>
        Our Newsletter
      </h2>
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
                style={{ "--r": edition.rotation } as React.CSSProperties}
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
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -80px;
    /* Removed backdrop-filter: blur(10px) — forces per-frame recompositing
       of all layers behind this element during scroll, causing jitter. */
    transform: rotate(calc(var(--r) * 1deg));
    overflow: hidden;
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 14px;
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
    .container .glass {
      width: 220px;
      height: 320px;
      margin: 0 -60px;
    }
  }

  /* Tablet */
@media (max-width: 768px) {
  .container .glass {
    width: 180px;
    height: 260px;
    margin: 0 -45px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .container .glass {
    width: 140px;
    height: 210px;
    margin: 0 -35px;
  }
}
`;

export default Card;