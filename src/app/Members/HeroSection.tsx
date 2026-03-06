'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import AnimatedText from './AnimatedText'

gsap.registerPlugin(ScrollTrigger)

const TEAR_POINTS = [
  [50.0, 0],
  [49.2, 3.8],
  [51.4, 7.1],
  [48.6, 11.3],
  [52.1, 15.0],
  [47.8, 19.2],
  [51.5, 23.0],
  [48.2, 27.4],
  [52.8, 31.1],
  [47.4, 35.5],
  [51.9, 39.2],
  [48.0, 43.8],
  [52.5, 47.5],
  [47.6, 52.0],
  [51.3, 56.3],
  [48.8, 60.0],
  [52.2, 64.5],
  [47.3, 68.8],
  [51.7, 72.5],
  [48.4, 77.0],
  [52.0, 81.3],
  [47.9, 85.5],
  [51.1, 90.0],
  [48.7, 94.3],
  [50.5, 97.8],
  [50.0, 100],
]

// Build clip-path polygon for left half
function buildLeftClip(): string {
  const pts = [
    '0% 0%',
    ...TEAR_POINTS.map(([x, y]) => `${x}% ${y}%`),
    '0% 100%',
  ]
  return `polygon(${pts.join(', ')})`
}

// Build clip-path polygon for right half  
function buildRightClip(): string {
  const pts = [
    '100% 0%',
    ...TEAR_POINTS.map(([x, y]) => `${x}% ${y}%`),
    '100% 100%',
  ]
  return `polygon(${pts.join(', ')})`
}

// Newspaper collage images — dark, B&W grid of event photos
const COLLAGE_PHOTOS = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
]

//to wrute something on images
const HEADLINES = [
  "",
  ""
]

