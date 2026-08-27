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
 *
 * Pinned to the top-left of the viewport as its own fixed element rather than
 * living inside the nav pill. Inside the pill it had to stay small enough not to
 * crowd the links; out here it can run at display size, and the links get the
 * pill to themselves.
 *
 * Vertically centred on the same 10px/51px axis as the nav so the two line up.
 */
function NavMark() {
  return (
    <a
      href="#top"
      className="fixed left-4 top-[10px] z-10 flex h-[51px] items-center font-[family-name:var(--font-display)] text-[30px] leading-none tracking-[0.01em] text-lf-ui transition-opacity duration-200 hover:opacity-70 sm:left-7 sm:text-[40px]"
    >
      {TICKER}
    </a>
  );
}

/**
 * Airdrop CTA, top-right — the counterweight to the logo on the left.
 *
 * Filled rather than outlined: it is the only action in the hero, and against
 * white type on a black sky an outline would read as just more nav. Inverting it
 * (black text on white) makes it the brightest element on the page, which is
 * what a single CTA should be.
 *
 * Set in Luckiest Guy to match the logo, which works here where it did not for
 * the nav links: it is two words at button size, not a row of items to scan.
 */
function AirdropButton() {
  return (
    <a
      href="#airdrop"
      className="fixed right-4 top-[10px] z-10 flex h-[51px] items-center sm:right-7"
    >
      <span className="rounded-full bg-lf-ui px-5 py-2 font-[family-name:var(--font-display)] text-[16px] leading-none tracking-[0.01em] text-lf-ink shadow-[0_6px_24px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:scale-[1.04] sm:px-6 sm:py-2.5 sm:text-[20px]">
        Airdrop
      </span>
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
      <NavMark />
      <AirdropButton />

      {/* The pill now holds only the links and hugs them, rather than being a
          fixed 717px bar with the logo pinned to one end. A wide bar with three
          items floating in the middle reads as empty; sized to its content it
          reads as a deliberate capsule. */}
      <nav
        className={cn(
          // Below sm the logo and the pill cannot share a row: at 390 the logo
          // runs to x118 and a 328px pill starts at x31, an 87px collision.
          // Their combined width simply exceeds the viewport, so the pill drops
          // to a second row there and rejoins the logo's row from sm up.
          "fixed left-1/2 top-[68px] z-10 flex h-[51px] max-w-[calc(100%-32px)] -translate-x-1/2 items-center justify-center gap-6 rounded-full px-6 sm:top-[10px] sm:gap-9 sm:px-8",
          "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "border border-white/10 bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.38)] backdrop-blur-md"
            : "border border-transparent bg-transparent shadow-none backdrop-blur-none",
        )}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-[15px] font-bold uppercase leading-none tracking-[0.02em] text-lf-ui transition-opacity duration-200 hover:opacity-60 sm:text-[17px]"
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
