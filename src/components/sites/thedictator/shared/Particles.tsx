"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting particle field — dust caught in the light.
 *
 * Absolute, not fixed, so it fills the element it is dropped into rather than
 * the viewport. Parent needs position relative.
 *
 * Sits BEHIND content (give it a low z-index), unlike the grain which sits on
 * top. Dust is in the air between you and the scene at the front, but reading it
 * as depth works better when the type and portrait stay crisp above it.
 *
 * Design notes, since particle fields go wrong in predictable ways:
 *
 *   Varied radius AND speed, correlated. Near particles are bigger and move
 *   faster; far ones are small and slow. Uniform particles read as a screensaver
 *   because nothing suggests depth.
 *
 *   Wrapping, not respawning. A particle leaving the top re-enters at the bottom
 *   with its x jittered. Respawning at random positions produces visible popping.
 *
 *   Drift is mostly vertical with a slow horizontal sway, each particle on its
 *   own phase, so the field breathes instead of marching in formation.
 */

type ParticlesProps = {
  /** Particles per million square pixels — density, not a raw count, so the
      field looks the same on a phone and an ultrawide. */
  density?: number;
  /** Cap so huge sections do not spawn thousands. */
  max?: number;
  className?: string;
  color?: string;
};

type Dot = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  alpha: number;
};

export function Particles({
  density = 90,
  max = 260,
  className = "",
  color = "255,255,255",
}: ParticlesProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;

    const build = () => {
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));

      // Cap DPR at 2. Beyond that the pixel cost doubles again for a difference
      // nobody can see on soft-edged dots.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(max, Math.round((w * h) / 1_000_000 * density));
      dots = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + depth * 1.9,
          vy: 0.06 + depth * 0.22,
          drift: 0.15 + depth * 0.35,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.12 + depth * 0.4,
        };
      });
    };

    const render = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const x = d.x + Math.sin(t * 0.0004 + d.phase) * d.drift * 26;
        ctx.beginPath();
        ctx.arc(x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${d.alpha})`;
        ctx.fill();
      }
    };

    build();
    render(0);

    if (still) {
      const ro = new ResizeObserver(() => {
        build();
        render(0);
      });
      ro.observe(parent);
      return () => ro.disconnect();
    }

    let frame = 0;
    const loop = (t: number) => {
      for (const d of dots) {
        d.y -= d.vy;
        // Wrap rather than respawn, so nothing pops into existence mid-frame.
        if (d.y < -4) {
          d.y = h + 4;
          d.x = Math.random() * w;
        }
      }
      render(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const ro = new ResizeObserver(build);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [density, max, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
