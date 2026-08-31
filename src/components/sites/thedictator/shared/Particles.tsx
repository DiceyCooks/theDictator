"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting particle field that reacts to the cursor.
 *
 * Absolute, not fixed, so it fills the element it is dropped into rather than
 * the viewport. Parent needs position relative.
 *
 * Sits BEHIND content (give it a low z-index). Reading it as depth works better
 * when the type and portrait stay crisp above it.
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
 *
 * CURSOR. The pointer pushes particles away within a radius, and the push decays
 * rather than being held. Two consequences worth keeping:
 *
 *   Displacement is stored per particle and eased back toward zero, so the field
 *   settles after the cursor leaves instead of staying dented. Moving particles
 *   directly would permanently deform the field wherever the mouse had been.
 *
 *   Depth applies here too — nearer (bigger) particles are shoved further, which
 *   is what makes the interaction feel like parallax rather than a flat ripple.
 */

type ParticlesProps = {
  /** Particles per million square pixels — density, not a raw count, so the
      field looks the same on a phone and an ultrawide. */
  density?: number;
  /** Cap so huge sections do not spawn thousands. */
  max?: number;
  className?: string;
  color?: string;
  /** Cursor influence radius in CSS px. */
  pointerRadius?: number;
  /** How hard the cursor shoves. */
  pointerStrength?: number;
};

type Dot = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  alpha: number;
  depth: number;
  /** Cursor displacement, eased back to zero. */
  ox: number;
  oy: number;
};

export function Particles({
  density = 90,
  max = 260,
  className = "",
  color = "255,255,255",
  pointerRadius = 170,
  pointerStrength = 0.9,
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

    // Kept in viewport coordinates and converted per frame. The layer is sticky
    // and the page scrolls under it, so a position cached in local coordinates
    // goes stale the moment anything moves.
    const pointer = { cx: -9999, cy: -9999, active: false };

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

      const count = Math.min(max, Math.round(((w * h) / 1_000_000) * density));
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
          depth,
          ox: 0,
          oy: 0,
        };
      });
    };

    const render = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const x = d.x + Math.sin(t * 0.0004 + d.phase) * d.drift * 26 + d.ox;
        const y = d.y + d.oy;
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${d.alpha})`;
        ctx.fill();
      }
    };

    build();
    render(0);

    if (still) {
      const roStill = new ResizeObserver(() => {
        build();
        render(0);
      });
      roStill.observe(parent);
      return () => roStill.disconnect();
    }

    const onMove = (e: PointerEvent) => {
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    const r2 = pointerRadius * pointerRadius;
    let frame = 0;

    const loop = (t: number) => {
      const rect = parent.getBoundingClientRect();
      const mx = pointer.cx - rect.left;
      const my = pointer.cy - rect.top;
      const near =
        pointer.active &&
        mx > -pointerRadius &&
        my > -pointerRadius &&
        mx < w + pointerRadius &&
        my < h + pointerRadius;

      for (const d of dots) {
        d.y -= d.vy;
        // Wrap rather than respawn, so nothing pops into existence mid-frame.
        if (d.y < -4) {
          d.y = h + 4;
          d.x = Math.random() * w;
        }

        if (near) {
          const dx = d.x + d.ox - mx;
          const dy = d.y + d.oy - my;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2 && dist2 > 0.001) {
            const dist = Math.sqrt(dist2);
            // Linear falloff to zero at the radius edge; scaled by depth so
            // foreground particles move further than background ones.
            const force =
              (1 - dist / pointerRadius) *
              pointerStrength *
              (0.4 + d.depth * 1.3);
            d.ox += (dx / dist) * force;
            d.oy += (dy / dist) * force;
          }
        }

        // Spring back. Without this the field stays permanently dented.
        d.ox *= 0.94;
        d.oy *= 0.94;
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
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [density, max, color, pointerRadius, pointerStrength]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
