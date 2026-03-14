"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ChairpersonSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ChairpersonSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Exact StackedSections pattern 
        const panel1El = document.getElementById("about-content-section");
        let bgTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

        if (panel1El) {
            bgTrigger = ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 1.2,
                onUpdate: (self) => {
                    gsap.set(panel1El, {
                        scale: 1 - self.progress * 0.04,
                        filter: `brightness(${1 - self.progress * 0.28})`,
                    });
                },
                onLeaveBack: () => {
                    gsap.set(panel1El, { scale: 1, filter: "brightness(1)" });
                },
            });
        }

        return () => {
            bgTrigger?.kill();
            if (panel1El) gsap.set(panel1El, { scale: 1, filter: "brightness(1)" });
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Three-column grid: title photo quote */}
            <div className={styles.grid}>

                {/* ── Left: label title*/}
                <div className={styles.titleCol}>
                    <span className={styles.eyebrow}>A Message From Our</span>
                    <h2 className={styles.title}>
                        Chairperson&apos;s<br />Words
                    </h2>
                </div>

                {/* enter: full-bleed portrait */}
                <div className={styles.photoCol}>
                    <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                        alt="IEEE CS MUJ Chairperson"
                        fill
                        sizes="40vw"
                        className={`object-cover object-top ${styles.photo}`}
                        priority={false}
                    />
                    {/* Fade edges into background */}
                    <div className={styles.photoFadeLeft} />
                    <div className={styles.photoFadeRight} />
                    <div className={styles.photoFadeBottom} />
                </div>

                {/* Right quote */}
                <div className={styles.quoteCol}>
                    <p className={styles.quote}>
                        &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat.&rdquo;
                    </p>
                    <p className={styles.name}>Samaksh Gupta</p>
                    <p className={styles.role}>Chairperson, IEEE CS MUJ</p>
                </div>
            </div>
        </section>
    );
}
