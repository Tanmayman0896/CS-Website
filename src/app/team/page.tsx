'use client'

import { useEffect } from 'react'
import HeroSection from '@/app/team/HeroSection'
import MainContent from '@/app/team/MainContent'
import SmoothScrollProvider from '@/app/team/SmoothScrollProvider'
import dynamic from 'next/dynamic'

const StackedSections = dynamic(() => import('@/app/team/StackedSections'), { ssr: false })

export default function TeamPage() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <SmoothScrollProvider>
      <main>
        <HeroSection />
        <MainContent />
        <StackedSections />
      </main>
    </SmoothScrollProvider>
  )
}
