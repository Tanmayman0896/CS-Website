'use client'

import { useEffect } from 'react'

import HeroSection from '@/src/app/team/HeroSection'
import MainContent from '@/src/app/team/MainContent'
import StackedSections from '@/src/app/team/StackedSections'
import SmoothScrollProvider from '@/src/app/team/SmoothScrollProvider'

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
