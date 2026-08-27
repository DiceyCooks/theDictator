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

## Breakpoints

**Three variants, not two.**

| Variant | Range | Captured at | scrollHeight |
|---|---|---|---|
| large | >= 1600 | 1600 (content 1585) | 18,291 |
| desktop | 810 - 1599 | 1440 (content 1425) | 20,203 |
| mobile | < 810 | 390 | 15,536 |

Both boundaries found by bisection on clean loads:
- 1550 -> desktop (`k5szjo` 2065), 1600 -> large (`k5szjo` 2740).
- 810 -> desktop (`18hopws` 1200), 768 -> mobile (`18hopws` 651).

There is no separate tablet variant — 768 and 390 are the same layout.

### The 1600px breakpoint was missed at first, and it mattered

Five blocks appeared to be **fluid**, scaling with viewport width. They are not. Every block has a
**fixed** height within its variant. The apparent fluidity was large-variant readings being compared
against desktop-variant readings before the 1600 boundary was known:

| Block | desktop (810-1599) | large (>=1600) |
|---|---|---|
| `k5szjo` | 2065 | 2740 |
| `kcykm` | 3164 | 2590 |
| `10ytyjo` | 3022 | 2852 |
| `1htt17w` | 1989 | 796 |
| `mnfkb7` | 2696 | 2046 |

Verified fixed within the desktop variant by clean loads at 900, 1440, 1500 and 1550, which all
return identical heights.

### The one genuine exception

`k5szjo` **is** fluid inside the mobile variant, and only there. Clean loads:

| viewport | height |
|---|---|
| 390 | 2562 |
| 550 | 2730 |
| 768 | 3102 |

Not linear — the slope is 1.05 from 390 to 550, then 1.71 from 550 to 768, so any two-point formula
is wrong. The clone uses a least-squares fit across all three points,
`calc(1975px + 144.48vw)`, with a maximum residual near 40px on a 2.5-3.1k block (under 1.5%).
This is the only **approximate** height in the build; every other one is exact.

## Height model

Heights are fixed within every variant (sole exception above). Two blocks are viewport-height:

| Block | Behavior |
|---|---|
| `ab08lb` (hero) | **100vh** — 900 at vh 900, 1024 at vh 1024, 844 at vh 844 |
| `tgbvc8` | **100vh** |
| all others | fixed px per variant |

The hero reads as fixed-px if sampled at a single viewport. It is not.

## The 14th block

The original enumeration listed 15 children and **missed one**: `framer-1rvi7xe`, an empty 355px
spacer between `k5szjo` and `1htt17w` at top 5065. No images, no text, transparent. It is present in
the desktop and large variants and **absent at mobile** — the mirror of the two mobile-only spacers
after the hero.

It went unnoticed because the first enumeration ran against a stale DOM. It accounted for exactly
the 355px by which the clone's page height was short at every desktop width.

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
| 1920 | 18,291 | 18,291 | **exact** |
| 1440 | 20,203 | 20,203 | **exact** |
| 768 | 16,291 | 16,239 | −52 (0.3%) |
| 390 | 15,536 | 15,512 | −24 (0.15%) |

The two sub-percent gaps are the `k5szjo` least-squares fit trading exactness at any single mobile
width for accuracy across the whole range.

Note the target is **taller at 1440 than at 1920** (20,203 vs 18,291) — that is the desktop and
large variants being different compositions, not a fluid response to width.

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
