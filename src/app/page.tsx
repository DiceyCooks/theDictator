import { Hero } from "@/components/sites/thedictator/Hero";
import { Credits } from "@/components/sites/thedictator/Credits";
import { Overlays } from "@/components/sites/thedictator/Overlays";
import { BLOCKS } from "@/components/sites/thedictator/blocks.data";
import { LayeredBlock } from "@/components/sites/thedictator/shared/LayeredBlock";

/**
 * Clone of https://lilfrogeth.com/ — structure and motion.
 *
 * A single long illustration scroll: a full-height hero with six marquee rows,
 * eleven layered compositions, three empty spacer blocks, then credits, with
 * three fixed overlays above everything. Only the hero, nav and credits carry
 * text, and only the hero and nav animate.
 *
 * Artwork is not vendored. Each layer is an ArtSlot holding the measured
 * position and proportions of the original, ready for your own art.
 *
 * See docs/research/thedictator/
 */
export default function Page() {
  return (
    <>
      <Overlays />
      <main className="overflow-x-hidden bg-lf-ink">
        <Hero />

        {/* Mobile-only spacers between the hero and the first block. Absent from
            the desktop DOM entirely, not merely hidden. */}
        <div aria-hidden="true" className="h-[100px] lf:hidden" />
        <div aria-hidden="true" className="h-[220px] lf:hidden" />

        {BLOCKS.map((block) => (
          <div key={block.key} className="contents">
            <LayeredBlock block={block} />

            {/* framer-1rvi7xe — an empty 355px spacer block that sits between
                Panels and Totem. Desktop and large only; absent at mobile. */}
            {block.key === "k5szjo" && (
              <div
                aria-hidden="true"
                data-block="1rvi7xe"
                className="hidden h-[355px] lf:block"
              />
            )}
          </div>
        ))}

        <Credits />
      </main>
    </>
  );
}
