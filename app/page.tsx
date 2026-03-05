"use client";

import dynamic from 'next/dynamic';
import { Skiper19 } from "@/src/components/ui/stroke";
import TargetCursor from "@/src/components/common/TargetCursor";
const ImageHover = dynamic(() => import('@/src/components/common/ImageHover'), { ssr: false });
const ScrollGrid = dynamic(() => import('@/src/components/common/ScrollGrid'), { ssr: false });
const TeamCard = dynamic(() => import('@/src/components/common/TeamCard'), { ssr: false });
const HorizontalGallery = dynamic(() => import('@/src/components/gallery/HorizontalGallery'), { ssr: false });
const CardStack = dynamic(() => import('@/src/components/common/CardStack'), { ssr: false });
const Gallery3D = dynamic(() => import('@/src/components/common/Gallery3D'), { ssr: false });

export default function Home() {
  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <div>
        <Skiper19 />
        <ImageHover />

        <ScrollGrid />

        <TeamCard
          image="https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
          name="John Doe"
          role="Lead Developer"
          socials={{
            linkedin: "https://linkedin.com/in/johndoe",
            twitter: "https://twitter.com/johndoe",
            github: "https://github.com/johndoe"
          }}
          className="w-[min(400px,90vw)] h-[min(600px,120vw)]"
        />

        <HorizontalGallery />
      </div>

      <div>
        <CardStack />
      </div>

      <section style={{ width: '100%', height: '600px' }}>
        <Gallery3D title="IEEE CS" />
      </section>
    </>
  );
}