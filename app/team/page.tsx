'use client'

import HeroSection from '@/src/app/Members/HeroSection'
import MainContent from '@/src/app/Members/MainContent'
import StackedSections from '@/src/components/common/StackedSections'
import SmoothScrollProvider from '@/src/app/Members/SmoothScrollProvider'

export default function TeamPage() {
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
