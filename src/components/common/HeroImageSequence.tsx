"use client";

import React, { useRef, useEffect, useState, Suspense, useLayoutEffect } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";

import * as THREE from "three";

const sharedMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#F5A623"),
  roughness: 0.35,
  metalness: 0.4,
});

function Model({ url, scale = 0.35, position = [0, 0, 0] }: { url: string; scale?: number; position?: [number, number, number] }) {
  const { scene } = useGLTF(url, true);
  const modelRef = useRef<THREE.Group>(null);
  
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).material = sharedMaterial;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Continuous spin around its vertical axis
      modelRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive 
        ref={modelRef}
        object={scene} 
        scale={scale} 
        position={position} 
        rotation={[Math.PI / 2, 0, Math.PI / 2]} 
      />
    </Float>
  );
}

export default function HeroImageSequence({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Cross-fade logic: 2D sequence fades out as 3D model fades in at the very end
  const sequenceOpacity = useTransform(scrollYProgress, [0, 0.94, 0.98], [1, 1, 0]);
  const modelOpacity = useTransform(scrollYProgress, [0.94, 0.98, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalFrames = 36;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(4, '0');
        img.src = `/Heroimg/${frameIndex}.avif`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalFrames) {
                setImages(loadedImages);
            }
        };
        loadedImages[i - 1] = img;
    }
  }, []);

  useEffect(() => {
    if (images.length === totalFrames) {
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(currentProgress * totalFrames)
        );
        renderFrame(frameIndex);
    }
  }, [images]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    const dpr = window.devicePixelRatio || 1;
    
    // Set size in memory only if it has changed, preventing layout thrashing on scroll
    const targetWidth = window.innerWidth * dpr;
    const targetHeight = window.innerHeight * dpr;
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
        // Canvas is wider than image (relatively)
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        // Canvas is taller than image (relatively)
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === totalFrames && latest < 0.98) {
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );
        renderFrame(frameIndex);
    }
  });

  useEffect(() => {
    if (images.length === totalFrames && windowSize.width > 0) {
        const currentFrame = Math.min(
            totalFrames - 1,
            Math.floor(scrollYProgress.get() * totalFrames)
        );
        renderFrame(currentFrame);
    }
  }, [images, windowSize]);

  return (
    <div className="w-full h-screen relative overflow-hidden flex items-center justify-center bg-transparent">
      {/* 2D Image Sequence Canvas */}
      <motion.div 
        style={{ scale, opacity: sequenceOpacity }}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </motion.div>

      {/* 3D Model Canvas */}
      <motion.div 
        style={{ opacity: modelOpacity }}
        className="absolute inset-0 z-20"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            <Model 
              url="/logos/ieee.glb" 
              scale={windowSize.width < 768 ? 0.22 : 0.35} 
              position={windowSize.width < 768 ? [0, 0, 0] : [0, 0, 0]} 
            />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </motion.div>
    </div>
  );
}
