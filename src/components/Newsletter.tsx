"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

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
      image: "/images/[7]%20December.avif",
      link: "https://example.com/[7]December.png",
      rotation: -15,
    },
    {
      title: "January Edition",
      image: "/images/[8]%20January.avif",
      link: "https://example.com/january",
      rotation: 5,
    },
    {
      title: "February Edition",
      image: "/images/[9]%20February.avif",
      link: "https://example.com/february",
      rotation: 25,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(60px)",
        transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
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
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {editions.map((edition, index) => (
            <a
              key={index}
              href={edition.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "clamp(140px, 20vw, 280px)",
                  height: "clamp(210px, 28vw, 400px)",
                  background: "linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 25px 25px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.5s, margin 0.5s",
                  borderRadius: "10px",
                  margin: isHovered ? "0 14px" : "0 clamp(-35px, -5vw, -80px)",
                  transform: isHovered ? "rotate(0deg)" : `rotate(${edition.rotation}deg)`,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={edition.image}
                  alt={edition.title}
                  fill
                  sizes="(max-width: 768px) 20vw, 15vw"
                  className="object-cover"
                />
                {/* Title overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "52px",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    zIndex: 10,
                  }}
                >
                  {edition.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;