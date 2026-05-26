"use client";

import { useEffect, useRef } from "react";

interface TopographicBackgroundProps {
  className?: string;
  lineColor?: string;
  backgroundColor?: string;
  lineCount?: number;
  animated?: boolean;
}

export default function TopographicBackground({
  className = "",
  lineColor = "rgba(180, 140, 60, 0.33)",
  backgroundColor = "#0d0d0d",
  lineCount = 5,
  animated = true,
}: TopographicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const noise = (x: number, y: number, t: number): number => {
      return (
        Math.sin(x * 0.8 + t * 0.12) * Math.cos(y * 0.6 + t * 0.09) * 0.4 +
        Math.sin(x * 0.4 - y * 0.5 + t * 0.07) * 0.3 +
        Math.cos(x * 1.1 + y * 0.9 - t * 0.11) * 0.2 +
        Math.sin(x * 0.25 + y * 0.3 + t * 0.05) * 0.1
      );
    };

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const drawContours = (t: number) => {
      const w = W();
      const h = H();

      ctx.clearRect(0, 0, w, h);
      if (backgroundColor !== "transparent") {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, w, h);
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Create a responsive grid so the topographic lines are never stretched
      const maxDim = Math.max(w, h);
      const cellSize = Math.max(20, maxDim / 100); 
      
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const cellW = w / cols;
      const cellH = h / rows;

      const field: number[][] = [];
      for (let j = 0; j <= rows; j++) {
        field[j] = [];
        for (let i = 0; i <= cols; i++) {
          // Base the noise coordinates on the physical screen size 
          // so the noise scale remains constantly proportioned
          const nx = (i * cellW) / 250;
          const ny = (j * cellH) / 250;
          field[j][i] = noise(nx, ny, t);
        }
      }

      const minV = -0.85;
      const maxV = 0.85;

      for (let c = 0; c < lineCount; c++) {
        const threshold = minV + ((maxV - minV) * c) / (lineCount - 1);

        ctx.beginPath();

        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const v00 = field[j][i];
            const v10 = field[j][i + 1];
            const v01 = field[j + 1][i];
            const v11 = field[j + 1][i + 1];

            const x0 = i * cellW;
            const y0 = j * cellH;
            const x1 = x0 + cellW;
            const y1 = y0 + cellH;

            const lerp = (a: number, b: number, va: number, vb: number) =>
              a + ((b - a) * (threshold - va)) / (vb - va);

            const idx =
              (v00 > threshold ? 8 : 0) |
              (v10 > threshold ? 4 : 0) |
              (v11 > threshold ? 2 : 0) |
              (v01 > threshold ? 1 : 0);

            if (idx === 0 || idx === 15) continue;

            const top = { x: lerp(x0, x1, v00, v10), y: y0 };
            const right = { x: x1, y: lerp(y0, y1, v10, v11) };
            const bottom = { x: lerp(x0, x1, v01, v11), y: y1 };
            const left = { x: x0, y: lerp(y0, y1, v00, v01) };

            const segments: Array<[{ x: number; y: number }, { x: number; y: number }]> = [];

            switch (idx) {
              case 1:  segments.push([bottom, left]); break;
              case 2:  segments.push([right, bottom]); break;
              case 3:  segments.push([right, left]); break;
              case 4:  segments.push([top, right]); break;
              case 5:  segments.push([top, left]); segments.push([right, bottom]); break;
              case 6:  segments.push([top, bottom]); break;
              case 7:  segments.push([top, left]); break;
              case 8:  segments.push([left, top]); break;
              case 9:  segments.push([bottom, top]); break;
              case 10: segments.push([left, bottom]); segments.push([top, right]); break;
              case 11: segments.push([right, top]); break;
              case 12: segments.push([left, right]); break;
              case 13: segments.push([bottom, right]); break;
              case 14: segments.push([left, bottom]); break;
            }

            for (const [from, to] of segments) {
              ctx.moveTo(from.x, from.y);
              ctx.lineTo(to.x, to.y);
            }
          }
        }

        ctx.stroke();
        ctx.beginPath();
      }
    };

    const animate = () => {
      timeRef.current += animated ? 0.04 : 0;
      drawContours(timeRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [lineColor, backgroundColor, lineCount, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{ background: backgroundColor, width: "100%", height: "100%", display: "block" }}
    />
  );
}


export function TopographicDemo() {
  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}>
      <TopographicBackground
        lineColor="rgba(180, 140, 60, 0.33)"
        backgroundColor="#0d0d0d"
        lineCount={5}
        animated={true}
      />
    </div>
  );
}