"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const gltf = useGLTF("/logos/ieee.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Tilt face toward camera 
    ref.current.rotation.x = Math.PI / 2;

    //color
    ref.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#F5A623"),
          roughness: 0.35,
          metalness: 0.4,
        });
      }
    });
  }, []);

  // Constant auto-spin on Z 
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.5;
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.6} />;
}

export default function Logo3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 48 }}
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
