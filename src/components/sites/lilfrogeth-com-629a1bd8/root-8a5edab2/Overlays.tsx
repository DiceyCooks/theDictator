import { Marquee } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/Marquee";

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
 */

/** Nav labels, each rendered twice by the marquee for a seamless loop. */
const NAV_LABELS = [
  "Essential",
  "Links",
  "Grab the",
  "Contract",
  "Explore",
  "Tokenomics",
] as const;

/** Stand-in for the target's 133x17 logotype, which is vector artwork. */
function NavMark() {
  return (
    <span
      aria-label="Logotype placeholder"
      className="mx-4 inline-flex h-[17px] w-[133px] shrink-0 items-center justify-center border border-dashed border-[rgba(243,245,151,0.4)] text-[9px] uppercase tracking-[-0.02em] text-[rgba(243,245,151,0.7)]"
    >
      Logotype
    </span>
  );
}

export function Overlays() {
  return (
    <>
      {/* Grain — purely decorative, never intercepts pointer events */}
      <div
        aria-hidden="true"
        className="lf-grain pointer-events-none fixed inset-0 z-10 opacity-[0.06] mix-blend-screen"
      />

      {/* Top nav */}
      <nav className="fixed left-1/2 top-[10px] z-10 h-[51px] w-[717px] max-w-[calc(100%-32px)] -translate-x-1/2 overflow-hidden">
        <Marquee height={51} direction="left" className="h-full">
          {NAV_LABELS.map((label) => (
            <span key={label} className="flex shrink-0 items-center">
              <span className="whitespace-nowrap px-4 font-[family-name:var(--font-inter)] text-[14px] font-medium uppercase leading-[1.15] tracking-[-0.025em] text-lf-acid">
                {label}
              </span>
              <NavMark />
            </span>
          ))}
        </Marquee>
      </nav>

      {/* Bottom info bar. The target carries a short prose blurb here; that copy
          is the site owner's, so this is a placeholder with the same structure. */}
      <div className="fixed inset-x-0 bottom-0 z-[9] flex h-16 items-center gap-4 px-4 sm:px-6">
        <span className="shrink-0 font-[family-name:var(--font-inter)] text-[14px] font-semibold uppercase leading-[1.15] tracking-[-0.025em] text-lf-acid">
          Heading
        </span>
        <p className="truncate font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.15] tracking-[-0.025em] text-[rgba(255,255,255,0.7)]">
          Placeholder for the one-line description that runs along the bottom.
        </p>
      </div>
    </>
  );
}
