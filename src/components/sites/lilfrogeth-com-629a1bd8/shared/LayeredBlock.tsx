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
 * The target ships three genuinely different compositions per block rather than
 * one layout that scales, so all three are rendered and switched in CSS:
 *
 *   large    >=1600px
 *   desktop  810-1599px
 *   mobile   <810px
 *
 * Within each variant the height is fixed. Slots are percentage-positioned
 * against their own variant's box.
 *
 * Some blocks keep a fixed pixel width wider than the viewport and are clipped
 * by the page rather than shrinking; those are centred here, as on the target.
 */
function Variant({
  variant,
  className,
}: {
  variant: BlockVariant;
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
      <Variant variant={block.mobile} className="block lf:hidden" />
      <Variant
        variant={block.desktop}
        className="hidden lf:block lflg:hidden"
      />
      <Variant variant={block.large} className="hidden lflg:block" />
    </section>
  );
}
