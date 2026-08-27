# Hero images — drop them here

Put the four hero files in this folder using these exact names. Once they're
here, the `ArtSlot` placeholders in `Hero.tsx` get swapped for Next.js `<Image>`
elements — the boxes already hold the measured position and fit, so nothing
shifts when the art lands.

| Filename | Supply at | Format | Transparent? |
|---|---|---|---|
| `hero-background.webp` | 4800 × 2880 | WebP or JPEG | no |
| `hero-band.webp` | 3840 × 410 | WebP or PNG | **yes** |
| `hero-figure.webp` | 1200 × 1400 | WebP or PNG | **yes** |
| `hero-dot.png` | 64 × 64 | PNG | yes — or skip, see below |

## Notes per file

**`hero-background.webp`** — scaled 1.5x and inset negatively on all sides, so
only the **centre ~40% x 33%** is ever on screen. Compose the subject dead
centre; everything outside that is bleed you will never see. Renders at
4703 x 2885 on a 1920 viewport, which is why the supply size is large.

**`hero-band.webp`** — a full-width strip across the lower third, spanning edge
to edge at any viewport. Make it horizontally tileable or safe to stretch: a
horizon, a torn edge, a strip of ground.

**`hero-figure.webp`** — needs real alpha. Uses `object-fit: contain`, so its
aspect ratio decides how large it actually appears. A tall source (around
0.72 width:height) fills the box height; a squarer image will read smaller.

**`hero-dot.png`** — a 13 x 11 detail. Not worth an asset; ask and it becomes a
CSS circle instead, no file needed.

## Not needed

The wordmark is live text (`THEDICTATOR`, Inter Black) set in `Hero.tsx`. It
scales and reflows on its own and the marquee measures it to hold 35 px/s.
Only supply SVG lettering if you want custom letterforms.

No animation assets are needed. All hero motion is already built: the background
fade (800ms) and the six marquee rows (35 px/s, alternating). Nothing else in
the hero moves.

## Other formats

PNG and JPEG work fine if WebP is inconvenient — just tell me the filenames you
used and I'll wire those instead.
