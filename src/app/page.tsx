import { About } from "@/components/sites/thedictator/About";
import { Footer } from "@/components/sites/thedictator/Footer";
import { Hero } from "@/components/sites/thedictator/Hero";
import { Overlays } from "@/components/sites/thedictator/Overlays";

/**
 * THEDICTATOR — $CRASH
 *
 * Hero, About and Footer, plus the three fixed overlays that sit above them:
 * the grain, the logo/nav/CTA row, and the bottom info bar.
 *
 * Tokenomics is still to come — it belongs between About and Footer, with
 * id="tokenomics" so that nav link starts resolving. #about and #socials
 * already do.
 *
 * Each section hands its background colour to the next: the hero's ground
 * closes on ink, About opens on ink and ends on navy-900, and the Footer opens
 * on navy-900. Insert a section in the middle and it has to continue that
 * chain or a seam appears at the join.
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
        <Footer />
      </main>
    </>
  );
}
