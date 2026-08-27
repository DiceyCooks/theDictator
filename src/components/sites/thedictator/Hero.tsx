import Image from "next/image";
import { Marquee } from "@/components/sites/thedictator/shared/Marquee";
import { ArtSlot } from "@/components/sites/thedictator/shared/ArtSlot";

/**
 * Hero — block 0 (`framer-ab08lb`), full viewport height, overflow hidden.
 *
 * Measured at 100vh across every breakpoint (957 at vh 957, 1024 at vh 1024,
 * 844 at vh 844), so it is sized in vh rather than fixed px.
 *
 * Five layers, bottom to top. Geometry below is measured at a 1440 viewport
 * (hero box 1425x900) and expressed as percentages of that box.
 *
 *   1. background plate  inset negative on all sides, scale(1.5), fades in
 *   2. marquee rows      six rows, alternating height and direction
 *   3. ground band       full-width strip across the lower third
 *   4. figure            the character, object-fit: contain
 *   5. accent dot        a 10px detail
 *
 * Only layer 1 animates. The marquee rows loop continuously; nothing else moves.
 */

/** Row heights alternate between two variants on the target. */
const ROWS = [190, 186, 190, 186, 190, 186] as const;

/**
 * Per-row opacity. The stack reads flat when every row is at full strength, so
 * the outer rows are pulled back and the middle two sit forward — the figure
 * stands in the strongest band and the rest recedes.
 */
const ROW_OPACITY = [0.42, 0.72, 1, 1, 0.72, 0.42] as const;

/** The wordmark repeated across every marquee row. */
const WORDMARK = "THEDICTATOR";

function Wordmark() {
  return (
    <span
      className="select-none whitespace-nowrap px-[0.06em] font-[family-name:var(--font-inter)] font-black uppercase leading-[0.78] tracking-[-0.045em] text-lf-type"
      style={{ fontSize: "150px" }}
    >
      {WORDMARK}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative z-[1] h-screen w-full overflow-hidden bg-lf-ink">
      {/* 1 — background plate. Negative inset on all sides plus scale(1.5)
          keeps it cropped well beyond the viewport, so it can move without
          ever exposing an edge. Only ~36% x 32% of it is ever visible. */}
      <div
        className="lf-hero-gradient absolute z-[1]"
        style={{
          top: "-436.375px",
          left: "-615px",
          right: "-615px",
          bottom: "-530px",
          animation:
            "lf-fade-in 800ms cubic-bezier(0.11, 0.82, 0.26, 0.95) both, lf-drift 34s ease-in-out infinite",
        }}
      />

      {/* 1b — drifting cloud texture.
          Above the gradient, below the type. This is the layer that actually
          reads as movement: the gradient drift underneath it has no detail for
          the eye to track, so on its own it looks static however fast it pans. */}
      <div
        aria-hidden="true"
        className="lf-hero-clouds pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
      />

      {/* 2 — marquee stack */}
      <div className="absolute inset-x-0 top-[60px] bottom-[-60px] z-[2] flex flex-col items-center">
        {ROWS.map((height, i) => (
          <div
            key={i}
            className="w-full"
            style={{ opacity: ROW_OPACITY[i] }}
          >
            <Marquee
              height={height}
              direction={i % 2 === 0 ? "left" : "right"}
              className="w-full max-w-full"
            >
              <Wordmark />
            </Marquee>
          </div>
        ))}
      </div>

      {/* 3 — ground.
          Filled with the SAME colour as the block below, so the hero/next-panel
          seam disappears completely — that is the whole trick. The edge rises at
          the sides and dips through the centre, which keeps the figure clear
          while the shape closes in around it.
          Deliberately above the figure (z-5) so it crops the legs: occlusion is
          what makes this read as ground rather than a stripe across the page. */}
      <div
        className="pointer-events-none absolute z-[5]"
        style={{ left: 0, top: "80%", width: "100%", height: "21%" }}
      >
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M0,220 L0,104 C240,138 470,160 720,166 C970,160 1200,138 1440,104 L1440,220 Z"
            fill="var(--lf-ink)"
          />
        </svg>
      </div>

      {/* 4 — figure. object-fit contain, sitting slightly left of centre.
          The source is 941x1672 (aspect 0.563), taller than the box, so it fills
          the box height and pillarboxes horizontally, centred. */}
      <div
        className="pointer-events-none absolute z-[4]"
        style={{
          left: "22.596%",
          top: "23.444%",
          width: "47.298%",
          height: "88.778%",
        }}
      >
        <Image
          src="/sites/thedictator/images/hero-figure.png"
          alt=""
          fill
          priority
          sizes="(max-width: 810px) 70vw, 48vw"
          className="object-contain"
        />
      </div>

      {/* 5 — accent dot, a 10px detail on the right */}
      <div
        className="pointer-events-none absolute z-[6]"
        style={{
          left: "77.754%",
          top: "64.111%",
          width: "0.702%",
          height: "1.111%",
        }}
      >
        <ArtSlot label="Dot" fit="cover" className="h-full w-full" />
      </div>
    </section>
  );
}
