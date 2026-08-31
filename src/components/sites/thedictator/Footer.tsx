"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Footer — the character lineup, the FAQ, and the functional bits.
 *
 * ALL COPY IS PLACEHOLDER. Questions, answers, socials, contract and the
 * disclaimer all need real content before this ships.
 *
 * The FAQ is built on native <details>/<summary>. That gets keyboard support,
 * screen-reader semantics and open/close behaviour for free, and it still works
 * if JS fails — an accordion rebuilt from divs and onClick gets none of that.
 */

/** Everything the lineup renders. Add entries as more characters arrive. */
const CAST = [
  { src: "/sites/thedictator/images/dictator-portrait.png", name: "The Dictator" },
  { src: "/sites/thedictator/images/crash-pfp.jpg", name: "$CRASH" },
] as const;

/** Empty frames so the lineup reads as a set with room to grow. */
const CAST_PLACEHOLDERS = 4;

/** Swap for the real questions. */
const FAQ = Array.from({ length: 5 }, (_, i) => ({
  q: `[ Question ${i + 1} ]`,
  a: "[ Placeholder answer. Replace with the real one — a couple of sentences is usually enough. ]",
}));

const SOCIALS = [
  { label: "X", href: "https://x.com/CrashiusClay69" },
  { label: "Telegram", href: "#" },
  { label: "Discord", href: "#" },
  { label: "DexScreener", href: "#" },
] as const;

/** Placeholder — swap for the deployed address. */
const CONTRACT = "[ contract address ]";

function ContractBar() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard is blocked in some contexts; leave the address on screen to
      // select manually rather than failing silently.
      setCopied(false);
    }
  };

  return (
    <div className="flex w-full max-w-[640px] items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] py-2 pl-5 pr-2 backdrop-blur-sm">
      <code className="min-w-0 flex-1 truncate font-[family-name:var(--font-inter)] text-[13px] tracking-tight text-white/70">
        {CONTRACT}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full bg-lf-ui px-4 py-2 font-[family-name:var(--font-display)] text-[13px] leading-none tracking-[0.01em] text-lf-ink transition-transform duration-200 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="socials"
      className="lf-footer-ground relative w-full scroll-mt-[72px] overflow-hidden"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-20 px-6 pb-16 pt-32 sm:gap-24">
        {/* The lineup */}
        <div className="flex w-full flex-col items-center gap-10">
          <h2 className="text-center font-[family-name:var(--font-inter)] text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[0.88] tracking-[-0.045em] text-lf-type">
            The regime
          </h2>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
            {CAST.map((member) => (
              <figure key={member.name} className="group flex flex-col gap-2">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 170px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="text-center font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
                  {member.name}
                </figcaption>
              </figure>
            ))}

            {Array.from({ length: CAST_PLACEHOLDERS }, (_, i) => (
              <figure key={`slot-${i}`} className="flex flex-col gap-2">
                <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03]">
                  <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.12em] text-white/30">
                    Character
                  </span>
                </div>
                <figcaption className="text-center font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.12em] text-white/25">
                  [ name ]
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex w-full max-w-[760px] flex-col gap-3">
          <h3 className="mb-3 text-center font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            Questions
          </h3>

          {FAQ.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] px-5 open:bg-white/[0.06]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-[family-name:var(--font-inter)] text-[15px] font-semibold text-white/85 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[20px] leading-none text-white/40 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-8 font-[family-name:var(--font-inter)] text-[14px] leading-relaxed text-white/55">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        {/* Contract */}
        <div className="flex w-full flex-col items-center gap-3">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            Contract
          </p>
          <ContractBar />
        </div>

        {/* Socials */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-inter)] text-[14px] font-bold uppercase tracking-[0.02em] text-lf-ui transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Wordmark */}
        <p
          aria-hidden="true"
          className="w-full text-center font-[family-name:var(--font-display)] text-[clamp(3rem,14vw,11rem)] leading-[0.8] tracking-[0.01em] text-white/[0.07]"
        >
          $CRASH
        </p>

        {/* Legal. A token site needs a real risk disclaimer here — this is a
            structural placeholder, not usable wording. */}
        <div className="flex w-full flex-col items-center gap-2 border-t border-white/10 pt-8 text-center">
          <p className="max-w-[70ch] font-[family-name:var(--font-inter)] text-[12px] leading-relaxed text-white/35">
            [ Placeholder — risk disclaimer goes here. Needs real wording before
            launch. ]
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">
            [ © placeholder ]
          </p>
        </div>
      </div>
    </footer>
  );
}
