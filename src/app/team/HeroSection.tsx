'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import AnimatedText from './AnimatedText'
import Team3DLogo from './Team3DLogo'
import { useLoading } from '@/context/LoadingContext'

gsap.registerPlugin(ScrollTrigger)

// Newspaper collage images — dark, B&W grid of event photos
const COLLAGE_PHOTOS = [
  '/images/team/photo1.svg',
  '/images/team/pic2.svg',
  '/images/team/pic3.svg',
  '/images/team/pic4.svg',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
]

//to write something on images
const HEADLINES = [
  "",
  ""
]

export default function HeroSection() {
  const { isReady } = useLoading()
  const contentRef = useRef<HTMLDivElement>(null)
  const collageRef = useRef<HTMLDivElement>(null)
  const mobileCollageWrapperRef = useRef<HTMLDivElement>(null)
  const ourStoryWrapper = useRef<HTMLDivElement>(null)
  const mobileContentRef = useRef<HTMLDivElement>(null)
  const mobileHeroRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)




  useLayoutEffect(() => {
    if (!isReady) return

    const ctx = gsap.context(() => {
      // ENTRANCE: content slides up
      gsap.from(contentRef.current, {
        y: 150,
        opacity: 1,
        duration: 3,
        ease: 'power4.out',
      })

      gsap.from(mobileContentRef.current, {
        y: 80,
        opacity: 1,
        duration: 3,
        ease: 'power4.out',
      })

      // DESKTOP scroll animation
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1025px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ourStoryWrapper.current,
            start: 'top top',
            end: '+=2000',
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        })

        // Step 1: fade & blur the text
        tl.to(contentRef.current, {
          opacity: 0,
          filter: 'blur(8px)',
          scale: 0.9,
          duration: 2,
          ease: 'power4.inOut',
          immediateRender: false,
        })

        // Step 2: wipe collage smoothly from left to right using circle clip-path
        tl.to(
          collageRef.current,
          {
            clipPath: 'circle(120% at 220% 50%)',
            ease: 'power2.inOut',
            duration: 4.5,
          },
          '<+=0.3'
        )

        // Step 3: zoom inner grid slightly for parallax cinematic depth
        if (collageRef.current) {
          tl.to(
            collageRef.current.querySelector('.collage-grid-inner'),
            {
              scale: 1.06,
              ease: 'power2.inOut',
              duration: 4.5,
            },
            '<'
          )
        }
      })

      // MOBILE/TABLET scroll animation
      mm.add('(max-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ourStoryWrapper.current,
            start: 'top top',
            end: '+=2500',
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        })

        // Step 1: fade & blur mobile text
        tl.to(mobileContentRef.current, {
          opacity: 0,
          filter: 'blur(8px)',
          scale: 0.9,
          duration: 2,
          ease: 'power4.inOut',
          immediateRender: false,
        })

        // Step 2: wipe mobile collage smoothly from left to right using circle clip-path
        tl.to(
          mobileCollageWrapperRef.current,
          {
            clipPath: 'circle(120% at 220% 50%)',
            ease: 'power2.inOut',
            duration: 4.5,
          },
          '<+=0.3'
        )

        // Step 3: zoom mobile inner grid slightly for parallax cinematic depth
        if (mobileCollageWrapperRef.current) {
          tl.to(
            mobileCollageWrapperRef.current.querySelector('.collage-grid-inner'),
            {
              scale: 1.06,
              ease: 'power2.inOut',
              duration: 4.5,
            },
            '<'
          )
        }
      })

      // Delay refresh until after the browser has painted the new page DOM
      const refreshId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      })

      return () => {
        cancelAnimationFrame(refreshId)
      }
    })

    return () => {
      // Kill all animations and ScrollTriggers in this context
      ctx.revert()
      
      // Additional safety: manually unpin any pinned elements
      const allTriggers = ScrollTrigger.getAll()
      allTriggers.forEach((trigger) => {
        if (trigger.vars?.pin) {
          // Unpin by setting transform to none
          if (trigger.pin && typeof trigger.pin === 'object') {
            (trigger.pin as HTMLElement).style.transform = ''
          }
        }
      })

      // Reset any inline styles left on elements
      ;[contentRef, collageRef, mobileCollageWrapperRef, mobileContentRef, mobileHeroRef, heroRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.transform = ''
          ref.current.style.filter = ''
          ref.current.style.opacity = ''
          ref.current.style.clipPath = ''
        }
      })
    }
  }, [isReady])

  return (
    <div ref={heroRef} className="relative w-screen overflow-x-hidden text-white bg-transparent">
      <div ref={ourStoryWrapper} className="relative min-h-[140vh] z-10 bg-transparent">

        {/* Cinematic Bridge Backdrop (Revealed as Hero Collage Wipes Away) */}
        <div
          className="absolute top-0 left-0 w-full h-screen z-0 flex flex-col items-center justify-center bg-transparent"
        >
          {/* Style to import fonts locally for the typography */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@700;800;900&display=swap');
          `}</style>
          
          <div 
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl -translate-y-12 md:-translate-y-20 select-none"
          >
            <div className="-mb-10 sm:-mb-14 md:-mb-20">
              <Team3DLogo />
            </div>
            
            <div className="flex items-center gap-x-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] px-3 py-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="text-white">IEEE</span>
              <span className="text-[#EF9E00] font-normal tracking-normal lowercase" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                <span className="uppercase">COMPUTER</span>
              </span>
              <span className="text-white">SOCIETY</span>
            </div>
            
            <h2 
              className="text-[1.8rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.0] sm:leading-[0.95] lg:leading-[0.9] tracking-tight uppercase font-black flex flex-col items-center w-full mt-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {/* Line 1: A Legacy of */}
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-5 w-fit mb-2">
                <span className="text-white whitespace-nowrap">A</span>
                <span className="text-[#EF9E00] font-normal tracking-normal lowercase whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">LEGACY</span>
                </span>
                <span className="text-white whitespace-nowrap">OF</span>
              </div>

              {/* Line 2: Innovation & Leadership */}
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-5 w-fit">
                <span className="text-[#EF9E00] font-normal tracking-normal lowercase whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps' }}>
                  <span className="uppercase">INNOVATION</span>
                </span>
                <span className="text-white whitespace-nowrap">&</span>
                <span className="text-white whitespace-nowrap">LEADERSHIP</span>
              </div>
            </h2>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          <div className="sticky top-0 z-20 h-screen overflow-hidden pointer-events-none">

            {/* Desktop Unified Full-Screen Collage Canvas */}
            <div
              ref={collageRef}
              className="absolute pointer-events-auto"
              style={{
                width: '100vw',
                height: '100vh',
                top: 0,
                left: 0,
                overflow: 'hidden',
                clipPath: 'circle(120% at 50% 50%)',
                willChange: 'clip-path',
                zIndex: 30,
              }}
            >
              <div className="collage-grid-inner w-full h-full">
                <CollageGrid side="left" />
              </div>
            </div>

            {/* Centered text over panels */}
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
              <div
                ref={contentRef}
                className="flex flex-col items-center text-center justify-center absolute inset-0 w-full"
              >
                <h1
                  className="text-white font-black text-center w-full"
                  style={{
                    fontSize: 'clamp(8rem, 14vw, 13rem)',
                    lineHeight: '1.0',
                    fontFamily: 'Henju, serif',
                  }}
                >
                  <AnimatedText duration={2} className="text-center w-full">
                    IEEE CS
                  </AnimatedText>
                </h1>
                <h2
                  className="text-center w-full"
                  style={{
                    color: '#EF9E00',
                    fontSize: 'clamp(2rem, 3.5vw, 4rem)',
                    lineHeight: '1.0',
                    marginTop: '0.5rem',
                    fontFamily: 'Henju, serif',
                  }}
                >
                  Meet Our Team
                </h2>
              </div>
            </div>

          </div>
        </div>

        {/* ══ MOBILE / TABLET ══ */}
        <div className="lg:hidden">
          <div
            ref={mobileHeroRef}
            className="sticky top-0 z-20 h-screen overflow-hidden pointer-events-none"
          >
            {/* Mobile Unified Full-Screen Collage Canvas */}
            <div
              ref={mobileCollageWrapperRef}
              className="absolute pointer-events-auto"
              style={{
                width: '100vw',
                height: '100vh',
                top: 0,
                left: 0,
                overflow: 'hidden',
                clipPath: 'circle(120% at 50% 50%)',
                willChange: 'clip-path',
              }}
            >
              <div className="collage-grid-inner w-full h-full">
                <CollageGrid side="left" />
                <div className="absolute inset-0 bg-black/35 pointer-events-none" />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div
                ref={mobileContentRef}
                className="flex flex-col items-center text-center w-full"
                style={{ marginTop: '-10vh' }}
              >
                <h1
                  className="text-white text-center w-full"
                  style={{
                    fontSize: 'clamp(4rem, 15vw, 6rem)',
                    fontFamily: 'Henju, serif',
                    fontWeight: 900,
                    lineHeight: '1.0',
                  }}
                >
                  <AnimatedText duration={2} className="text-center w-full">
                    IEEE CS
                  </AnimatedText>
                </h1>
                <h2
                  className="text-center w-full mx-auto"
                  style={{
                    color: '#EF9E00',
                    fontSize: 'clamp(1.2rem, 4.5vw, 2.2rem)',
                    fontFamily: 'Henju, serif',
                    fontWeight: 700,
                    lineHeight: '1.1',
                    marginTop: '0.5rem',
                    maxWidth: '80vw',
                  }}
                >
                  Meet Our Team
                </h2>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

function CollageGrid({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '3px',
        background: '#111',
        filter: 'grayscale(1) contrast(1.1) brightness(0.8)',
      }}
    >
      {COLLAGE_PHOTOS.map((photo, i) => (
        <div key={i} className="relative overflow-hidden" style={{ background: '#1a1a1a' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${photo}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 1,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 45%, rgba(0,0,0,0.35) 100%)',
            }}
          >
            <p
              style={{
                fontFamily: 'Special Elite, cursive',
                fontSize: 'clamp(0.4rem, 0.85vw, 0.72rem)',
                color: '#e0e0e0',
                lineHeight: 1.35,
                fontWeight: 700,
              }}
            >
              {HEADLINES[i]}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
