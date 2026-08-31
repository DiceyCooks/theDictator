"use client";

import Image from "next/image";
import { useScrollProgress } from "@/components/sites/thedictator/shared/useScrollProgress";

/**
 * About — "Who is CRASH?"
 *
 * Opens on --lf-ink so it meets the hero's ground with no seam, then pivots
 * into navy. The hero's ground shape is filled with the colour of whatever sits
 * below it, so this section's first 8% MUST stay --lf-ink or the join reappears.
 *
 * Three beats:
 *   1. the question, set large
 *   2. who he is — original pfp beside a blurb, then the record
 *   3. the turn — the original pfp becomes the dictator, scroll-linked
 *
 * COPY AND FIGURES BELOW ARE PLACEHOLDERS. Nothing here states a real trade or
 * result; every slot is bracketed so it is obvious what still needs writing.
 */

/** Swap for the real record. Left bracketed so nothing reads as a real claim. */
const FEATS = [
  { label: "[ Metric ]", value: "[ — ]", note: "[ one line of context ]" },
  { label: "[ Metric ]", value: "[ — ]", note: "[ one line of context ]" },
  { label: "[ Metric ]", value: "[ — ]", note: "[ one line of context ]" },
] as const;

/**
 * The turn. Two portraits crossfaded on scroll: the original on the way in, the
 * dictator on the way out, with a short overlap where both are present.
 */
function Transformation() {
  // A tall track with a sticky child, read in "pinned" mode. Progress then runs
  // a clean 0 -> 1 across the track's overflow no matter where it sits in the
  // page. An earlier version measured the element's pass by the viewport
  // instead, which never completed: it is a short element low in the section,
  // so there was not enough page beneath it left to scroll.
  const { ref, progress } = useScrollProgress<HTMLDivElement>("pinned");

  // Hold at each end, change through the middle.
  const t = Math.min(1, Math.max(0, (progress - 0.2) / 0.55));
  const ease = t * t * (3 - 2 * t);

  return (
    <div ref={ref} className="relative h-[240vh] w-full">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8">
        <div
          className="relative aspect-square w-full max-w-[min(420px,62vh)]"
          data-transform-stack
        >
          {/* Before — the original pfp. Drop the file in and this becomes an
              <Image> matching the dictator frame below. */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/[0.03] p-6 text-center"
            style={{ opacity: 1 - ease }}
          >
            <span className="font-[family-name:var(--font-inter)] text-[13px] uppercase leading-relaxed tracking-[0.08em] text-white/55">
              Original pfp
              <span className="mt-2 block text-[11px] normal-case tracking-normal text-white/35">
                drop the file in and I&apos;ll wire it
              </span>
            </span>
          </div>

          {/* After — the dictator */}
          <div
            className="absolute inset-0"
            style={{ opacity: ease, transform: `scale(${0.94 + ease * 0.06})` }}
          >
            <Image
              src="/sites/thedictator/images/hero-figure-v2.png"
              alt="THE DICTATOR"
              fill
              sizes="(max-width: 810px) 80vw, 420px"
              className="object-contain"
            />
          </div>
        </div>

        <p className="max-w-[46ch] px-6 text-center font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-white/60">
          [ Placeholder — a few lines on the dictator meme: where it came from,
          why it stuck, and what it has to do with $CRASH. ]
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      // scroll-mt clears the fixed nav when the #about anchor is jumped to,
      // otherwise the heading lands underneath it.
      className="lf-about-ground relative w-full scroll-mt-[72px] overflow-hidden"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-24 px-6 pb-40 pt-32 sm:gap-32 sm:pt-48">
        <h2 className="text-center font-[family-name:var(--font-inter)] text-[clamp(2.75rem,9vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-lf-type">
          Who is
          <span className="ml-[0.18em] font-[family-name:var(--font-display)] font-normal tracking-[0.01em]">
            $CRASH
          </span>
          ?
        </h2>

        <div className="grid w-full items-center gap-12 sm:grid-cols-[minmax(0,320px)_1fr] sm:gap-16">
          {/* Original pfp again, at intro size */}
          <div className="mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/[0.03] p-6 text-center">
            <span className="font-[family-name:var(--font-inter)] text-[13px] uppercase tracking-[0.08em] text-white/55">
              Original pfp
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-[family-name:var(--font-inter)] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-white/80">
              [ Placeholder — two or three sentences introducing CRASH. Who he
              is, where he came from, why anyone follows him. ]
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-white/55">
              [ Placeholder — a second, shorter beat. Tone-setting rather than
              detail. ]
            </p>
          </div>
        </div>

        {/* The record */}
        <div className="w-full">
          <p className="mb-8 text-center font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            The record
          </p>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
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
          </div>
        </div>

        {/* The turn */}
        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-center font-[family-name:var(--font-inter)] text-[clamp(1.75rem,5vw,3.25rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-lf-type">
            Then he became
            <span className="ml-[0.16em] font-[family-name:var(--font-display)] font-normal tracking-[0.01em]">
              the dictator
            </span>
          </h3>
          <Transformation />
        </div>
      </div>
    </section>
  );
}
