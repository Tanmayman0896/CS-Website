'use client';

import dynamic from 'next/dynamic';
import LineBackground from '@/components/LineBackground';
import ScrollGrid from '@/src/components/common/ScrollGrid';
import HorizontalGallery from '@/src/app/gallery/HorizontalGallery';
import SmoothScrollProvider from '@/src/app/team/SmoothScrollProvider';
import ZoomGallery from '@/src/app/gallery/ZoomGallery';
const Gallery3D = dynamic(() => import('@/src/components/common/Gallery3D'), { ssr: false });

export default function Gallery() {
  return (<>

    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-black w-full">

        <div className="fixed inset-0 z-0 pointer-events-none">
          <LineBackground />
        </div>

        <div className="relative z-10 w-full">
          <div className="relative w-full h-screen">
  <video
    src="/images/gallery/IMG_2175.MOV"
    autoPlay
    playsInline
    loop={false}
    controls={false}
    className="w-full h-full object-cover"
  />
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
  >
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&display=swap');`}</style>
    <h1
      className="text-[90px] md:text-[150px] leading-[1] text-white uppercase"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 700,
        fontStyle: 'italic',
        letterSpacing: '0.05em',
        textShadow: '0 4px 60px rgba(0,0,0,0.6)',
      }}
    >
      Gallery
    </h1>
  </div>
</div>
          <HorizontalGallery />
          <ScrollGrid />
          {/*<div className="hidden md:block">
            <ZoomGallery />
          </div>*/}
        </div>
      </div>
    </SmoothScrollProvider>
    <section className="relative z-50 block md:hidden overflow-hidden bg-transparent" style={{ width: '100%', height: '100vh', minHeight: '600px' }}>
      <Gallery3D title="IEEE CS" />
    </section>
  </>
  );
}
