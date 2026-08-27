import Image from "next/image";
import { Marquee } from "@/components/sites/thedictator/shared/Marquee";

/**
 * Hero — block 0 (`framer-ab08lb`), full viewport height, overflow hidden.
 *
 * Measured at 100vh across every breakpoint (957 at vh 957, 1024 at vh 1024,
 * 844 at vh 844), so it is sized in vh rather than fixed px.
 *
 * Layers, bottom to top. Geometry below is measured at a 1440 viewport
 * (hero box 1425x900) and expressed as percentages of that box.
 *
 *   1. background plate  inset negative on all sides, scale(1.5), fades in
 *   1b. cloud banks      two parallax layers, the visible motion
 *   2. marquee rows      six rows, alternating height and direction
 *   3. ground            full-width shape closing into the next panel
 *   4. figure            the character, object-fit: contain
 *
 * The target also carries a 10px accent dot at the right of the hero. It is
 * dropped here — nothing is going in that slot.
 *
 * Only layer 1 animates. The marquee rows loop continuously; nothing else moves.
 */

/** Row heights alternate between two variants on the target. */
const ROWS = [190, 186, 190, 186, 190, 186] as const;

/**
 * Per-row opacity. The outer rows are pulled back and the middle two sit
 * forward, so the stack reads with depth instead of flat.
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

/**
 * Which ground treatment renders. Flip to "hard" to get the original single
 * clean curve back — it is kept verbatim in GroundHard below.
 */
const GROUND_STYLE: "soft" | "hard" = "soft";

/**
 * Original ground: one clean arc, filled with the next panel's colour.
 *
 * Kept because it is the most reliable option — a single opaque shape can never
 * leave a gap at the seam. Its weakness is that the edge is a hard mathematical
 * curve, which reads as forced against painterly artwork.
 */
function GroundHard() {
  return (
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
  );
}

/**
 * Softened ground. Three things working together:
 *
 *   1. a long veil fading transparent -> ink, so the transition dissolves over
 *      ~39% of the hero rather than resolving at a line
 *   2. the main mass, its top edge roughened by a turbulence displacement so it
 *      reads as a brushed/torn edge instead of a curve
 *   3. a lighter stray stroke above the mass, which is what stops the edge
 *      looking like a single deliberate shape
 *
 * The veil alone reads as a plain gradient; the shape alone reads as a hard cut.
 * The combination is what makes it feel painted.
 *
 * Both paths are drawn far below the viewBox bottom (y 520 in a 320 box) so the
 * displacement can never lift the fill off the hero's bottom edge and reopen the
 * seam — the filter can only disturb the top edge.
 */
function GroundSoft() {
  return (
    <div
      className="pointer-events-none absolute z-[5]"
      style={{ left: 0, top: "62%", width: "100%", height: "39%" }}
    >
      <div className="lf-ground-veil absolute inset-0" />

      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="lf-brush"
            x="-10%"
            y="-30%"
            width="120%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005 0.019"
              numOctaves="4"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="36"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter="url(#lf-brush)" opacity="0.5">
          <path
            d="M0,520 L0,150 C280,112 540,146 760,140 C980,134 1210,158 1440,124 L1440,520 Z"
            fill="var(--lf-ink)"
          />
        </g>

        <g filter="url(#lf-brush)">
          <path
            d="M0,520 L0,186 C240,214 470,232 720,238 C970,232 1200,214 1440,186 L1440,520 Z"
            fill="var(--lf-ink)"
          />
        </g>
      </svg>
    </div>
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
        className="lf-clouds-far pointer-events-none absolute inset-0 z-[1]"
      />
      <div
        aria-hidden="true"
        className="lf-clouds-near pointer-events-none absolute inset-0 z-[1]"
      />

      {/* 2 — marquee stack */}
      <div className="absolute inset-x-0 top-[60px] bottom-[-60px] z-[2] flex flex-col items-center">
        {ROWS.map((height, i) => (
          <div key={i} className="w-full" style={{ opacity: ROW_OPACITY[i] }}>
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
      {GROUND_STYLE === "hard" ? <GroundHard /> : <GroundSoft />}

      {/* 4 — figure. object-fit contain, sitting slightly left of centre.
          The source is 941x1672 (aspect 0.563), taller than the box, so it fills
          the box height and pillarboxes horizontally, centred.

          Scaled 1.28x above the geometry measured on the target, because this
          character is far narrower than the one it replaces (0.563 vs 0.723) and
          was drawing ~478px wide against display type this heavy. Grown about
          the figure's own vertical centre, so the head still clears the nav and
          the feet stay below the ground shape. */}
      <div
        className="pointer-events-none absolute z-[4]"
        style={{
          left: "16%",
          top: "11%",
          width: "60.5%",
          height: "113.6%",
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
    </section>
  );
}
