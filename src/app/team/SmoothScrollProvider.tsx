'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      syncTouch: true,
    })

    lenisRef.current = lenis

    // Store the listener so we can remove it
    const handleLenisScroll = () => ScrollTrigger.update()
    lenis.on('scroll', handleLenisScroll)

    // Use GSAP ticker to drive Lenis
    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      // STOP ticker before destroying anything else
      gsap.ticker.remove(tickerFn)

      // Remove scroll listener
      lenis.off('scroll', handleLenisScroll)

      // Kill ALL ScrollTriggers with force unpin - this unpins pinned elements (like HorizontalGallery)
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill(true) // true = force unpin and revert inline styles
      })

      // Destroy Lenis completely
      lenis.destroy()
      lenisRef.current = null

      // AGGRESSIVE cleanup - Lenis might have locked scroll
      // Force enable scrolling on all elements
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.body.style.height = 'auto'
      document.documentElement.style.height = 'auto'
      
      // Remove any transform/scroll-behavior CSS
      document.body.style.transform = ''
      document.documentElement.style.transform = ''
      
      // Force scroll position to top
      window.scrollY = 0
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      // Re-enable scrolling on html/body
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.scrollBehavior = 'auto'

      // Force browser to recalculate scroll capacity
      window.dispatchEvent(new Event('scroll', { bubbles: true }))

      // Give browser time to process changes before next page mounts
      setTimeout(() => {
        // Double-check scroll is unlocked
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = 'auto'
        }
        if (document.documentElement.style.overflow === 'hidden') {
          document.documentElement.style.overflow = 'auto'
        }
        // Refresh ScrollTrigger to reset global state for next page
        ScrollTrigger.refresh()
      }, 0)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
