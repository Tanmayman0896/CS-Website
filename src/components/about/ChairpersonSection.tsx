"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadishBlackBackground from "@/components/FadishBlackBackground";
import styles from "./ChairpersonSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * ChairpersonSection
 *
 * Two-column layout:
 * - LEFT : Portrait image in a sticky container — stays locked while text scrolls past.
 * - RIGHT: Title, blockquote, description — scrolls normally.
 *
 * GSAP scrub scales + darkens the #about-page-wrapper as this section enters,
 * matching the StackedSections pattern from the team page.
 */
export default function ChairpersonSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const textEl = textRef.current;
        if (!section || !textEl) return;

        // ── Scale + darken the previous section as this one slides in ──
        const bgEl = document.getElementById("about-page-wrapper");
        let bgTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

        if (bgEl) {
            bgTrigger = ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 1.2,
                onUpdate: (self) => {
                    gsap.set(bgEl, {
                        scale: 1 - self.progress * 0.04,
                        filter: `brightness(${1 - self.progress * 0.28})`,
                    });
                },
                onLeaveBack: () => {
                    gsap.set(bgEl, { scale: 1, filter: "brightness(1)" });
                },
            });
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                textEl.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: textEl,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, section);

        return () => {
            ctx.revert();
            bgTrigger?.kill();
            if (bgEl) gsap.set(bgEl, { scale: 1, filter: "brightness(1)" });
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Opaque background — covers the pinned section behind during slide-up */}
            <div className="absolute inset-0 -z-[1]">
                <FadishBlackBackground />
            </div>

            <div className={styles.innerRow}>

                {/* ── Left: Sticky portrait ── */}
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrap}>
                        <Image
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                            alt="IEEE CS MUJ Chairperson"
                            fill
                            sizes="(max-width: 768px) 80vw, 32vw"
                            className="object-cover object-top"
                            priority={false}
                        />
                        <div className={styles.imageGradient} />
                    </div>

                    <div className={styles.nameMeta}>
                        <p className={`font-semibold text-white ${styles.nameText}`}>
                            Samaksh Gupta
                        </p>
                        <p className={styles.roleText}>Chairperson</p>
                    </div>
                </div>

                {/* ── Right: Scrollable text ── */}
                <div ref={textRef} className={`text-white ${styles.textColumn}`}>
                    <span className={styles.eyebrow}>A Message From Our</span>

                    <h2 className={`font-bold tracking-tight leading-tight ${styles.title}`}>
                        Chairperson&apos;s Words
                    </h2>

                    <div className={styles.divider} />

                    <blockquote className={styles.quote}>
                        &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat.&rdquo;
                    </blockquote>

                    <p className={styles.bodyText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p className={styles.bodyText}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                        ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                        explicabo.
                    </p>
                </div>
            </div>
        </section>
    );
}
