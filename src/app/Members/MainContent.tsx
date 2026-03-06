'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PAPER_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`



function SpiralBinding() {
  return (
    <div style={{
      height: '30px',
      background: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      padding: '0 6px',
      gap: '0',
    }}>
      {Array.from({ length: 42 }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: '18px', borderRadius: '50%',
          border: '2.5px solid #555', margin: '0 1.5px',
        }} />
      ))}
    </div>
  )
}

export default function MainContent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <></>
  )
}
