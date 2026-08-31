"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progress of an element through the viewport, 0 to 1.
 *
 * 0 when the element's top edge reaches the bottom of the viewport, 1 when its
 * bottom edge reaches the top. Use it to drive anything scroll-linked.
 *
 * Read on requestAnimationFrame, NOT from a scroll listener. Lenis drives the
 * scroll position directly, so `window` never dispatches a scroll event on this
 * page — verified: scrollY moves 0 -> 600 while a freshly attached scroll
 * listener fires exactly zero times. Anything built on the scroll event here
 * silently never runs.
 *
 * The rAF loop only sets state when the value actually changes by a visible
 * amount, so it does not re-render every frame while the page is still.
 */
export function useScrollProgress<T extends HTMLElement>(
  mode: "through" | "pinned" = "through",
) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let last = -1;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // "pinned": the element is a tall track holding a sticky child. Progress
      // runs 0 -> 1 across exactly the track's overflow, so it always reaches
      // both ends regardless of where the track sits in the page.
      //
      // "through": progress across the element's whole pass by the viewport.
      // Only reaches 1 if there is enough page below it to keep scrolling —
      // which is why a short element near the page bottom never completes.
      let raw: number;
      if (mode === "pinned") {
        const travel = rect.height - vh;
        raw = travel > 0 ? -rect.top / travel : 0;
      } else {
        const span = rect.height + vh;
        raw = span > 0 ? (vh - rect.top) / span : 0;
      }
      const next = Math.min(1, Math.max(0, raw));

      // ~0.2% steps: fine enough to look continuous, coarse enough to skip
      // re-rendering on sub-pixel drift.
      if (Math.abs(next - last) > 0.002) {
        last = next;
        setProgress(next);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mode]);

  return { ref, progress };
}
