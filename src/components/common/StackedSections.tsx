"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import MemberCard from "./MemberCard";

import { WEB_MEMBERS, CORE_MEMBERS, TeamMember } from '@/src/data/teamData';



/* ── Sticky Panel ─────────────────────────────────────────── */
interface PanelProps { title: string; members: TeamMember[]; bg: string; zIndex: number; panelRef: React.RefObject<HTMLDivElement | null>; gradient?: string; }

function StickyPanel({ title, members, bg, zIndex, panelRef, gradient }: PanelProps) {
  const isCore = title === "Core Team";

  return (
    <div
      ref={panelRef}
      style={{
        position: isCore ? "relative" : "sticky",
        top: 0,
        minHeight: "100vh",
        height: isCore ? "auto" : "auto",
        width: "100%",
        zIndex,
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "80px 5vw 40px",
        boxSizing: "border-box",
        overflow: "hidden",
        borderRadius: "0",
        boxShadow: zIndex > 1 ? "0 -12px 60px rgba(0,0,0,0.6)" : "none",
      }}
    >
      {gradient && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: gradient, opacity: 0.5 }} />}
      <h2 style={{ position: "relative", zIndex: 2, fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: "0.04em", marginBottom: "28px", textAlign: "center" }}>
        {title}
      </h2>
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-[980px] justify-center">
        {members.map((m, i) => <MemberCard key={`${m.name}-${i}`} member={m} />)}
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
      const trigger = ScrollTrigger.create({
        trigger: panel2Ref.current, 
        start: "top bottom", 
        end: "top top", 
        scrub: 1.2,
        onUpdate: (self) => { 
          gsap.set(panel1Ref.current, { 
            scale: 1 - self.progress * 0.04, 
            filter: `brightness(${1 - self.progress * 0.28})` 
          }); 
        },
      });

      return () => {
        trigger.kill()
      }
    }, containerRef);

    return () => {
      ctx.revert()
      
      // Reset panel styles
      if (panel1Ref.current) {
        panel1Ref.current.style.transform = ''
        panel1Ref.current.style.filter = ''
      }
      if (panel2Ref.current) {
        panel2Ref.current.style.transform = ''
        panel2Ref.current.style.filter = ''
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <StickyPanel panelRef={panel1Ref} title="Web Team" members={WEB_MEMBERS} bg="#0a0a0a" gradient="radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,189,248,0.07) 0%, transparent 70%)" zIndex={1} />
      <StickyPanel panelRef={panel2Ref} title="Core Team" members={CORE_MEMBERS} bg="#1a1a1a" gradient="radial-gradient(ellipse 60% 40% at 50% 0%, rgba(192,132,252,0.07) 0%, transparent 70%)" zIndex={2} />
    </div>
  );
}
