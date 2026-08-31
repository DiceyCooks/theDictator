"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The regime, as an image accordion: one panel open, the rest collapsed to
 * slivers, and the open one follows hover, focus or tap.
 *
 * Built on <button> rather than divs with onMouseEnter. That is what makes it
 * work by keyboard and on touch — hover alone leaves the whole gallery dead on a
 * phone, which is where most of a memecoin's traffic lands.
 *
 * Collapsed panels label themselves vertically instead of hiding the name, so a
 * sliver still tells you what it is. The alternative — no label until you open
 * it — turns browsing into guesswork.
 *
 * Orientation flips with the viewport. Six horizontal panels on a 390px screen
 * would be ~65px each, which is unreadable, so below sm it becomes a vertical
 * stack where the open panel grows in height instead of width.
 */

export type RegimeMember = {
  /** Absent renders an empty slot rather than a broken image. */
  src?: string;
  name: string;
};

export function RegimeAccordion({ members }: { members: RegimeMember[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full flex-col gap-2 sm:h-[420px] sm:flex-row sm:gap-3">
      {members.map((m, i) => {
        const open = i === active;
        return (
          <button
            key={`${m.name}-${i}`}
            type="button"
            aria-expanded={open}
            aria-label={m.name}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/10 outline-none transition-[flex-grow,height] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
              "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              // Mobile: height opens. Desktop: width opens.
              open ? "h-[260px] sm:h-auto" : "h-[68px] sm:h-auto",
              "sm:min-w-0 sm:flex-1",
              open ? "sm:grow-[4]" : "sm:grow-[1]",
            )}
          >
            {m.src ? (
              <Image
                src={m.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className={cn(
                  "object-cover transition-[filter,transform] duration-500",
                  open
                    ? "scale-100 brightness-100"
                    : "scale-[1.08] brightness-[0.55]",
                )}
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center border-dashed bg-white/[0.03] text-[10px] uppercase tracking-[0.14em] text-white/25">
                {open ? "Character slot" : ""}
              </span>
            )}

            {/* Scrim only under the open label, so collapsed panels stay clean */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent transition-opacity duration-500",
                open ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Open label */}
            <span
              className={cn(
                "pointer-events-none absolute bottom-4 left-4 right-4 text-left font-[family-name:var(--font-display)] text-[20px] leading-none tracking-[0.01em] text-lf-ui transition-opacity duration-300",
                open ? "opacity-100 delay-150" : "opacity-0",
              )}
            >
              {m.name}
            </span>

            {/* Collapsed label — vertical on desktop, inline on mobile */}
            <span
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center justify-center font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.14em] text-white/55 transition-opacity duration-300 sm:[writing-mode:vertical-rl]",
                open ? "opacity-0" : "opacity-100",
              )}
            >
              {m.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
