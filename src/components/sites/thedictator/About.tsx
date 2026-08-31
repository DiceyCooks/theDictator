"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "@/components/sites/thedictator/shared/Particles";
import {
  SpotlightPortrait,
  SpotlightScene,
} from "@/components/sites/thedictator/SpotlightScene";

/**
 * About — "Who is $CRASH?"
 *
 * Opens on --lf-ink so it meets the hero's ground with no seam, then pivots into
 * navy. The hero's ground shape is filled with the colour of whatever sits below
 * it, so this section's first 8% MUST stay --lf-ink or the join reappears.
 *
 * Beats: the spotlight finds the headline and then him, then the turn where the
 * original pfp becomes the dictator.
 *
 * ALL COPY AND FIGURES ARE PLACEHOLDERS. Nothing states a real trade or result;
 * every slot is bracketed so it is obvious what still needs writing.
 */

/**
 * The turn. Two identically-framed portraits crossfaded on scroll.
 *
 * Pinned and scrubbed through GSAP rather than a hand-rolled rAF loop. Lenis
 * drives GSAP's ticker, so ScrollTrigger and the scroll position share one
 * clock; a private rAF loop alongside it drifts and makes scrubbed values
 * jitter. Pinning also gives the moment dedicated travel, so it holds in view
 * while it changes instead of flashing past.
 */
function Transformation() {
  const wrap = useRef<HTMLDivElement>(null);
  const before = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(after.current, { opacity: 0, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "+=140%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Hold, change, hold — the pauses either side are what make it read as a
      // deliberate beat rather than a crossfade that happens to be on scroll.
      tl.to({}, { duration: 0.35 })
        .to(before.current, { opacity: 0, duration: 1 }, ">")
        .to(after.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .to({}, { duration: 0.35 });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrap}
      // Height excludes the fixed 64px info bar so centred content lands in the
      // space actually free. Padding-bottom does not work here: justify-center
      // centres within the PADDED box, so pb only lifts content by half its
      // value and the caption still ran under the bar.
      // svh, not vh, so mobile browser chrome does not push it off-screen.
      className="relative z-[1] flex h-[calc(100svh-64px)] w-full flex-col items-center justify-center gap-6 px-6"
    >
      <h3 className="text-center font-[family-name:var(--font-inter)] text-[clamp(1.5rem,4.2vw,2.75rem)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-lf-type">
        Then he became
        <span className="ml-[0.16em] font-[family-name:var(--font-display)] font-normal tracking-[0.01em]">
          the dictator
        </span>
      </h3>

      {/* Sized against viewport height, not just width: the heading and caption
          share this pinned screen, so the panel has to give them room. */}
      <div className="relative aspect-square w-full max-w-[min(380px,44vh)]">
        <div
          ref={before}
          className="absolute inset-0 overflow-hidden rounded-2xl"
        >
          <Image
            src="/sites/thedictator/images/crash-pfp.jpg"
            alt="$CRASH, before"
            fill
            sizes="(max-width: 810px) 80vw, 420px"
            className="object-cover"
          />
        </div>

        <div
          ref={after}
          className="absolute inset-0 overflow-hidden rounded-2xl"
        >
          <Image
            src="/sites/thedictator/images/dictator-portrait.png"
            alt="THE DICTATOR"
            fill
            sizes="(max-width: 810px) 80vw, 420px"
            className="object-cover"
          />
        </div>
      </div>

      <p className="max-w-[46ch] px-6 text-center font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-white/60">
        [ Placeholder — a few lines on the dictator meme: where it came from, why
        it stuck, and what it has to do with $CRASH. ]
      </p>
    </div>
  );
}

export function About() {
  return (
    <section className="lf-about-ground relative w-full">
      {/* Particle field. The inner layer is STICKY and one viewport tall, not
          stretched over the whole section: with the pinned turn this section runs
          to several thousand pixels, and a canvas that size would allocate a
          backing store of tens of megabytes for no visible gain. Sticky keeps it
          viewport-sized while still reading as continuous on the way down. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="sticky top-0 h-screen w-full">
          <Particles density={80} max={220} />
        </div>
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[1100px] flex-col items-center gap-28 px-6 pb-32 pt-32 sm:gap-36 sm:pt-48">
        <SpotlightScene>
          <SpotlightPortrait />
        </SpotlightScene>
      </div>

      {/* Outside the padded column: pinning needs the trigger to own its own
          full-height block, and overflow-hidden on an ancestor would break the
          pin, which is why the section no longer clips. */}
      <Transformation />

      <div className="h-32" />
    </section>
  );
}
