"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function AnimatedExplodingImage({ src, alt, className }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const [exploding, setExploding] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(my, { stiffness: 220, damping: 26 });
  const ry = useSpring(mx, { stiffness: 220, damping: 26 });

  const perspective = useMemo(() => (reduce ? 0 : 900), [reduce]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function resetTilt() {
    mx.set(0);
    my.set(0);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || exploding) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    // subtle 3D: ±10deg
    mx.set(px * 10);
    my.set(-py * 10);
  }

  function spawnParticles() {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const count = 90;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const ang = rand(0, Math.PI * 2);
      const sp = rand(1.4, 5.2);
      particles.push({
        x: cx + rand(-10, 10),
        y: cy + rand(-10, 10),
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - rand(0.3, 1.5),
        r: rand(1.2, 3.6),
        a: rand(0.65, 1),
      });
    }
    particlesRef.current = particles;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const start = performance.now();
    const gravity = 0.06;

    const tick = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, rect.width, rect.height);

      const p = particlesRef.current;
      for (const x of p) {
        x.vy += gravity;
        x.x += x.vx;
        x.y += x.vy;
        x.a *= 0.987;
        ctx.globalAlpha = Math.max(0, x.a);
        ctx.fillStyle = "rgba(255, 203, 46, 1)";
        ctx.beginPath();
        ctx.arc(x.x, x.y, x.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (elapsed < 900 && p.some((q) => q.a > 0.06)) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }

  async function explode() {
    if (reduce || exploding) return;
    setExploding(true);
    resetTilt();
    spawnParticles();
    // let particles render, then reset
    window.setTimeout(() => setExploding(false), 650);
  }

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      onClick={explode}
      className={className}
      style={{
        perspective: perspective ? `${perspective}px` : undefined,
      }}
      role="button"
      tabIndex={0}
      aria-label="Анимированное изображение"
    >
      <motion.div
        className="relative h-full w-full"
        style={
          reduce
            ? undefined
            : {
                rotateX: rx,
                rotateY: ry,
                transformStyle: "preserve-3d",
              }
        }
        animate={
          exploding
            ? {
                scale: [1, 1.02, 0.98, 1],
              }
            : undefined
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 540px"
          className={[
            "select-none object-contain",
            exploding ? "opacity-70 saturate-[0.9]" : "opacity-100",
          ].join(" ")}
          draggable={false}
        />
        <canvas
          ref={canvasRef}
          className={[
            "pointer-events-none absolute inset-0",
            exploding ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      </motion.div>
    </motion.div>
  );
}
