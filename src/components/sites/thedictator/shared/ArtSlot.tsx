import { cn } from "@/lib/utils";

type ArtSlotProps = {
  /** What belongs here, so the slot is self-documenting when you swap it in. */
  label: string;
  /** Intrinsic size of the original asset, used to hold exact layout. */
  width?: number;
  height?: number;
  className?: string;
  /** Mirrors the original's object-fit so replacement art lands identically. */
  fit?: "cover" | "contain" | "fill";
  style?: React.CSSProperties;
};

/**
 * A placeholder standing in for artwork that is not shipped in this repo.
 *
 * The original illustrations are credited third-party work, so only their layout
 * envelope is reproduced: exact dimensions, fit and position. Drop an <Image>
 * in here with the same box and nothing around it shifts.
 */
export function ArtSlot({
  label,
  width,
  height,
  className,
  fit = "cover",
  style,
}: ArtSlotProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      data-art-slot={label}
      data-fit={fit}
      className={cn(
        "flex items-center justify-center overflow-hidden",
        "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_12px,transparent_12px_24px)]",
        "border border-dashed border-[rgba(255,255,255,0.3)]",
        className,
      )}
      style={{ width, height, ...style }}
    >
      <span className="px-3 text-center font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[-0.02em] text-[rgba(255,255,255,0.72)]">
        {label}
        {width && height ? (
          <span className="mt-1 block text-[10px] font-normal opacity-60">
            {width}×{height}
          </span>
        ) : null}
      </span>
    </div>
  );
}
