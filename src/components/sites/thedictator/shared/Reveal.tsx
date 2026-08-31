"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds of delay before this one starts. */
  delay?: number;
  /** Distance travelled on the way in, px. */
  y?: number;
  /** Stagger direct children instead of moving the wrapper as one block. */
  stagger?: number;
};

/**
 * Scroll-triggered entrance. Fires once when the element comes into view.
 *
 * Deliberately NOT scrubbed: an entrance tied to scroll position runs backwards
 * when you scroll up, which reads as a glitch. Scrubbing belongs on things that
 * are genuinely a function of position — the spotlight, the transformation —
 * not on something that simply arrives.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const targets = stagger
        ? Array.from(ref.current?.children ?? [])
        : ref.current;
      if (!targets) return;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }, ref);

    // context.revert() removes the tweens AND kills the ScrollTriggers they
    // created. Without it, StrictMode's double-mount leaves orphaned triggers
    // holding stale element references.
    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
