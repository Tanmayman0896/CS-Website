"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Logo3D = dynamic(() => import("@/src/components/common/Logo3D"), {
    ssr: false,
});

/**
 * LogoScrollWrapper
 *
 * - Logo div is position:fixed, animated via MotionPath during the scroll canvas
 * - A separate ScrollTrigger watches #about-page-wrapper and hides the logo
 *   via visibility:hidden when we scroll past it (onLeave), and restores on scroll back (onEnterBack)
 */
export default function LogoScrollWrapper() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const vw = () => window.innerWidth;
        const vh = () => window.innerHeight;
        const logoH = () => el.offsetHeight;

        const startX = () => vw() * 0.55;
        const startY = () => vh() * 0.5 - logoH() * 0.5;
        // Drop down, then curve LEFT staying low
        const mid1X = () => vw() * 0.45;     // slightly left from start
        const mid1Y = () => vh() * 0.75;      // DROP down
        const mid2X = () => vw() * 0.20;      // sweep left
        const mid2Y = () => vh() * 0.70;      // stay low — minimal rise
        const endX = () => vw() * 0.015;     // far left
        const endY = () => vh() - logoH() * 0.85; // dock near bottom of viewport

        gsap.set(el, { x: startX(), y: startY() });

        // 1. MOTION PATH ANIMATION — scrubbed to the scroll canvas
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about-scroll-canvas",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
                invalidateOnRefresh: true,
            },
        });

        tl.to(el, {
            motionPath: {
                path: [
                    { x: startX(), y: startY() },
                    { x: mid1X(), y: mid1Y() },
                    { x: mid2X(), y: mid2Y() },
                    { x: endX(), y: endY() },
                ],
                curviness: 1.4,
                autoRotate: false,
            },
            ease: "power1.inOut",
            duration: 1,
        });

        // 2. HIDE TRIGGER — fade out logo as ChairpersonSection enters
        const hideTrigger = ScrollTrigger.create({
            trigger: "#about-page-wrapper",
            start: "bottom 85%",
            onEnter: () => gsap.to(el, { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" }),
            onLeaveBack: () => gsap.to(el, { autoAlpha: 1, duration: 0.4, ease: "power1.inOut" }),
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            hideTrigger.kill();
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
                width: "clamp(350px, 42vw, 640px)",
                height: "clamp(350px, 42vw, 640px)",
                pointerEvents: "none",
                zIndex: 10,
                willChange: "transform",
            }}
        >
            <Logo3D />
        </div>
    );
}
