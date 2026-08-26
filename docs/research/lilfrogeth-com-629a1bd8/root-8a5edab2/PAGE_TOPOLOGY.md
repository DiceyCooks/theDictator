# Page Topology — lilfrogeth.com/

- **Source URL:** https://lilfrogeth.com/
- **site-key:** `lilfrogeth-com-629a1bd8`
- **page-key:** `root-8a5edab2`
- **Destination route:** `/` (`src/app/page.tsx` — fresh-template root clone)
- **Captured at:** 1440×900 viewport
- **Total scroll height:** 20,168px

## Platform

Built in **Framer**. Generated class names (`framer-o0mzm0`, `framer-ab08lb`, …) are build-hash
derived and carry no semantics — do **not** mirror them. All assets are served from
`framerusercontent.com`. Runtime is `script_main.W6MG7EJM.mjs`. Analytics: Fathom + Framer events.

Consequences for the clone:
- No authored stylesheet is readable (`document.styleSheets` exposes no keyframes). All motion is
  JS-driven from the Framer runtime, so behavior must be captured as **state diffs**, not read from CSS.
- Every section carries an entrance animation gated on viewport visibility.

## Scroll container

`<html class="lenis">` — **Lenis** smooth scroll is active page-wide. Native scrolling feels
materially different; the clone must install Lenis or the difference is immediately obvious.

Root wrapper is a single `<header class="framer-o0mzm0">` spanning the full 20,168px. Its 15 direct
children are the page blocks below.

## Block map (document order)

| # | class | top | height | imgs | svgs | working name |
|---|---|---|---|---|---|---|
| 0 | `framer-ab08lb` | 0 | 900 | 4 | 16 | **Hero** — marquee stack + frog |
| 11 | `framer-1oryf6n` | 900 | 100 | 0 | 0 | Spacer (hidden at some breakpoints) |
| 12 | `framer-1h5f3tx` | 1000 | 220 | 0 | 0 | Spacer (hidden at some breakpoints) |
| 1 | `framer-18hopws` | 1220 | 1200 | 7 | 0 | Panel A |
| 2 | `framer-tgbvc8` | 2420 | 900 | 6 | 0 | Panel B |
| 3 | `framer-k5szjo` | 3320 | 2065 | 3 | 0 | Tall panel C |
| 4 | `framer-1htt17w` | 5385 | 1989 | 1 | 2 | Tall panel D |
| 5 | `framer-12iimvw` | 7374 | 1200 | 2 | 0 | Panel E |
| 6 | `framer-mnfkb7` | 8574 | 2696 | 6 | 0 | Tall panel F |
| 7 | `framer-10ytyjo` | 11270 | 3022 | 13 | 2 | **Heaviest block** — 13 images |
| 8 | `framer-1csghqk` | 14292 | 1250 | 5 | 0 | Panel H — solid black bg |
| 9 | `framer-kcykm` | 15542 | 3164 | 2 | 2 | Tall panel I — solid black bg |
| 10 | `framer-pf7mlq` | 18706 | 261 | 0 | 0 | Band J |
| 13 | `framer-1pk46w7` | 18967 | 953 | 3 | 0 | Panel K |
| 14 | `framer-fhalzc` | 19920 | 248 | 0 | 0 | **Credits / footer** |

> Note blocks 11 and 12 are spacers that sit between the hero and block 1 in *visual* order despite
> being late in DOM order. Both carry `hidden-1rml4m2 hidden-174vl6w` — they are breakpoint-gated.

## Fixed overlays

Three elements are `position: fixed` and sit above the scrolling content:

| class | role |
|---|---|
| `framer-1i93ave-container` | overlay 1 |
| `framer-jaq4ea-container` | overlay 2 |
| `framer-1t24yw8` | overlay 3 |

These must be siblings of the scroll content in the clone, not children of any section.

## Hero anatomy (block 0)

Three stacked layers inside a 900px-tall `overflow: hidden` box:

1. **Background plate** — `framer-wzyyrq`, absolutely positioned and inset negative on all sides
   (`top: -436px; left/right: -615px; bottom: -530px`), sized 2655×1866, `transform: scale(1.5)`,
   `object-fit: cover`. Resting opacity `0.001` → animates up on load.
2. **Marquee stack** — `framer-gw8nh1`, `position: absolute; top: 60px`, flex column, centred.
   Contains **five horizontal marquee rows** at heights `190 / 186 / 190 / 186 / 190`px. Each row is a
   `-container` div wrapping a `<section>` with `padding: 10px; display: flex; align-items: center;
   overflow: hidden`. Rows read `opacity: 0` before their entrance animation fires.
   Row text is the wordmark repeated horizontally.
3. **Frog figure** — PNG layered above the marquee rows, centred.

Marquee direction alternates by row (the 190/186 height alternation tracks the two row variants).

## Marquee content elsewhere on the page

Page text shows each label duplicated, which is the standard seamless-loop pattern (content rendered
twice, translated -50%):

`ESSENTIAL` · `LINKS` · `GRAB THE` · `CONTRACT` · `EXPLORE` · `TOKENOMICS`

## Copy (verbatim)

- Title: `Ribbit. Ribbit. Ribbit.`
- `LIL FROG?`
- Body: a short blurb describing the character as living in a swamp with a one-item menu.
- `LIL FROG IS PART OF THE HEDZ COLLECTION  BY MATT FURIE.` (note the double space before "BY")
- `CREDITS`
- Credit rows: `0XFUNGO` / `DESIGN, ILLUSTRATION AND WEBSITE`; `CRYPTO INTEL` / `CTO LEAD`;
  `DEUX HUIT HUIT` / `SUPER DIGITAL DESIGN OFFICE`

## Asset scope decision

Per user direction: **structure and motion are cloned faithfully; illustrations are placeholders.**

The ~40 raster assets are credited illustration work (0xFungo; character from Matt Furie's HEDZ
collection). They are **not** downloaded into this repo. Every image slot is built at its exact
extracted dimensions and object-fit with a clearly-marked placeholder so art can be dropped in later
without touching layout. Functional UI SVGs (arrows, social glyphs) are reproduced as components,
since those are generic chrome rather than authored artwork.
