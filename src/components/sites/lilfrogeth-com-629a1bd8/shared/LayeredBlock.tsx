import { ArtSlot } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/ArtSlot";
import type {
  BlockSpec,
  BlockVariant,
} from "@/components/sites/lilfrogeth-com-629a1bd8/root-8a5edab2/blocks.data";
import { cn } from "@/lib/utils";

/**
 * One block of the illustration scroll.
 *
 * Every block on the target is a stack of absolutely-positioned layers with no
 * text — the composition *is* the content — and none of them animate. The only
 * motion on the page belongs to the hero and the nav.
 *
 * Desktop and mobile are genuinely different compositions rather than one layout
 * scaling, so both variants are rendered and switched at the 810px breakpoint.
 * Slots are percentage-positioned within their own variant's box.
 *
 * Some blocks keep a fixed pixel width wider than the viewport and are clipped
 * by the page; those are centred here, matching the target.
 */
function Variant({
  variant,
  name,
  className,
}: {
  variant: BlockVariant;
  name: string;
  className: string;
}) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: variant.height }}
    >
      <div
        className={cn(
          "relative h-full",
          variant.fixedWidth ? "mx-auto" : "w-full",
        )}
        style={
          variant.fixedWidth ? { width: `${variant.fixedWidth}px` } : undefined
        }
      >
        {variant.slots.map((slot, i) => (
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
      </div>
      <span className="sr-only">{name}</span>
    </div>
  );
}

export function LayeredBlock({ block }: { block: BlockSpec }) {
  return (
    <section
      aria-label={block.name}
      data-block={block.key}
      className={cn("relative w-full", block.dark && "bg-lf-ink")}
    >
      <Variant
        variant={block.desktop}
        name={block.name}
        className="hidden lf:block"
      />
      <Variant
        variant={block.mobile}
        name={block.name}
        className="block lf:hidden"
      />
    </section>
  );
}
