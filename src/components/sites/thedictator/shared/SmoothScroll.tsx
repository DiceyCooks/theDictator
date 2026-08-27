"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll.
 *
 * The target runs Lenis page-wide (`<html class="lenis">`). Native scrolling has a
 * noticeably different weight and easing, so this is load-bearing for the clone
 * feeling right rather than a nicety.
 *
 * Lenis adds its own classes to <html>, which is why the root element is left
 * unstyled for scroll here.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis();
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
