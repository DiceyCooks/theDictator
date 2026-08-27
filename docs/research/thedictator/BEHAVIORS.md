# Behaviors — lilfrogeth.com/

## Extraction gotcha (read first)

Framer gates entrance animations on tab/element visibility. In a **backgrounded** tab the runtime
never fires them, so `getComputedStyle()` returns **pre-animation** values:

| Element | Backgrounded tab | Fronted tab |
|---|---|---|
| Hero background plate `framer-wzyyrq` | `opacity: 0.001` | fully visible |
| Hero marquee rows (all five `<section>`) | `opacity: 0` | fully visible |

Every state capture must happen in a **fronted** tab. Values pulled from a background tab describe
the animation's start frame, not its resting state. This alone would have produced an invisible hero.

## Global: Lenis smooth scroll

`<html class="lenis">` — Lenis is active page-wide, wrapping the full 20,168px document.

Implementation for the clone: install `lenis`, initialise in a client component mounted in the root
layout, and drive it from `requestAnimationFrame`. Native scroll is visibly different in weight and
easing; this is the first thing a viewer notices if it is missing.

## Hero: layered entrance

Three layers animate in on load, not on scroll:

1. **Background plate** — `opacity 0.001 → 1` over 800ms, held at `transform: scale(1.5)`. The
   oversized negative inset plus scale means the plate is cropped well beyond the viewport on every
   side, so it can move without exposing an edge.
2. **Marquee rows** — six rows (see measured table below).
3. **Frog figure** — PNG above the rows.

## Hero: marquee rows — MEASURED

Six horizontally-scrolling rows in a flex column starting at `top: 60px`.
Row heights alternate `190 / 186` px.

**Interaction model: time-driven, not scroll-driven.** Confirmed via `document.getAnimations()`.
Seven animations run on the hero: one entrance plus one per row.

> Measurement trap: each row is `div > section > div > ul`. The animation targets the **`<ul>`**.
> Sampling `section.firstElementChild` (the intermediate `div`) returns a constant `±1.3px`
> centering offset that never changes with time or scroll, which reads as "no animation" and
> invites the wrong conclusion. Sample the `ul`.

| Property | Value |
|---|---|
| Keyframes | `translateX(0px)` → `translateX(3174px)` |
| Odd rows | `translateX(0px)` → `translateX(-3174px)` |
| Duration | `90685.71ms` |
| Iterations | `Infinity` |
| Easing | `linear` |
| Derived speed | **35.0 px/s** |

Direction alternates between adjacent rows. `3174px` is one content-run width — the track holds
repeated runs and shifts by exactly one run, which is what makes the loop seamless.

Clone implementation: render the run twice, animate `translateX` by exactly one run width, and set
`duration = runWidth / 35` seconds so speed is preserved at any content width. Use `linear` and
`iteration-count: infinite`.

## Hero: entrance

| Property | Value |
|---|---|
| Target | `DIV.framer-chujfk` (background plate wrapper) |
| Keyframes | `opacity: 0.001` → `opacity: 1` |
| Duration | `800ms` |
| Easing | `cubic-bezier(0.11, 0.82, 0.26, 0.95)` |
| Iterations | `1` |

The `0.001` start (rather than `0`) keeps the layer composited so the browser does not discard and
re-rasterise it on fade-in.

## Page-wide marquee bands

The same duplicated-content pattern appears throughout. Each label renders twice in the text layer:

`ESSENTIAL` · `LINKS` · `GRAB THE` · `CONTRACT` · `EXPLORE` · `TOKENOMICS`

## Fixed overlays

Three `position: fixed` elements sit above all scrolling content:

| class | notes |
|---|---|
| `framer-1i93ave-container` | |
| `framer-jaq4ea-container` | |
| `framer-1t24yw8` | not a `-container` wrapper — a direct fixed element |

In the clone these must be siblings of the scroll content, never nested inside a section, or
transformed ancestors will break `position: fixed`.

## Section entrance animations — THERE ARE NONE

An earlier revision of this file asserted that every block below the hero carried a
visibility-gated entrance. **That was wrong.** Measured directly:

- `document.getAnimations()` filtered to each block returns `[]`.
- Blocks report `opacity: 1` and `transform: none` at every scroll position.
- The document only ever holds **8** animations, and all 8 belong to the hero and nav:
  6 hero marquee rows + 1 hero fade + 1 nav marquee.

The blocks are static. The page's entire motion budget is the hero, the nav marquee, and Lenis.

The original claim came from assuming Framer's usual scroll-reveal pattern rather than measuring
it, and it survived a first pass because a backgrounded tab returns `opacity: 0` on the hero,
which looked like evidence of gating everywhere.

## Responsive

Resolved — see `RESPONSIVE.md`. Single breakpoint at **810px**. The two spacers are
**mobile-only**: absent from the desktop DOM entirely, rendering at 100px and 220px below 810.

Measure each breakpoint on a **clean page load**. Resizing alone leaves stale nodes from the
previous variant in the DOM and yields contradictory readings.

## Still to capture

- [x] Per-row marquee speed and direction (6 hero rows) — 35.0 px/s, alternating, linear, infinite
- [x] Entrance timing/easing per block — **none exist**; blocks are static
- [x] Identity and behavior of the 3 fixed overlays — see RESPONSIVE.md
- [ ] Hover states across links, buttons and credit rows
- [x] Breakpoints — single switch at **810px**; see RESPONSIVE.md
- [x] Wordmark is **SVG vector artwork** (`<path>`), not typeset text — no font size applies
