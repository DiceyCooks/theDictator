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
 * The run is rendered twice inside a flex track, so shifting the track by exactly
 * -50% lands the second run precisely where the first began — that is what makes
 * the loop seamless. Duration is derived from the measured run width rather than
 * hardcoded, which holds the target's 35.0 px/s constant at any content width.
 *
 * The target animates a <ul>, so that element is mirrored here.
 */
export function Marquee({
  children,
  direction = "left",
  className,
  height,
}: MarqueeProps) {
  const runRef = useRef<HTMLLIElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const run = runRef.current;
    if (!run) return;

    const measure = () => {
      const width = run.getBoundingClientRect().width;
      if (width > 0) setDuration(width / SPEED_PX_PER_SEC);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(run);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn("flex items-center overflow-hidden p-[10px]", className)}
      style={height ? { height } : undefined}
      aria-hidden="true"
    >
      <ul
        className="flex w-max shrink-0 list-none"
        style={
          duration
            ? {
                animationName:
                  direction === "left" ? "lf-marquee-ltr" : "lf-marquee-rtl",
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                willChange: "transform",
              }
            : undefined
        }
      >
        <li ref={runRef} className="flex shrink-0 items-center">
          {children}
        </li>
        <li className="flex shrink-0 items-center">{children}</li>
      </ul>
    </section>
  );
}
