"use client";

import { useEffect, useRef } from "react";

/**
 * Animated film grain.
 *
 * Positioned ABSOLUTE, not fixed — it covers whichever element it is dropped
 * into rather than the whole viewport, so the texture can be scoped to one
 * moment instead of sitting over the entire page. The parent needs position
 * relative.
 *
 * PERFORMANCE. Randomising every pixel of a 1920x1080 overlay is ~2 million
 * writes per frame and will cook a laptop fan. Two things keep this cheap:
 *
 *   1. The canvas is rendered at a fixed small size and stretched by CSS, so
 *      only ~50k pixels are generated per frame regardless of viewport. The
 *      upscale is what gives it a coarse, filmic clump instead of fine static.
 *   2. It regenerates at ~24fps, not at display refresh. Real film grain is
 *      sampled per frame of film, not per frame of monitor — at 120Hz it just
 *      looks like noise, and costs five times as much.
 *
 * Alpha is the only channel written. The RGB bytes stay at their initialised
 * value, so each pixel is a black dot of varying transparency, which is what
 * grain actually is over a dark ground.
 */

const TILE_W = 300;
const TILE_H = 170;
const FPS = 24;

export function Grain({
  opacity = 0.16,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = TILE_W;
    canvas.height = TILE_H;

    const image = ctx.createImageData(TILE_W, TILE_H);
    const buf = image.data;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      // Only the alpha byte of each RGBA quad is touched.
      for (let i = 3; i < buf.length; i += 4) {
        buf[i] = Math.random() * 255;
      }
      ctx.putImageData(image, 0, 0);
    };

    draw();

    // A still frame is still grain — it just does not move. Cheaper than
    // removing it, and keeps the texture consistent with the animated version.
    if (still) return;

    let frame = 0;
    let last = 0;
    const interval = 1000 / FPS;

    const loop = (now: number) => {
      if (now - last >= interval) {
        last = now;
        draw();
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    />
  );
}
