# Page Topology — lilfrogeth.com/

- **Source URL:** https://lilfrogeth.com/
- **site-key:** `lilfrogeth-com-629a1bd8`
- **page-key:** `root-8a5edab2`
- **Destination route:** `/` (`src/app/page.tsx` — fresh-template root clone)
- **Captured at:** 1440×900 viewport (heights in the table below are from that width)
- **Total scroll height:** 20,203px (clean load at 1440; see RESPONSIVE.md for other widths)

## Platform

Built in **Framer**. Generated class names (`framer-o0mzm0`, `framer-ab08lb`, …) are build-hash
derived and carry no semantics — do **not** mirror them. All assets are served from
`framerusercontent.com`. Runtime is `script_main.W6MG7EJM.mjs`. Analytics: Fathom + Framer events.

Consequences for the clone:
- No authored stylesheet is readable (`document.styleSheets` exposes no keyframes). All motion is
  JS-driven from the Framer runtime, so behavior must be captured as **state diffs**, not read from CSS.
- Framer gates the hero's animations on visibility, so a backgrounded tab returns pre-animation
  values. Note this does **not** mean sections animate: measured, the blocks are entirely static
  and only the hero and nav move. See BEHAVIORS.md.

## Scroll container

`<html class="lenis">` — **Lenis** smooth scroll is active page-wide. Native scrolling feels
materially different; the clone must install Lenis or the difference is immediately obvious.

Root wrapper is a single `<header class="framer-o0mzm0">` spanning the full 20,168px. Its 15 direct
children are the page blocks below.

## Block map (document order)

| # | class | top | height | imgs | svgs | working name |
|---|---|---|---|---|---|---|
| 0 | `framer-ab08lb` | 0 | 100vh | 4 | 16 | **Hero** — marquee stack + figure |
| 11 | `framer-1oryf6n` | — | 100 | 0 | 0 | Spacer — **mobile-only** (<810px) |
| 12 | `framer-1h5f3tx` | — | 220 | 0 | 0 | Spacer — **mobile-only** (<810px) |
| 1 | `framer-18hopws` | 1220 | 1200 | 7 | 0 | Panel A |
| 2 | `framer-tgbvc8` | 2420 | 100vh | 6 | 0 | Panel B — also viewport-height |
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

> **Corrected.** Blocks 11 and 12 are spacers between the hero and block 1. They are
> **mobile-only** — absent from the desktop DOM entirely, rendering at 100px and 220px below the
> 810px breakpoint. An earlier revision of this file called them desktop-only; that reading came
> from a tab that had loaded narrow and then been resized wide, leaving stale mobile nodes behind.
> See `RESPONSIVE.md`.

## Fixed overlays

Three elements are `position: fixed` and sit above the scrolling content:

| class | role |
|---|---|
| `framer-1i93ave-container` | full-viewport grain texture, `pointer-events: none`, z 10 |
| `framer-jaq4ea-container` | top nav — 717×51, centred at top 10px, marquee + 133×17 logotype, z 10 |
| `framer-1t24yw8` | bottom info bar — full width × 64px, z 9 |

These must be siblings of the scroll content in the clone, not children of any section.

## Hero anatomy (block 0)

Three stacked layers inside a **100vh** `overflow: hidden` box (it tracks viewport height at every
breakpoint — the 900px seen at 1440 is simply that viewport's height, not a fixed value):

1. **Background plate** — `framer-wzyyrq`, absolutely positioned and inset negative on all sides
   (`top: -436px; left/right: -615px; bottom: -530px`), sized 2655×1866, `transform: scale(1.5)`,
   `object-fit: cover`. Resting opacity `0.001` → animates up on load.
2. **Marquee stack** — `framer-gw8nh1`, `position: absolute; top: 60px`, flex column, centred.
   Contains **six horizontal marquee rows** with heights alternating `190 / 186`px. Each row is a
   `-container` div wrapping a `<section>` with `padding: 10px; display: flex; align-items: center;
   overflow: hidden`, and the animated element is the `<ul>` inside it.
   Row content is the wordmark — **SVG vector artwork**, not typeset text — repeated horizontally.
   Only the background plate fades in; the rows themselves do not.
3. **Frog figure** — PNG layered above the marquee rows, centred.

Marquee direction alternates by row (the 190/186 height alternation tracks the two row variants).

## The other marquee is the nav

These labels are **not** per-section content — they live in the fixed top nav overlay
(`framer-jaq4ea-container`). Each is duplicated for the seamless loop:

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
