"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function HeroModel({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const { scene } = useGLTF("/Hero.glb", true);
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!scrollContainerRef?.current || !ref.current) return;

    // Calculate scroll progress manually based on trigger container scroll position
    const rect = scrollContainerRef.current.getBoundingClientRect();
    const totalScroll = rect.height - window.innerHeight;
    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

    // Interpolate values using GSAP's utility function
    const targetScale = gsap.utils.interpolate(4, 2, progress);
    const targetZ = gsap.utils.interpolate(-2, -20, progress);

    ref.current.scale.setScalar(targetScale);
    ref.current.position.z = targetZ;
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      rotation={[Math.PI / 2, 0, 0]} 
    />
  );
}

useGLTF.preload("/Hero.glb");

function IEEEModel() {
  const { scene } = useGLTF("");
  const ref = useRef<THREE.Group>(null);


  return (
    <primitive 
      ref={ref} 
      object={scene} 
      scale={0.8} 
      position={[0, 0, 3]} 
      rotation={[Math.PI / 2, 0, 0]} 
    />
  );
}

export default function Hero3D({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  return (
    <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.2}
        />
        <Suspense fallback={null}>
          <HeroModel scrollContainerRef={scrollContainerRef} />
          <Environment files="/potsdamer_platz_1k.hdr" />
        </Suspense>
      </Canvas>
    </div>
  );
}
