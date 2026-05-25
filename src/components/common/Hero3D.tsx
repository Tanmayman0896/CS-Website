"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

import { useScroll, useTransform } from "framer-motion";

function HeroModel({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const { scene } = useGLTF("/Hero.glb", true);
  const ref = useRef<THREE.Group>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });
  
  // Animate through the entire pin duration (0 to 1)
  const scale = useTransform(scrollYProgress, [0, 1], [4, 2]);
  const zPos = useTransform(scrollYProgress, [0, 1], [-2, -20]);

  useFrame(() => {
    if (ref.current) {
      ref.current.scale.setScalar(scale.get());
      ref.current.position.z = zPos.get();
    }
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      rotation={[Math.PI / 2, 0, 0]} 
    />
  );
}

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
