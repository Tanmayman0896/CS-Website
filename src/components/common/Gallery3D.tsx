"use client";
import { useEffect, useRef, useCallback } from 'react';
import styles from './Gallery3D.module.css';


interface SlotConfig {
  destX: number;
  destY: number;
  img: string;
  t0: number;
  spd: number;
}

interface CardState {
  el: HTMLDivElement;
  slot: SlotConfig;
  t: number;
}

export interface Gallery3DProps {

  title?: string;

  images?: [string, string, string, string, string];
  cardWidth?: number;
  cardAspect?: number;
  overflowFraction?: number;
  className?: string;
}


const DEFAULT_IMAGES: [string, string, string, string, string] = [
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=760&q=85',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=760&q=85',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=760&q=85',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=760&q=85',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=760&q=85',
];

function easeIn(t: number): number {
  return t * t * t;
}

const SCALE_FAR = 0.04;


export default function Gallery3D({
  title = 'GALLERY 3D',
  images = DEFAULT_IMAGES,
  cardWidth,
  cardAspect = 0.7,
  overflowFraction = 0.6,
  className,
}: Gallery3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const buildSlots = useCallback(
    (cw: number, ch: number, bw: number, bh: number): SlotConfig[] => {
      const cx = cw / 2;
      const cy = ch / 2;
      const ox = bw * overflowFraction;
      const oy = bh * overflowFraction;

      return [
        // top-left
        { destX: -ox, destY: -oy, img: images[0], t0: 0.00, spd: 0.00018 },
        // top-right
        { destX: cw + ox, destY: -oy, img: images[1], t0: 0.35, spd: 0.00022 },
        // center (flies straight at viewer)
        { destX: cx, destY: cy, img: images[2], t0: 0.65, spd: 0.00016 },
        // bottom-left
        { destX: -ox, destY: ch + oy, img: images[3], t0: 0.20, spd: 0.00020 },
        // bottom-right
        { destX: cw + ox, destY: ch + oy, img: images[4], t0: 0.50, spd: 0.00019 },
      ];
    },
    [images, overflowFraction],
  );

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const { width: cw, height: ch } = scene.getBoundingClientRect();
    const cx = cw / 2;
    const cy = ch / 2;

    const bw = cardWidth ?? Math.round(Math.min(cw * 0.32, 380));
    const bh = Math.round(bw * cardAspect);

    const slots = buildSlots(cw, ch, bw, bh);

    const cardStates: CardState[] = slots.map(slot => {
      const el = document.createElement('div');
      el.className = styles.card;
      el.style.width = `${bw}px`;
      el.style.height = `${bh}px`;
      el.style.willChange = 'transform, opacity';
      el.style.contain = 'layout style paint';

      const inner = document.createElement('div');
      inner.className = styles.cardInner;

      const img = document.createElement('img');
      img.src = slot.img;
      img.draggable = false;
      img.loading = 'eager';
      img.decoding = 'async';
      img.alt = '';

      inner.appendChild(img);
      el.appendChild(inner);
      scene.appendChild(el);

      return { el, slot, t: slot.t0 };
    });

    let last: number | null = null;

    function tick(now: number) {
      if (!last) last = now;
      const dt = Math.min(now - last, 50);
      last = now;

      for (const c of cardStates) {
        c.t += c.slot.spd * dt;
        if (c.t > 1) c.t -= 1;

        const et = easeIn(c.t);

        const px = cx + (c.slot.destX - cx) * et;
        const py = cy + (c.slot.destY - cy) * et;

        const scale = SCALE_FAR + (1 - SCALE_FAR) * et;

        let opacity: number;
        if (c.t < 0.06) opacity = c.t / 0.06;
        else if (c.t > 0.82) opacity = 1 - (c.t - 0.82) / 0.18;
        else opacity = 1;

        const left = px - bw / 2;
        const top = py - bh / 2;

        c.el.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
        c.el.style.opacity = String(Math.max(0, opacity));
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function onMouseMove(e: MouseEvent) {
      const cur = cursorRef.current;
      if (!cur || !scene) return;
      const rect = scene.getBoundingClientRect();
      cur.style.left = `${e.clientX - rect.left}px`;
      cur.style.top = `${e.clientY - rect.top}px`;
    }

    scene.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      scene.removeEventListener('mousemove', onMouseMove);
      for (const c of cardStates) c.el.remove();
    };
  }, [buildSlots, cardAspect, cardWidth]);

  return (
    <div
      ref={sceneRef}
      className={`${styles.scene}${className ? ` ${className}` : ''}`}
    >
      <div ref={cursorRef} className={styles.cursor} />
      <div className={styles.grain} />
      <span className={styles.title}>{title}</span>
    </div>
  );
}