# Responsive — lilfrogeth.com/

Swept at 390, 768, 810, 1200, 1440, 1600, 1800 and 1920.

## The measurement trap that invalidates a naive sweep

**Resizing the viewport is not enough. Every breakpoint must be measured on a fresh page load.**

Framer switches breakpoint variants by re-rendering, and nodes belonging to the previous variant
survive the resize. Measurements taken after a resize therefore describe a hybrid DOM that never
exists for a real visitor.

This produced two directly contradictory readings of the same elements:

| Reading | How it was taken | Result |
|---|---|---|
| Spacers exist at 1440 | tab loaded narrow, then resized to 1440 | present, 100px + 220px |
| Spacers absent at 1440 | clean load at 1440 | **not in the DOM at all** |
| Spacers absent at 390 | loaded at 1920, resized down to 390 | absent |
| Spacers present at 390 | **clean load at 390** | present, `display: block` |

The clean loads are the truth: the spacers are **mobile-only**. An earlier note in
`PAGE_TOPOLOGY.md` claiming they were desktop-only, breakpoint-gated by `hidden-1rml4m2`, was
derived from a resized tab and is wrong.

Block heights, by contrast, agreed between resize and clean load at 390, so those measurements
survived scrutiny.

## Breakpoint

**810px** — Framer's phone default.

Confirmed by bisection: at 810 the desktop variant still renders (`18hopws` 1200px,
`scrollHeight` 20203); at 768 it has switched (`18hopws` 651px, `scrollHeight` 16291).

There is no separate tablet variant. 768 and 390 produce **identical** heights on every block but
`k5szjo`, so tablet and phone are one and the same layout.

## Height model

Below 810 blocks take **fixed pixel heights** — they do not scale with width. Above it the model is
mixed:

| Block | @1440 | @1905 | Behavior on desktop |
|---|---|---|---|
| `ab08lb` (hero) | 900 | 957 | **100vh** |
| `tgbvc8` | 900 | 957 | **100vh** |
| `18hopws` | 1200 | 1200 | fixed |
| `12iimvw` | 1200 | 1200 | fixed |
| `1csghqk` | 1250 | 1250 | fixed |
| `1pk46w7` | 953 | 953 | fixed |
| `fhalzc` | 248 | 248 | fixed |
| `pf7mlq` | 261 | 261 | fixed |
| `k5szjo` | 2065 | 2911 | fluid — grows with width |
| `kcykm` | 3164 | 2590 | fluid — shrinks with width |
| `10ytyjo` | 3022 | 2852 | fluid |
| `1htt17w` | 1989 | 796 | fluid |
| `mnfkb7` | 2696 | 2046 | fluid |

The hero reads as fixed-px if sampled at a single viewport. It is not — it tracks viewport height
exactly at every width (957 at vh 957, 1024 at vh 1024, 844 at vh 844).

The five fluid blocks are driven by the intrinsic heights of the images inside them. The clone pins
them to their measured 1440 values, which is an **approximation** at other desktop widths.

## Blocks wider than the viewport

Three blocks keep a fixed pixel width and are clipped by the page rather than shrinking:

| Block | Desktop | Mobile |
|---|---|---|
| `1htt17w` | 1600 | 1600 |
| `pf7mlq` | 1625 | 1625 |
| `mnfkb7` | 1600 | 1202 |

They are centred and the page clips horizontally. The clone reproduces this and confirms
`scrollWidth <= innerWidth` at all three widths, so no horizontal scrollbar appears.

## Page height

| Width | Target | Clone | Δ |
|---|---|---|---|
| 1440 | 20,203 | 19,778 | −2.1% |
| 768 | 16,291 | 15,794 | −3.1% |
| 390 | 15,536 | 15,714 | +1.1% |

Note the target is **taller at 1440 than at 1920** (20,203 vs 18,291), because the fluid blocks and
the fixed-width blocks respond to width in opposite directions.

## Fixed overlays

| Element | Size | Position | z | Role |
|---|---|---|---|---|
| `framer-1i93ave-container` | full viewport | inset 0 | 10 | grain texture, `pointer-events: none` |
| `framer-jaq4ea-container` | 717×51 | top 10px, centred | 10 | nav marquee + 133×17 logotype |
| `framer-1t24yw8` | full × 64 | pinned bottom | 9 | one-line info bar |

Nav labels, each duplicated for the marquee loop:
`Essential` · `Links` · `Grab the` · `Contract` · `Explore` · `Tokenomics`

The page-wide marquee bands noted earlier are **this nav**, not per-section content.

The grain is a bitmap on the target. The clone generates an equivalent with an SVG `feTurbulence`
data URI instead of vendoring the asset.
