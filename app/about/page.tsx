"use client";

import dynamic from "next/dynamic";
import TargetCursor from "@/src/components/common/TargetCursor";
import FadishBlackBackground from "@/components/FadishBlackBackground";
import SmoothScrollProvider from "@/src/components/common/SmoothScrollProvider";
import ChairpersonSection from "@/src/components/about/ChairpersonSection";
import styles from "./about.module.css";

// Both are canvas / GSAP heavy — no SSR
const LogoScrollWrapper = dynamic(
  () => import("@/src/components/common/LogoScrollWrapper"),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      {/* ── Background: covers full scrollable height ── */}
      <div className="fixed inset-0 -z-10">
        <FadishBlackBackground />
      </div>

      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />

      {/* ── Page Wrapper: z-index 1 so ChairpersonSection (z-20) overlays it ── */}
      <div id="about-page-wrapper" className="relative w-full z-[1]">

        {/* ── Scroll canvas: 300vh gives ScrollTrigger drive distance ── */}
        <div id="about-scroll-canvas" className={styles.scrollCanvas}>

          {/* Sticky hero — pinned for the full 300vh scroll */}
          <div className={styles.stickyHero}>
            <h1
              className={`font-bold tracking-tighter leading-none uppercase text-white ${styles.heroTitle}`}
            >
              About Us
            </h1>
          </div>
        </div>

        {/* ── Content section: logo settles left, text right ── */}
        <section
          id="about-content-section"
          className={`relative min-h-screen ${styles.contentSection}`}
        >
          {/* Centered container matching navbar width */}
          <div className={styles.navContainer}>
            {/* Right-side text — right ~55% of viewport */}
            <div className="text-white ml-auto max-w-[55%]">
              <h2
                className={`font-semibold tracking-tight leading-snug uppercase mb-8 ${styles.whoWeAreTitle}`}
              >
                Who We Are
              </h2>

              <p className={`leading-relaxed mb-6 text-white/75 ${styles.bodyText}`}>
                IEEE Computer Society MUJ is the student chapter of the world&apos;s
                leading professional organization devoted to advancing technology
                for humanity. We bring together passionate students from all
                branches, united by their curiosity for computing, software
                engineering, and emerging technologies.
              </p>

              <p className={`leading-relaxed mb-6 text-white/75 ${styles.bodyText}`}>
                Through hackathons, workshops, speaker sessions, and open-source
                collaborations, we cultivate a community where ideas transform into
                innovation. Our mission is to bridge the gap between academic
                learning and real-world problem-solving — empowering every member
                to build, learn, and lead.
              </p>

              <p className={`leading-relaxed text-white/75 ${styles.bodyText}`}>
                From cutting-edge AI research to full-stack web development, from
                competitive programming to design thinking — IEEE CS MUJ is where
                the next generation of technologists comes together to shape the
                future.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Logo: fixed, animated by GSAP ── */}
      <LogoScrollWrapper />

      {/* ── Chairperson parallax section ── */}
      <ChairpersonSection />
    </SmoothScrollProvider>
  );
}
