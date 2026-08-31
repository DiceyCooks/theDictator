"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Grain } from "@/components/sites/thedictator/shared/Grain";

/**
 * The spotlight beat: a light sweeps the headline letter by letter, then leaves
 * the type and settles on him.
 *
 * Scrubbed, not fired-and-forgotten. This one IS a function of scroll position —
 * dragging back up should walk the light backwards across the letters — which is
 * exactly where scrub is right and where it would be wrong for an entrance.
 *
 * Two things carry the effect:
 *   the glow    an oversized radial that GSAP moves in x/y, blend-mode screen
 *               so it lifts whatever sits beneath it
 *   the letters dim at rest, brightened in sequence as the glow reaches them
 *
 * The glow alone reads as a floating blob; the letters alone read as a plain
 * stagger. Together they read as a light finding things in the dark.
 */

const HEADLINE = "WHO IS $CRASH?";

/** Keep these two in step — the label must match where the link actually goes. */
const TWITTER_HANDLE = "@CrashiusClay69";
const TWITTER_URL = "https://x.com/CrashiusClay69";

export function SpotlightScene({ children }: { children: React.ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const letters = headline.current?.querySelectorAll("[data-letter]");
      if (!letters?.length || !glow.current || !portrait.current) return;

      gsap.set(letters, { opacity: 0.16 });
      gsap.set(glow.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene.current,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // 1 — the light arrives
      tl.to(glow.current, { opacity: 1, duration: 0.6 }, 0);

      // 2 — it crosses the headline; letters light as it passes.
      // Positions come from measured offsets so the glow tracks the actual
      // glyphs rather than an assumed even spread — the "$CRASH" run is set in
      // a different face and is materially wider per character.
      const sceneRect = scene.current!.getBoundingClientRect();

      letters.forEach((letter, i) => {
        const r = (letter as HTMLElement).getBoundingClientRect();
        const x = r.left + r.width / 2 - sceneRect.left;
        const y = r.top + r.height / 2 - sceneRect.top;
        const at = 0.6 + (i / letters.length) * 3.4;

        tl.to(glow.current, { x, y, duration: 0.34, ease: "none" }, at);
        tl.to(letter, { opacity: 1, duration: 0.3, ease: "power2.out" }, at);
      });

      // 3 — it leaves the type and settles on HIM, tightening as it lands.
      //
      // Target the portrait itself, not the wrapper. The wrapper spans the whole
      // two-column row, so its centre sits in the gap between the image and the
      // copy — aiming there put the light on the text.
      const target =
        scene.current!.querySelector<HTMLElement>("[data-spotlight-target]") ??
        portrait.current;
      const pRect = target.getBoundingClientRect();
      const px = pRect.left + pRect.width / 2 - sceneRect.left;
      const py = pRect.top + pRect.height / 2 - sceneRect.top;

      tl.to(
        glow.current,
        { x: px, y: py, scale: 0.58, duration: 1.4, ease: "power2.inOut" },
        4.2,
      );
      tl.from(
        portrait.current,
        { scale: 0.94, opacity: 0.55, duration: 1.2, ease: "power2.out" },
        4.4,
      );
      // The headline dims back down so he is the only lit thing at the end.
      tl.to(letters, { opacity: 0.42, duration: 1, stagger: 0.01 }, 4.4);
    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scene} className="relative w-full">
      {/* The light. pointer-events-none so it never eats clicks; screen blend so
          it lifts what is underneath instead of washing over it. */}
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.13) 32%, rgba(255,255,255,0.04) 56%, transparent 72%)",
        }}
      />

      <h2
        ref={headline}
        className="relative z-[2] text-center font-[family-name:var(--font-inter)] text-[clamp(2.75rem,9vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-lf-type"
      >
        {HEADLINE.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i} className="inline-block w-[0.24em]" />
          ) : (
            <span
              key={i}
              data-letter
              className={
                i >= HEADLINE.indexOf("$")
                  ? "inline-block font-[family-name:var(--font-display)] font-normal tracking-[0.01em]"
                  : "inline-block"
              }
            >
              {ch}
            </span>
          ),
        )}
      </h2>

      <div ref={portrait} className="relative z-[2] mt-20 w-full sm:mt-24">
        {children}
      </div>

      {/* Grain, scoped to this scene only — above the content so it textures the
          type and the portrait rather than sitting under them. It reinforces the
          spotlight: a beam of light is where you notice grain, so keeping it
          here and nowhere else makes it read as part of the effect instead of a
          filter over the whole page. */}
      <Grain opacity={0.14} className="z-[3] mix-blend-overlay" />
    </div>
  );
}

/** The portrait the light lands on. */
export function SpotlightPortrait() {
  return (
    <div className="grid w-full items-center gap-12 sm:grid-cols-[minmax(0,320px)_1fr] sm:gap-16">
      <div className="mx-auto flex w-full max-w-[320px] flex-col items-center gap-4">
        {/* data-spotlight-target is what the light aims at — the image itself,
            not the row around it. */}
        <div
          data-spotlight-target
          className="relative aspect-square w-full overflow-hidden rounded-2xl"
        >
          <Image
            src="/sites/thedictator/images/crash-pfp.jpg"
            alt="$CRASH"
            fill
            sizes="(max-width: 810px) 80vw, 320px"
            className="object-cover"
          />
        </div>

        <a
          href={TWITTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-display)] text-[20px] leading-none tracking-[0.01em] text-lf-ui transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {TWITTER_HANDLE}
        </a>
      </div>

      <div className="flex flex-col gap-5">
        <p className="font-[family-name:var(--font-inter)] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-white/80">
          [ Placeholder — two or three sentences introducing CRASH. Who he is,
          where he came from, why anyone follows him. ]
        </p>
        <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-white/55">
          [ Placeholder — a second, shorter beat. Tone-setting rather than
          detail. ]
        </p>
      </div>
    </div>
  );
}
