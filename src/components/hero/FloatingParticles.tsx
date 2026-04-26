"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Number of particles to render. */
  count?: number;
  /** Optional className applied to the canvas wrapper for positioning. */
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  pulse: number;
  pulseSpeed: number;
};

export function FloatingParticles({
  count = 120,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      // Slight upward bias so the field feels alive, not falling.
      vy: (Math.random() - 0.65) * 0.25,
      baseSize: 1.0 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.025,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = Array.from({ length: count }, spawn);
      }
    };

    const tick = () => {
      if (!running) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around viewport edges so the field is seamless.
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        const twinkle = 0.5 + 0.5 * Math.sin(p.pulse);
        const alphaCore = 0.55 + twinkle * 0.45;
        const alphaGlow = 0.25 + twinkle * 0.45;
        const radius = p.baseSize * (1 + twinkle * 0.35);

        // Pass 1: soft amber halo.
        const glow = radius * 5.0;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
        grad.addColorStop(0, `rgba(255, 215, 150, ${alphaGlow})`);
        grad.addColorStop(0.3, `rgba(255, 150, 70, ${alphaGlow * 0.55})`);
        grad.addColorStop(1, "rgba(220, 110, 40, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Pass 2: solid bright core for the "more solid" look.
        ctx.fillStyle = `rgba(255, 240, 210, ${alphaCore})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    rafId = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Pause the field when it's offscreen to save GPU.
    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
