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

## Section entrance animations

Every block below the hero carries a visibility-gated entrance. Mechanism is Framer's runtime
IntersectionObserver. Per-section capture procedure:

1. Front the tab.
2. Scroll so the section is just below the fold; capture computed styles → **state A**.
3. Scroll it into view; wait for settle; capture again → **state B**.
4. The diff is the specification. Record trigger threshold, both value sets, duration and easing.

## Responsive

Blocks 11 and 12 (the 100px and 220px spacers between hero and block 1) carry
`hidden-1rml4m2 hidden-174vl6w`, Framer's breakpoint-visibility classes — they are shown at some
widths and hidden at others. Resolve the exact widths by sweeping 1440 / 768 / 390 and observing
which of the two disappears at which width.

## Still to capture

- [x] Per-row marquee speed and direction (6 hero rows) — 35.0 px/s, alternating, linear, infinite
- [ ] Entrance timing/easing per block (14 blocks below hero)
- [ ] Identity and behavior of the 3 fixed overlays
- [ ] Hover states across links, buttons and credit rows
- [ ] Breakpoints at 768 and 390, and which blocks restructure
- [x] Wordmark is **SVG vector artwork** (`<path>`), not typeset text — no font size applies
