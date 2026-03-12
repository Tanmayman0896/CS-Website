"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
    return useContext(LenisContext);
}

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            syncTouch: true,
        });

        lenisRef.current = lenis;

        const handleLenisScroll = () => ScrollTrigger.update();
        lenis.on("scroll", handleLenisScroll);

        const tickerFn = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerFn);
            lenis.off("scroll", handleLenisScroll);
            ScrollTrigger.getAll().forEach((t) => t.kill(true));
            lenis.destroy();
            lenisRef.current = null;
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
}