const EC_MEMBERS = [
  { name:'Arya Sharma',  role:'President',      photo:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80' },
  { name:'Rohan Verma',  role:'Vice President', photo:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=80' },
  { name:'Priya Nair',   role:'Secretary',      photo:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&q=80' },
  { name:'Kabir Singh',  role:'Treasurer',      photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80' },
]

function ECCard({ name, role, photo }: { name: string; role: string; photo: string }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      style={{ position:'relative', width:'220px', height:'290px', overflow:'hidden', flexShrink:0, boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.7)' : '0 8px 24px rgba(0,0,0,0.5)', cursor:'pointer', transition:'box-shadow 0.4s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={photo} alt={name}
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter: hovered ? 'grayscale(0)' : 'grayscale(1)', transition:'filter 0.5s ease, transform 0.5s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        loading="lazy"
      />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />
      {/* Social icons */}
      <div style={{ position:'absolute', top:'12px', right:'12px', display:'flex', flexDirection:'column', gap:'8px', opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(12px)', transition:'opacity 0.3s ease, transform 0.3s ease' }}>
        <a href="#" target="_blank" rel="noopener noreferrer" style={{ width:'34px', height:'34px', borderRadius:'50%', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', textDecoration:'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" style={{ width:'34px', height:'34px', borderRadius:'50%', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', textDecoration:'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
      </div>
      <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
        <p style={{ margin:0, fontWeight:700, fontSize:'1rem', color:'#fff', lineHeight:1.2 }}>{name}</p>
        <p style={{ margin:'4px 0 0', fontWeight:400, fontSize:'0.78rem', color:'rgba(255,255,255,0.6)' }}>{role}</p>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const contentRef        = useRef<HTMLDivElement>(null)
  const leftRef           = useRef<HTMLDivElement>(null)
  const rightRef          = useRef<HTMLDivElement>(null)
  const ourStoryWrapper   = useRef<HTMLDivElement>(null)
  const mobileContentRef  = useRef<HTMLDivElement>(null)
  const mobileHeroRef     = useRef<HTMLDivElement>(null)
  const heroRef           = useRef<HTMLDivElement>(null)


  // Pull HeroSection up to cover the sticky navbar
  useEffect(() => {
    const nav = document.querySelector('nav')
    if (nav && heroRef.current) {
      heroRef.current.style.marginTop = `-${nav.clientHeight}px`
    }
  }, [])

  useEffect(() => {
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
          end: '+=1400',
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
      })

      // Step 2: slide halves apart simultaneously
      tl.to(
        leftRef.current,
        { x: '-100%', ease: 'power4.inOut', duration: 3.5 },
      )
      tl.to(rightRef.current, { x: '100%', ease: 'power4.inOut', duration: 3.5 }, '<')
    })

    // MOBILE/TABLET scroll animation
    mm.add('(max-width: 1024px)', () => {
      gsap.to([mobileHeroRef.current, mobileContentRef.current], {
        y: -window.innerHeight * 1.3,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: ourStoryWrapper.current,
          start: 'top top',
          end: '+=1450',
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })
    })

    ScrollTrigger.refresh()

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={heroRef} className="relative w-screen overflow-x-hidden text-white bg-black">
      <div ref={ourStoryWrapper} className="relative h-screen z-10 bg-black">

        {/* EC section */}
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{ background: '#080808' }}
        >
          <div
            id="hero-ec-content"
            style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '0 5vw', opacity: 1,
            }}
          >
            {/* Glow */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 70% 50% at 50% 10%, rgba(239,158,0,0.12) 0%, transparent 70%)' }} />
            {/* Title */}
            <h2 style={{ position:'relative', zIndex:2, fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:900, color:'#fff', letterSpacing:'0.04em', marginBottom:'24px', textAlign:'center', textShadow:'0 0 40px rgba(239,158,0,0.4)' }}>
              Executive Committee
            </h2>
            {/* Cards */}
            <div style={{ position:'relative', zIndex:2, display:'flex', flexWrap:'wrap', gap:'18px', width:'100%', maxWidth:'980px', justifyContent:'center' }}>
              {EC_MEMBERS.map((m) => (
                <ECCard key={m.name} name={m.name} role={m.role} photo={m.photo} />
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          <div className="sticky top-0 z-20 h-screen overflow-hidden pointer-events-none">

            {/* Left torn panel */}
            <div
              ref={leftRef}
              className="absolute top-0 left-0 h-screen z-30 will-change-transform pointer-events-auto"
              style={{
                width: '100vw',
                height: '104vh',
                top: '-2vh',
                clipPath: buildLeftClip(),
              }}
            >
              <CollageGrid side="left" />
            </div>

            {/* Right torn panel */}
            <div
              ref={rightRef}
              className="absolute top-0 right-0 h-screen z-30 will-change-transform pointer-events-auto"
              style={{
                width: '100vw',
                height: '104vh',
                top: '-2vh',
                clipPath: buildRightClip(),
              }}
            >
              <CollageGrid side="right" />
            </div>

            {/* Centered text over panels */}
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
              <div
                ref={contentRef}
                className="flex flex-col items-center text-center justify-center"
              >
                <h1
                  className="text-white font-black"
                  style={{
                    fontSize: 'clamp(8rem, 14vw, 13rem)',
                    lineHeight: '1.0',
                  }}
                >
                  <AnimatedText duration={2}>
                    IEEE CS
                  </AnimatedText>
                </h1>
                <h2
                  style={{
                    color: '#EF9E00',
                    fontSize: 'clamp(2rem, 3.5vw, 4rem)',          
                    lineHeight: '1.0',
                    marginTop: '0.5rem',
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
            className="sticky top-0 z-20 h-screen overflow-hidden"
          >
            {/* Mobile collage background */}
            <div className="absolute inset-0">
              <CollageGrid side="left" />
            </div>
            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div
                ref={mobileContentRef}
                className="flex flex-col items-center text-center"
                style={{ transform: 'translateY(-10vh)' }}
              >
                <h1
                  className="text-white"
                  style={{
                    fontSize: 'clamp(4rem, 15vw, 6rem)',
                    fontFamily: 'Henju, serif',
                    fontWeight: 900,
                    lineHeight: '1.0',
                  }}
                >
                  <AnimatedText duration={2}>
                    IEEE CS
                  </AnimatedText>
                </h1>
                <h2
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
              {[88, 80, 90, 72, 65].map((w, j) => (
                <div
                  key={j}
                  style={{ height: '1.5px', width: `${w}%`, background: 'rgba(255,255,255,0.18)', borderRadius: '1px' }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
