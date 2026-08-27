import { Hero } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/Hero";
import { Credits } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/Credits";
import { Overlays } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/Overlays";
import { BLOCKS } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/blocks.data";
import { LayeredBlock } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/LayeredBlock";

/**
 * Clone of https://lilfrogeth.com/ — structure and motion.
 *
 * A single long illustration scroll: a full-height hero with six marquee rows,
 * then eleven layered compositions, then credits, with three fixed overlays
 * above everything. Only the hero, nav and credits carry text, and only the
 * hero and nav animate.
 *
 * Artwork is not vendored. Each layer is an ArtSlot holding the measured
 * position and proportions of the original, ready for your own art.
 *
 * See docs/research/lilfrogeth-com-629a1bd8/root-8a5edab2/
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
          <LayeredBlock key={block.key} block={block} />
        ))}

        <Credits />
      </main>
    </>
  );
}
