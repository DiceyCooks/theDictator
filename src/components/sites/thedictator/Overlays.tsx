"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The three fixed overlays that sit above the scrolling page.
 *
 * These must stay siblings of the scroll content — nesting them inside a section
 * would put them under a transformed ancestor and break position: fixed.
 *
 * Measured on the target:
 *   grain   full viewport, inset 0, z-index 10, pointer-events: none
 *   nav     717x51, top 10px, horizontally centred, z-index 10
 *   bottom  full width x 64px, pinned to the bottom, z-index 9
 *
 * The nav does not scroll its labels. The target runs them as a marquee; that
 * was reproduced and then deliberately dropped — a nav that moves is hard to
 * read and hard to click.
 *
 * Labels are this project's own (About / Tokenomics / Socials), not the
 * target's two-line phrases, and the logotype placeholder is now the $CRASH
 * ticker set in Luckiest Guy.
 *
 * Type here is --lf-ui, which is white. These overlays travel over the black sky
 * AND the black blocks below it, so the colour has to read on both.
 */

/** Scroll distance before the glass bar materialises, in px. */
const GLASS_THRESHOLD = 80;

/** Ticker, set as the logo. */
const TICKER = "$CRASH";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Socials", href: "#socials" },
] as const;

/**
 * Ticker logo. Luckiest Guy, loaded in the root layout as --font-display.
 * Slight positive tracking because the face sets tight at small sizes.
 */
function NavMark() {
  return (
    <a
      href="#top"
      className="shrink-0 font-[family-name:var(--font-display)] text-[22px] leading-none tracking-[0.01em] text-lf-ui transition-opacity duration-200 hover:opacity-70 sm:text-[26px]"
    >
      {TICKER}
    </a>
  );
}

export function Overlays() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  /**
   * Detected with an IntersectionObserver on a sentinel, NOT a scroll listener.
   *
   * Lenis drives the scroll position directly rather than through user scrolling,
   * so `window` never dispatches a scroll event on this page — verified: scrollY
   * moves 0 -> 600 and documentElement.scrollTop reads 600 while a freshly
   * attached scroll listener fires exactly zero times. Anything built on the
   * scroll event silently never runs.
   *
   * The sentinel is GLASS_THRESHOLD tall at the document origin; once it leaves
   * the viewport we are past the threshold. This works regardless of how
   * scrolling is implemented.
   */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel for the glass-bar trigger. Absolutely positioned at the
          document origin, so it scrolls away with the page. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-px"
        style={{ height: GLASS_THRESHOLD }}
      />

      {/* Grain — purely decorative, never intercepts pointer events */}
      <div
        aria-hidden="true"
        className="lf-grain pointer-events-none fixed inset-0 z-10 opacity-[0.15] mix-blend-overlay"
      />

      {/* Top nav.
          At the top of the page the labels float free with no container. Past
          the threshold a glass bar fades in behind them, which gives the nav
          something to sit on once it is over busy content rather than sky. */}
      <nav
        className={cn(
          "fixed left-1/2 top-[10px] z-10 flex h-[51px] w-[717px] max-w-[calc(100%-24px)] -translate-x-1/2 items-center justify-between gap-4 rounded-full px-5 sm:gap-8",
          "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "border border-white/10 bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.38)] backdrop-blur-md"
            : "border border-transparent bg-transparent shadow-none backdrop-blur-none",
        )}
      >
        <NavMark />

        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-[13px] font-semibold uppercase leading-[1.15] tracking-[-0.025em] text-lf-ui transition-opacity duration-200 hover:opacity-60 sm:text-[14px]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Bottom info bar. The target carries a short prose blurb here; that copy
          is the site owner's, so this is a placeholder with the same structure. */}
      <div className="fixed inset-x-0 bottom-0 z-[9] flex h-16 items-center gap-4 px-4 sm:px-6">
        <span className="shrink-0 font-[family-name:var(--font-inter)] text-[14px] font-semibold uppercase leading-[1.15] tracking-[-0.025em] text-lf-ui">
          Heading
        </span>
        <p className="truncate font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.15] tracking-[-0.025em] text-[color-mix(in_oklch,var(--lf-ui)_70%,transparent)]">
          Placeholder for the one-line description that runs along the bottom.
        </p>
      </div>
    </>
  );
}
