"use client";

import { useEffect, useRef, createContext, useContext, useState } from "react";
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
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            syncTouch: true,
        });

        lenisRef.current = lenis;
        const timer = setTimeout(() => {
            setLenis(lenis);
        }, 0);

        // Force scroll to top on mount and after Lenis init
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });

        const handleLenisScroll = () => ScrollTrigger.update();
        lenis.on("scroll", handleLenisScroll);

        const tickerFn = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        return () => {
            clearTimeout(timer);
            gsap.ticker.remove(tickerFn);
            lenis.off("scroll", handleLenisScroll);
            ScrollTrigger.getAll().forEach((t) => t.kill(true));
            lenis.destroy();
            lenisRef.current = null;
            setLenis(null);
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
}
