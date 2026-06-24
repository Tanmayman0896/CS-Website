"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ChairpersonSection.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Leader {
    name: string;
    role: string;
    eyebrow: string;
    title: [string, string];
    image: string;
    quote: string;
    bgColor: string;
    fadeColor: string;
}

const LEADERS: Leader[] = [
    {
        name: "Tanmoy Mandal",
        role: "Chairperson, IEEE CS MUJ",
        eyebrow: "A Message From Our",
        title: ["Chairperson", ""],
        image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1781889254081_37vzf.avif",
        quote: "Serving computing at its best with inclusion and diversity is the prime motto of the IEEE Computer Society. We aim to empower every student to push the boundaries of technology and innovation.",
        bgColor: "#0d0d0d",
        fadeColor: "#0d0d0d"
    },
    {
        name: "Aarush Dayal",
        role: "Vice Chairperson, IEEE CS MUJ",
        eyebrow: "A Message From Our",
        title: ["Vice", "Chairperson"],
        image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1782011016796_cp9pt.avif",
        quote: "Collaboration is the key to creating impactful technology. At IEEE CS, we foster an environment where diverse ideas converge to solve real-world problems and nurture future leaders.",
        bgColor: "#0d0d0d",
        fadeColor: "#0d0d0d"
    },
    {
        name: "Keshav Anand",
        role: "General Secretary, IEEE CS MUJ",
        eyebrow: "A Message From Our",
        title: ["General", "Secretary"],
        image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1782010963088_pv6ol.avif",
        quote: "Operational excellence and transparent communication form the backbone of our community. We strive to create seamless opportunities for growth, learning, and student empowerment.",
        bgColor: "#0d0d0d",
        fadeColor: "#0d0d0d"
    },
    {
        name: "Sara Pansuriya",
        role: "Managing Director, IEEE CS MUJ",
        eyebrow: "A Message From Our",
        title: ["Managing", "Director"],
        image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1782011183627_rhr4p8.avif",
        quote: "Turning vision into execution is our goal. By managing resources and coordinating initiatives effectively, we ensure our members have the platform to build and excel.",
        bgColor: "#0d0d0d",
        fadeColor: "#0d0d0d"
    },
    {
        name: "Dolly Srivastava",
        role: "Treasurer, IEEE CS MUJ",
        eyebrow: "A Message From Our",
        title: ["Treasurer's", "Perspective"],
        image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1782011075286_croi2.avif",
        quote: "Investing in student potential yields the greatest returns. We manage our resources diligently to fund cutting-edge workshops, hackathons, and projects that drive innovation.",
        bgColor: "#0d0d0d",
        fadeColor: "#0d0d0d"
    },
    {
        name: "Shreya Daljeet",
        role: "HR Director, IEEE CS MUJ",
        eyebrow: "A Message From Our",
        title: ["Human", "Resources"],
        image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1782011046860_vnl36l.avif",
        quote: "People are our greatest asset. Our mission is to nurture talent, build strong bonds within our team, and maintain a supportive, growth-oriented culture for all members.",
        bgColor: "#0d0d0d",
        fadeColor: "#0d0d0d"
    },
    {
        name: "Anshuman Singh",
        role: "Community And Media Director",
        eyebrow: "A Message From Our",
        title: ["Community", "Insights"],
        image: "https://pub-2b91df05320148438318902a8dc7795b.r2.dev/media/1782011000004_fukov.avif",
        quote: "Innovation is born from curiosity and code. We are committed to building robust technical foundations, encouraging hands-on experimentation, and mastering next-generation technologies.",
        bgColor: "#0d0d0d",
        fadeColor: "#0d0d0d"
    }
];

export default function ChairpersonSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            const panels = gsap.utils.toArray<HTMLElement>(`.${styles.section}`);
            
            // Set all sections except the first one off-screen to the right
            gsap.set(panels.slice(1), {
                position: "absolute",
                top: 0,
                left: 0,
                xPercent: 100,
            });

            // Set wrapper container for the horizontal pinning scroll behavior
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${(panels.length - 1) * 100}%`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            panels.forEach((panel, i) => {
                if (i === 0) return;

                // Slide in the current panel from the right, stacking over the previous one (no dimming or scaling)
                tl.to(panel, {
                    xPercent: 0,
                    ease: "none",
                }, i - 1);
            });
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <div ref={containerRef} id="about-chairperson-section" className={styles.container}>
            {LEADERS.map((leader, index) => (
                <section
                    key={leader.name}
                    id={`leader-section-${index}`}
                    className={styles.section}
                    style={{
                        backgroundColor: leader.bgColor,
                        zIndex: 10 + index,
                        ["--fade-color" as any]: leader.fadeColor,
                    }}
                >
                    {/* Three-column grid: title photo quote */}
                    <div className={styles.grid}>
                        {/* ── Left: label title */}
                        <div className={styles.titleCol}>
                            <span className={styles.eyebrow}>{leader.eyebrow}</span>
                            <h2 className={styles.title}>
                                {leader.title[0]}
                                {leader.title[1] && (
                                    <>
                                        <br />
                                        {leader.title[1]}
                                    </>
                                )}
                            </h2>
                        </div>

                        {/* Center: full-bleed portrait */}
                        <div className={styles.photoCol}>
                            <Image
                                src={leader.image}
                                alt={`${leader.name} - ${leader.role}`}
                                fill
                                sizes="40vw"
                                className={`object-cover object-top ${styles.photo}`}
                                priority={index === 0}
                            />
                            {/* Fade edges into background */}
                            <div className={styles.photoFadeLeft} />
                            <div className={styles.photoFadeRight} />
                            <div className={styles.photoFadeBottom} />
                            <div className={styles.photoFadeTop} />
                        </div>

                        {/* Right quote */}
                        <div className={styles.quoteCol}>
                            <p className={styles.quote}>
                                &ldquo;{leader.quote}&rdquo;
                            </p>
                            <p className={styles.name}>{leader.name}</p>
                            <p className={styles.role}>{leader.role}</p>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
