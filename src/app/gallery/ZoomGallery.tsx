'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    '/images/events/1.avif',
    '/images/team/pic2.svg',
    '/images/events/3.avif',
    '/images/team/pic4.svg',
    '/images/events/5.avif',
    '/images/events/6.avif',
    '/images/events/7.avif',
    '/images/events/2.avif',
    '/images/events/4.avif',
    '/images/team/photo1.svg',
];

export default function ZoomGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !triggerRef.current) return;

        const images = gsap.utils.toArray<HTMLElement>('.zoom-gallery-img');
        if (images.length === 0) return;

        // First image setup: off screen to the right
        gsap.set(images[0], { x: '100%', width: '100%', height: '100%' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top top',
                end: `+=2000%`,
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
            },
        });

        // 1. Slide in the first image to become the background
        tl.to(images[0], {
            x: '0%',
            duration: 1.5,
            ease: 'power2.out',
        });

        // 2. Animate subsequent images: left, right, left, right...
        // Each image fully exits before the next zooms in (no overlap)
        const SEGMENT_DURATION = 4; // zoom in + hold + zoom out per image
        for (let i = 1; i < images.length; i++) {
            const isLeft = i % 2 !== 0;
            const targetLeft = isLeft ? '5vw' : '55vw';
            const startTime = 1.5 + (i - 1) * SEGMENT_DURATION;

            // Prepare the image initially in the center at scale 0
            gsap.set(images[i], {
                width: '40vw',
                height: '80vh',
                left: '50%',
                top: '50%',
                xPercent: -50,
                yPercent: -50,
                scale: 0,
                opacity: 0,
                borderRadius: '8px',
            });

            // Zoom in from exact center to its respective half, creating the "chapters" look
            tl.to(images[i], {
                scale: 1,
                left: targetLeft,
                xPercent: 0,
                opacity: 1,
                duration: 1.8,
                ease: 'power3.out',
            }, startTime);

            // Fly slightly towards user and fade out so the next one has room
            tl.to(images[i], {
                scale: 1.6,
                opacity: 0,
                xPercent: isLeft ? -15 : 15, // slight outward push gives 3D spread
                duration: 1.5,
                ease: 'power2.in',
            }, startTime + 2.4);
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars.trigger === triggerRef.current) {
                    t.kill();
                }
            });
            tl.kill();
        };
    }, []);

    return (
        <div ref={triggerRef} className="relative w-full h-[100vh] bg-black">
            <div
                ref={containerRef}
                className="w-full h-full relative overflow-hidden"
            >
                {IMAGES.map((src, index) => (
                    <div
                        key={index}
                        className="zoom-gallery-img absolute overflow-hidden will-change-transform shadow-2xl"
                        style={{ zIndex: index === 0 ? 0 : IMAGES.length - index }}
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={index < 2}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
