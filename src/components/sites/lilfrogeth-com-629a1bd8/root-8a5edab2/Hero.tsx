import { Marquee } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/Marquee";
import { ArtSlot } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/ArtSlot";

/**
 * Hero — block 0 (`framer-ab08lb`), 900px tall, overflow hidden.
 *
 * Three stacked layers:
 *   1. background plate, inset negative and scaled 1.5x, fading 0.001 -> 1 over 800ms
 *   2. six marquee rows, alternating 190/186px and alternating direction
 *   3. the figure, centred above the rows
 *
 * The wordmark on the target is SVG vector artwork rather than typeset text, so it
 * is represented here by a placeholder word at matching scale. Swapping in real
 * artwork does not change the marquee mechanism.
 */

/** Row heights alternate between two variants on the target. */
const ROWS = [190, 186, 190, 186, 190, 186] as const;

function Wordmark() {
  return (
    <span
      className="select-none whitespace-nowrap px-[0.06em] font-[family-name:var(--font-inter)] font-black uppercase leading-[0.78] tracking-[-0.045em] text-lf-acid"
      style={{ fontSize: "150px" }}
    >
      Placeholder
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative z-[1] h-[900px] w-full overflow-hidden bg-lf-ink">
      {/* Layer 1 — background plate. Negative inset on all sides plus scale(1.5)
          keeps the plate cropped well beyond the viewport so it can move without
          ever exposing an edge. */}
      <div
        className="absolute z-[1]"
        style={{
          top: "-436.375px",
          left: "-615px",
          right: "-615px",
          bottom: "-530px",
          transform: "scale(1.5)",
          animation:
            "lf-fade-in 800ms cubic-bezier(0.11, 0.82, 0.26, 0.95) both",
        }}
      >
        <ArtSlot
          label="Hero background plate"
          fit="cover"
          className="h-full w-full"
        />
      </div>

      {/* Layer 2 — marquee stack */}
      <div className="absolute inset-x-0 top-[60px] bottom-[-60px] z-[2] flex flex-col items-center">
        {ROWS.map((height, i) => (
          <Marquee
            key={i}
            height={height}
            direction={i % 2 === 0 ? "left" : "right"}
            className="w-full max-w-full"
          >
            <Wordmark />
          </Marquee>
        ))}
      </div>

      {/* Layer 3 — figure, above the rows */}
      <div className="pointer-events-none absolute inset-0 z-[3] flex items-end justify-center">
        <ArtSlot
          label="Figure"
          width={400}
          height={720}
          fit="contain"
          className="mb-0"
        />
      </div>
    </section>
  );
}
