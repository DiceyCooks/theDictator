import { Hero } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/Hero";
import { Credits } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/Credits";
import { BLOCKS } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/blocks.data";
import { LayeredBlock } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/LayeredBlock";

/**
 * Clone of https://lilfrogeth.com/ — structure and motion.
 *
 * The target is a single long illustration scroll: a hero with six marquee rows,
 * then eleven layered compositions, then credits. Only the hero and credits
 * carry any text.
 *
 * Artwork is not vendored. Each layer is an ArtSlot holding the measured
 * position and proportions of the original, ready for your own art.
 *
 * See docs/research/lilfrogeth-com-629a1bd8/root-8a5edab2/
 */
export default function Page() {
  return (
    <main className="bg-lf-ink">
      <Hero />
      {BLOCKS.map((block) => (
        <LayeredBlock key={block.key} block={block} />
      ))}
      <Credits />
    </main>
  );
}
