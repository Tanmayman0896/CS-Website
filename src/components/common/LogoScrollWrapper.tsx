"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import dynamic from "next/dynamic";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
const Logo3D = dynamic(() => import("@/components/common/Logo3D"), {
  ssr: false,
});
export default function LogoScrollWrapper() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;
    const logoW = () => el.offsetWidth;
    const logoH = () => el.offsetHeight;

    const startX = () => vw() - logoW() - 70;
    const startY = () => vh() * 0.5 - logoH() * 0.5;
    const dropX = () => vw() - logoW() - 66;
    const dropY = () => vh() * 0.58 - logoH() * 0.5;
    const sweepX = () => vw() * 0.58 - logoW() * 0.5;
    const sweepY = () => vh() * 0.64 - logoH() * 0.5;
    const hookX = () => vw() * 0.30 - logoW() * 0.5;
    const hookY = () => vh() * 0.74 - logoH() * 0.5;
    const endX = () => vw() * 0.22 - logoW() * 0.5;
    const endY = () => vh() * 0.75 - logoH() * 0.5;

    let tl: gsap.core.Timeline;

    const buildTimeline = () => {
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }

      // Pre-set fresh values to prevent layout flash on build
      gsap.set(el, { x: startX(), y: startY(), opacity: 1, visibility: "visible" });
      
      // Initialize the progress ref to 0
      progressRef.current.value = 0;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-scroll-canvas",
          start: "top top",
          end: "bottom top",
          scrub: 0.5, // Snappy but beautifully smooth cinematic response
          invalidateOnRefresh: true,
        },
      });

      // Bind the custom ref value directly to the scroll timeline
      tl.to(progressRef.current, {
        value: 1,
        ease: "none",
        duration: 1,
      }, 0);

      // Cohesive cinematic title exit animation
      tl.to("#about-hero-title", {
        opacity: 0,
        scale: 0.85,
        y: -60,
        ease: "power1.inOut",
        duration: 0.6,
      }, 0);

      // Map scroll progress to 3D logo coordinates along curved motion path
      tl.to(el, {
        motionPath: {
          path: [
            { x: startX(), y: startY() },
            { x: dropX(), y: dropY() },
            { x: sweepX(), y: sweepY() },
            { x: hookX(), y: hookY() },
            { x: endX(), y: endY() },
          ],
          curviness: 1.45,
          autoRotate: false,
        },
        ease: "power1.inOut",
        duration: 1,
      }, 0);
    };

    buildTimeline();
    ScrollTrigger.addEventListener("refreshInit", buildTimeline);

    // Smoothly fade out the logo as the about-content-section moves out of view
    const fadeOutTrigger = ScrollTrigger.create({
      trigger: "#about-content-section",
      start: "top top",
      end: "bottom 50%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(el, { opacity: 1 - self.progress });
      },
      onLeaveBack: () => {
        gsap.set(el, { opacity: 1 });
      },
    });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", buildTimeline);
      tl?.scrollTrigger?.kill();
      tl?.kill();
      fadeOutTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="logo-mover"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "clamp(240px, 30vw, 440px)",
        height: "clamp(240px, 30vw, 440px)",
        pointerEvents: "none",
        zIndex: 10,
        willChange: "transform",
      }}
    >
      <Logo3D progressRef={progressRef} />
    </div>
  );
}