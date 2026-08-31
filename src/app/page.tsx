import { About } from "@/components/sites/thedictator/About";
import { Hero } from "@/components/sites/thedictator/Hero";
import { Overlays } from "@/components/sites/thedictator/Overlays";

/**
 * THEDICTATOR — $CRASH
 *
 * The hero, plus the three fixed overlays that sit above it: the grain, the
 * logo/nav/CTA row, and the bottom info bar.
 *
 * Sections below the hero are being written from scratch. Add them inside
 * <main>, after <Hero />, with ids matching the nav anchors (#about,
 * #tokenomics, #socials) so those links start resolving.
 *
 * The hero's ground shape is filled with the same colour as whatever sits below
 * it, which is what makes the seam disappear — a section with a different
 * background will need that colour threaded through, or the join reappears.
 */
export default function Page() {
  return (
    <>
      <Overlays />
      <main className="overflow-x-hidden bg-lf-ink">
        <Hero />
        <About />
      </main>
    </>
  );
}
