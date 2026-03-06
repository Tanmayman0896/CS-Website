'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const FONT_FAMILIES = [
  'Comic Sans MS, cursive',
  'Impact, fantasy',
  'Chalkduster, cursive',
  'Luckiest Guy, cursive',
  'Bangers, cursive',
  'Permanent Marker, cursive',
  'Rock Salt, cursive',
  'Henju, serif',
]

interface AnimatedTextProps {
  children: React.ReactNode
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({
  children,
  duration = 2,
  className = '',
  style = {},
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const steps = FONT_FAMILIES.length
    const stepDuration = duration / steps

    // Lock scroll during animation
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const preventScroll = (e: TouchEvent) => e.preventDefault()
    window.addEventListener('touchmove', preventScroll, { passive: false })

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow || 'auto'
        window.removeEventListener('touchmove', preventScroll)
      },
    })

    FONT_FAMILIES.forEach((family, i) => {
      tl.to(
        textRef.current,
        {
          duration: 0.15,
          ease: 'none',
          onStart: () => {
            if (textRef.current) {
              textRef.current.style.fontFamily = family
            }
          },
        },
        i * stepDuration
      )
    })

    return () => {
      tl.kill()
      document.body.style.overflow = prevOverflow || 'auto'
      window.removeEventListener('touchmove', preventScroll)
    }
  }, [duration])

  return (
    <span
      ref={textRef}
      className={className}
      style={{ display: 'inline-block', willChange: 'font-family', ...style }}
    >
      {children}
    </span>
  )
}
