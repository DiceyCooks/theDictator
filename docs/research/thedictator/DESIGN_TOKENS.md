# Design Tokens — lilfrogeth.com/

Extracted via `getComputedStyle()` at 1440×900. Frequency counts come from a 3,000-element sweep.

> **Reading note.** Framer emits a large volume of structural wrapper nodes that inherit UA defaults
> (`12px sans-serif rgb(0,0,0)`). Those dominate raw frequency counts and are **not** design tokens.
> The table below is the filtered, real palette.

## Color

| Token | Value | Role |
|---|---|---|
| `--ink` | `rgb(0, 0, 0)` | Page ground; also the display-type knockout color |
| `--acid` | `rgb(243, 245, 151)` | Primary brand yellow-green — the giant wordmark |
| `--cyan` | `rgb(68, 204, 255)` | Section background (7 elements) |
| `--green` | `rgb(84, 253, 134)` | Accent |
| `--paper` | `rgb(255, 255, 255)` | Text on dark |
| — | `rgba(0, 0, 0, 0.95)` | Body copy at near-full black |
| — | `rgba(15, 15, 15, 0.8)` | Scrim / overlay panel |
| — | `rgba(255, 255, 255, 0.11)` | Hairline on dark |
| — | `rgba(0, 0, 0, 0.09)` / `0.1` / `0.2` | Layered shadow + scrim steps |

`rgb(0, 0, 238)` appears 32× — that is the **UA default link blue** on unstyled anchors, not a brand
token. Do not carry it into the clone.

### As oklch (for `globals.css`)

```
--ink:   oklch(0    0     0);
--acid:  oklch(0.949 0.146 108.2);
--cyan:  oklch(0.780 0.132 231.5);
--green: oklch(0.878 0.221 148.6);
--paper: oklch(1    0     0);
```

## Typography

**Family:** `Inter, "Inter Placeholder", sans-serif`
`"Inter Placeholder"` is Framer's own font-loading shim — drop it and use `next/font/google` Inter.

`"Times New Roman"` appears on 26 nodes: UA default on unstyled elements, not a design choice.

| Property | Values in use |
|---|---|
| Weights | `400` (body), `500` (dominant UI), `600`, `700` |
| Sizes | `14px` (body/UI, 143×), `16px` (26×) — plus display sizes on the marquee rows |
| Line height | `16.1px` on 14px body (**1.15 ratio**), `14px`, `13.8px`, `12px` |
| Letter spacing | `-0.35px` (on 14px = **-0.025em**), `-0.28px` (-0.02em), `-0.24px`, `-0.12px` |

The tight negative tracking is characteristic and must carry over — Inter at default tracking reads
noticeably looser than the original.

Display type (the wordmark rows) is set far larger than the sampled range; capture per-row at build
time from the fronted tab.

## Spacing

Marquee rows use `padding: 10px`. Row heights alternate `190px` / `186px`.
Hero background plate insets: `top -436.375px`, `left/right -615px`, `bottom -530px` at `scale(1.5)`.

## Motion

- No CSS `@keyframes` are reachable — `document.styleSheets` yields zero keyframe rules.
- Computed `transition` resolves to the `all` shorthand and `animation` to `none` across the sweep,
  confirming motion is applied imperatively by the Framer runtime rather than declared in CSS.
- Timing must therefore be measured from observed state diffs, not read. See `BEHAVIORS.md`.

## Not tokens (guard list)

`12px` / `sans-serif` / `rgb(0,0,0)` on wrapper divs, `rgb(0,0,238)` link blue,
`"Times New Roman"`, `object-fit: fill` defaults. All are UA fallbacks leaking through Framer's
wrapper nodes.
