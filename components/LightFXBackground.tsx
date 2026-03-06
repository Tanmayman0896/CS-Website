'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  vx: number;
  vy: number;
}

export default function LightFXBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initializeParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 150;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.6 ? '#FFFFFF' : '#5DADE2',
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
      particlesRef.current = particles;
    };

    initializeParticles();

    // Draw single angled ray from right side covering bottom
    const drawRays = () => {
      const rayStartX = canvas.width * 1.1;
      const rayStartY = canvas.height * -1.1;
      const rayEndX = canvas.width * -0.3;
      const rayEndY = canvas.height * 1.1;
      const rayWidth = 400;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Create linear gradient for the angled ray
      const gradient = ctx.createLinearGradient(rayStartX, rayStartY, rayEndX, rayEndY);
      gradient.addColorStop(0, 'rgba(255, 207, 0, 0)');
      gradient.addColorStop(0.3, 'rgba(141, 129, 75, 0.4)');
      gradient.addColorStop(0.5, 'rgba(227, 206, 109, 0.5)');
      gradient.addColorStop(0.7, 'rgba(97, 83, 20, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 207, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      const angle = Math.atan2(rayEndY - rayStartY, rayEndX - rayStartX);
      const perpX = Math.cos(angle + Math.PI / 2) * (rayWidth / 2);
      const perpY = Math.sin(angle + Math.PI / 2) * (rayWidth / 2);

      ctx.moveTo(rayStartX + perpX, rayStartY + perpY);
      ctx.lineTo(rayEndX + perpX, rayEndY + perpY);
      ctx.lineTo(rayEndX - perpX, rayEndY - perpY);
      ctx.lineTo(rayStartX - perpX, rayStartY - perpY);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with pure black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw rays
      drawRays();

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#000000' }}
    />
  );
}
