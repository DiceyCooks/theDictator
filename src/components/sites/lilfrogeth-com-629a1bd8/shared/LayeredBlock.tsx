import { ArtSlot } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/ArtSlot";
import type { BlockSpec } from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/blocks.data";
import { cn } from "@/lib/utils";

/**
 * One block of the illustration scroll.
 *
 * Every block on the target is a stack of absolutely-positioned layers with no
 * text — the composition *is* the content. Each layer is reproduced here as a
 * percentage-positioned ArtSlot, so the arrangement holds its proportions at any
 * viewport rather than breaking off-canvas at widths other than the 1905px the
 * measurements were taken at.
 *
 * Layers frequently bleed past the block edges (negative offsets, widths over
 * 100%), which is why the block clips its overflow.
 */
export function LayeredBlock({ block }: { block: BlockSpec }) {
  return (
    <section
      aria-label={block.name}
      data-block={block.key}
      className={cn(
        "relative w-full overflow-hidden",
        block.dark ? "bg-lf-ink" : "bg-transparent",
      )}
      style={{ aspectRatio: `1 / ${block.ratio}` }}
    >
      {block.slots.map((slot, i) => (
        <ArtSlot
          key={slot.id}
          label={slot.id}
          fit={slot.fit}
          className="absolute"
          style={{
            left: `${slot.left}%`,
            top: `${slot.top}%`,
            width: `${slot.width}%`,
            height: `${slot.height}%`,
            zIndex: i + 1,
          }}
        />
      ))}
    </section>
  );
}
