"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll, driven by GSAP's ticker and feeding ScrollTrigger.
 *
 * Worth being clear about what each half does, because it is easy to expect too
 * much of the first: Lenis only changes how scrolling FEELS — weight, easing,
 * momentum. It animates nothing on its own. Everything scroll-driven on the page
 * is GSAP ScrollTrigger.
 *
 * The two have to be introduced to each other or they fight:
 *
 *   lenis.on("scroll", ScrollTrigger.update)
 *       Lenis moves the page without the browser firing a scroll event, so
 *       ScrollTrigger would never recalculate. This is the missing link — and
 *       the same reason a plain window scroll listener never fires here.
 *
 *   gsap.ticker.add(...) instead of a private requestAnimationFrame loop
 *       One clock for both. Two independent rAF loops drift apart and produce
 *       jitter on scrub-linked animations.
 *
 *   gsap.ticker.lagSmoothing(0)
 *       GSAP normally hides frame drops by fudging elapsed time. That desyncs
 *       Lenis from the real scroll position, so it is turned off.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // Lenis defaults this to false, which leaves in-page anchor links on
      // native jump-scroll — instant, and invisible to Lenis, so ScrollTrigger
      // never updates while it happens and scroll-driven work arrives already
      // finished. With it on, the nav links ease through Lenis like everything
      // else and the animations play on the way.
      anchors: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Positions are measured on mount, before fonts and images have settled.
    // Without this the triggers sit at stale offsets down the page.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
