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
 * The nav is STATIC here. The target scrolls its labels as a marquee; that was
 * reproduced and then deliberately dropped — a nav that moves is hard to read
 * and hard to click.
 *
 * Type here is --lf-ui (gold), not --lf-type (black). These overlays travel over
 * the black blocks below the hero, so black would disappear on scroll.
 */

/**
 * Nav labels. Each is a two-word phrase split across two lines, which is how the
 * target sets them: "Essential links", "Grab the contract", "Explore tokenomics".
 */
const NAV_GROUPS = [
  { top: "Essential", bottom: "Links", href: "#links" },
  { top: "Grab the", bottom: "Contract", href: "#contract" },
  { top: "Explore", bottom: "Tokenomics", href: "#tokenomics" },
] as const;

/** Stand-in for the target's 133x17 logotype, which is vector artwork. */
function NavMark() {
  return (
    <span
      aria-label="Logotype placeholder"
      className="inline-flex h-[17px] w-[110px] shrink-0 items-center justify-center border border-dashed border-[color-mix(in_oklch,var(--lf-ui)_40%,transparent)] text-[9px] uppercase tracking-[-0.02em] text-[color-mix(in_oklch,var(--lf-ui)_70%,transparent)]"
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
        className="lf-grain pointer-events-none fixed inset-0 z-10 opacity-[0.15] mix-blend-overlay"
      />

      {/* Top nav — static */}
      <nav className="fixed left-1/2 top-[10px] z-10 flex h-[51px] w-[717px] max-w-[calc(100%-24px)] -translate-x-1/2 items-center justify-between gap-4 px-2 sm:gap-8">
        <NavMark />

        {NAV_GROUPS.map((group) => (
          <a
            key={group.top}
            href={group.href}
            className="shrink-0 font-[family-name:var(--font-inter)] text-[13px] font-semibold uppercase leading-[1.15] tracking-[-0.025em] text-lf-ui transition-opacity duration-200 hover:opacity-60 sm:text-[14px]"
          >
            <span className="block whitespace-nowrap">{group.top}</span>
            <span className="block whitespace-nowrap">{group.bottom}</span>
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
