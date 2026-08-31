"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/sites/thedictator/shared/Reveal";
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
 * Beats: the spotlight finds the headline and then him, the record, then the
 * turn where the original pfp becomes the dictator.
 *
 * ALL COPY AND FIGURES ARE PLACEHOLDERS. Nothing states a real trade or result;
 * every slot is bracketed so it is obvious what still needs writing.
 */

const FEATS = [
  { label: "[ Metric ]", value: "[ — ]", note: "[ one line of context ]" },
  { label: "[ Metric ]", value: "[ — ]", note: "[ one line of context ]" },
  { label: "[ Metric ]", value: "[ — ]", note: "[ one line of context ]" },
] as const;

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
      className="flex h-screen w-full flex-col items-center justify-center gap-8"
    >
      <div className="relative aspect-square w-full max-w-[min(420px,58vh)]">
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
    <section
      id="about"
      className="lf-about-ground relative w-full scroll-mt-[72px]"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-28 px-6 pb-32 pt-32 sm:gap-36 sm:pt-48">
        <SpotlightScene>
          <SpotlightPortrait />
        </SpotlightScene>

        {/* The record */}
        <div className="w-full">
          <Reveal>
            <p className="mb-8 text-center font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              The record
            </p>
          </Reveal>

          <Reveal stagger={0.12} className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {FEATS.map((feat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-7 text-center backdrop-blur-sm"
              >
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                  {feat.label}
                </p>
                <p className="my-2 font-[family-name:var(--font-display)] text-[34px] leading-none tracking-[0.01em] text-lf-type [font-variant-numeric:tabular-nums]">
                  {feat.value}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] leading-snug text-white/50">
                  {feat.note}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="w-full">
          <h3 className="text-center font-[family-name:var(--font-inter)] text-[clamp(1.75rem,5vw,3.25rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-lf-type">
            Then he became
            <span className="ml-[0.16em] font-[family-name:var(--font-display)] font-normal tracking-[0.01em]">
              the dictator
            </span>
          </h3>
        </Reveal>
      </div>

      {/* Outside the padded column: pinning needs the trigger to own its own
          full-height block, and overflow-hidden on an ancestor would break the
          pin, which is why the section no longer clips. */}
      <Transformation />

      <div className="h-32" />
    </section>
  );
}
