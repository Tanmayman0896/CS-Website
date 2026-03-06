"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Member {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  instagram?: string;
}

/* ── Data ─────────────────────────────────────────────────── */
const webMembers: Member[] = [
  { name: "Ananya Gupta", role: "Frontend Lead",  linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80" },
  { name: "Dev Malhotra", role: "Backend Lead",   linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=80" },
  { name: "Ishika Sethi", role: "UI/UX Designer", linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&q=80" },
  { name: "Nikhil Bose",  role: "DevOps",         linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80" },
];

const baseCoreMembers: Member[] = [
  { name: "Tara Shukla",  role: "Content Lead",   linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&q=80" },
  { name: "Vivek Mehta",  role: "Research Head",  linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop&q=80" },
  { name: "Pooja Reddy",  role: "PR & Outreach",  linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&q=80" },
  { name: "Arjun Kapoor", role: "Marketing Lead", linkedin: "#", instagram: "#", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&q=80" },
];

// 60 core committee members, cycling base data and numbering names
const coreMembers: Member[] = Array.from({ length: 60 }, (_, i) => {
  const base = baseCoreMembers[i % baseCoreMembers.length];
  return {
    ...base,
    name: `${base.name} ${i + 1}`,
  };
});

/* ── LinkedIn SVG ─────────────────────────── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

/* ── Photo Card ─────────────────────────────────────────────── */
function MemberCard({ member }: { member: Member }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "220px",
        height: "290px",
        borderRadius: "0",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.7)" : "0 8px 24px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.4s ease",
        flexShrink: 0,
      }}
    >
      {/* Portrait — grayscale by default, color on hover */}
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          filter: hovered ? "grayscale(0)" : "grayscale(1)",
          transition: "filter 0.5s ease",
        }}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }} />

      {/* Social icons — appear on hover */}
      <div style={{
        position: "absolute", top: "12px", right: "12px",
        display: "flex", flexDirection: "column", gap: "8px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(12px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <LinkedInIcon />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <InstagramIcon />
          </a>
        )}
      </div>

      {/* Name + Role */}
      <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem", color: "#fff", lineHeight: 1.2 }}>{member.name}</p>
        <p style={{ margin: "4px 0 0", fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>{member.role}</p>
      </div>
    </div>
  );
}

/* ── Sticky Panel ─────────────────────────────────────────── */
interface PanelProps { title: string; members: Member[]; bg: string; zIndex: number; panelRef: React.RefObject<HTMLDivElement | null>; gradient?: string; }

function StickyPanel({ title, members, bg, zIndex, panelRef, gradient }: PanelProps) {
  const isCore = title === "Core Team";

  return (
    <div
      ref={panelRef}
      style={{
        position: isCore ? "relative" : "sticky",
        top: 0,
        height: isCore ? "auto" : "100vh",
        width: "100%",
        zIndex,
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isCore ? "flex-start" : "center",
        padding: "40px 5vw",
        boxSizing: "border-box",
        overflow: "visible",
        borderRadius: zIndex > 1 ? "0" : "0",
        boxShadow: zIndex > 1 ? "0 -12px 60px rgba(0,0,0,0.6)" : "none",
      }}
    >
      {gradient && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: gradient, opacity: 0.5 }} />}
      <h2 style={{ position: "relative", zIndex: 2, fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: "0.04em", marginBottom: "28px", textAlign: "center" }}>
        {title}
      </h2>
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexWrap: "wrap", gap: "18px", justifyContent: "center", maxWidth: "980px", width: "100%" }}>
        {members.map((m) => <MemberCard key={m.name} member={m} />)}
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function StackedSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref    = useRef<HTMLDivElement>(null);
  const panel2Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: panel2Ref.current, start: "top bottom", end: "top top", scrub: 1.2,
        onUpdate: (self) => { gsap.set(panel1Ref.current, { scale: 1 - self.progress * 0.04, filter: `brightness(${1 - self.progress * 0.28})` }); },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <StickyPanel panelRef={panel1Ref} title="Web Team" members={webMembers} bg="#0a0a0a" gradient="radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,189,248,0.07) 0%, transparent 70%)" zIndex={1} />
      <StickyPanel panelRef={panel2Ref} title="Core Team" members={coreMembers} bg="#1a1a1a" gradient="radial-gradient(ellipse 60% 40% at 50% 0%, rgba(192,132,252,0.07) 0%, transparent 70%)" zIndex={2} />
    </div>
  );
}
