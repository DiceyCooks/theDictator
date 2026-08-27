"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Measured from the target: 3174px of travel over 90685.71ms. */
const SPEED_PX_PER_SEC = 3174 / (90685.71 / 1000);

type MarqueeProps = {
  children: React.ReactNode;
  /** Target alternates direction on adjacent rows. */
  direction?: "left" | "right";
  className?: string;
  /** Row height — the target alternates 190px / 186px. */
  height?: number;
};

/**
 * Seamless marquee.
 *
 * The track repeats the run enough times to cover the container plus one spare,
 * then shifts by exactly one run width. When the shift completes, copy N+1 sits
 * precisely where copy N started, so the loop is invisible.
 *
 * Two copies shifted by -50% is the usual shorthand for this, and it is wrong
 * as soon as the container is wider than a single run: the exposed width is only
 * (track - run), which leaves the far end of the row empty. The target renders
 * four copies for the same reason.
 *
 * Duration is derived from the measured run width rather than hardcoded, which
 * holds the target's 35.0 px/s at any content width — so rows with different
 * content get different durations but identical speed.
 *
 * The target animates a <ul>, so that element is mirrored here.
 */
export function Marquee({
  children,
  direction = "left",
  className,
  height,
}: MarqueeProps) {
  const containerRef = useRef<HTMLElement>(null);
  const runRef = useRef<HTMLLIElement>(null);
  const [runWidth, setRunWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const run = runRef.current;
    const container = containerRef.current;
    if (!run || !container) return;

    const measure = () => {
      const width = run.getBoundingClientRect().width;
      if (width <= 0) return;
      setRunWidth(width);
      // Cover the container, then one spare run for the shift to consume.
      setCopies(Math.max(2, Math.ceil(container.getBoundingClientRect().width / width) + 1));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(run);
    observer.observe(container);
    return () => observer.disconnect();
  }, [children]);

  const ready = runWidth > 0;

  return (
    <section
      ref={containerRef}
      className={cn("flex items-center overflow-hidden p-[10px]", className)}
      style={height ? { height } : undefined}
      aria-hidden="true"
    >
      <ul
        className="flex w-max shrink-0 list-none"
        style={
          ready
            ? ({
                "--lf-run": `${runWidth}px`,
                animationName:
                  direction === "left" ? "lf-marquee-ltr" : "lf-marquee-rtl",
                animationDuration: `${runWidth / SPEED_PX_PER_SEC}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                willChange: "transform",
              } as React.CSSProperties)
            : undefined
        }
      >
        {Array.from({ length: copies }, (_, i) => (
          <li
            key={i}
            ref={i === 0 ? runRef : undefined}
            className="flex shrink-0 items-center"
          >
            {children}
          </li>
        ))}
      </ul>
    </section>
  );
}
