# AGENTS.md — `cursor-deck`

A brief for AI coding agents (Cursor, Codex, Claude Code, Copilot,
Windsurf, Aider, Devin, Jules, Junie, Zed, …). Read this before editing.

If you only read one section: jump to **[Adding a slide](#adding-a-slide)**.

## What this repo is

A Cursor-branded Reveal.js deck template. Pure HTML + CSS, no build step,
no framework. A starter template plus example decks:

- `template/` — generic 10-slide starter, fork-this.
- `examples/cursor-nexo-security/` — the real Cursor × Fundación NEXO
  Sesión 03 deck (April 2026). Reference only — **do not edit**.
- `examples/cursor-model-training/` — tutorial example (how model training works). OK to edit or fork.

Each deck's `brand/` folder symlinks to `cursor-brand-assets/`, and all use the same theme tokens.

## Run / preview

```bash
npm run present:template   # → http://localhost:4321
npm run present:example
npm run present:example-training
```

No `npm install` needed. `serve` is fetched on demand via `npx`.

## Stack — and what NOT to introduce

The stack is intentionally minimal:

- **Reveal.js 5.1.0** (CDN) — slide runtime, keyboard nav, speaker view, PDF export
- **Inter + JetBrains Mono** (Google Fonts) — typography
- **`theme.css`** — every visual token + component class
- **One `index.html` per deck** — slides as sequential `<section>` blocks

**Do not** introduce React, Next.js, Vite, TypeScript, MDX, build steps,
bundlers, or PostCSS unless the user explicitly asks. The current
zero-dependency setup is a feature, not an oversight. A previous
`cursor-deck-template` (Next.js + slides.ts) was scrapped because it
locked authors out of raw HTML layout — don't recreate it.

## Slide anatomy

Every slide is a `<section>` containing one `.slide` div:

```html
<section>
  <div class="slide">                                 <!-- or .slide.dark -->
    <div class="chrome">                              <!-- top bar: logo + eyebrow -->
      <div class="brand-lockup">
        <img class="logo" src="brand/General Logos/Lockup Horizontal/PNG/LOCKUP_HORIZONTAL_2D_LIGHT.png" alt="Cursor">
      </div>
      <div class="eyebrow">Section name</div>
    </div>

    <!-- slide body goes here -->

    <div class="footer">
      <span class="left">Your Org · Session 00 · Topic</span>
      <span>NN / MM</span>                            <!-- counter -->
    </div>
  </div>
  <aside class="notes">Speaker notes for the S key.</aside>
</section>
```

Three rules every slide must follow:

1. **Chrome present** — top `.chrome` and bottom `.footer` on every slide.
   Only the `.dark` title and closer slides skip the footer (they have
   their own bottom block).
2. **Light vs dark** — `.slide` for light slides (cream background),
   `.slide.dark` for dark slides (ink background). The Cursor logo and
   cube watermark must match: `*_LIGHT.png` on light, `*_DARK.png` on dark.
3. **Footer counter** — `NN / MM` where `MM` = total slide count. **When
   you add or remove a slide, update the counter on every following
   slide.**

## Adding a slide

1. Open the deck's `index.html`.
2. Decide the position. Slides are linear `<section>` blocks; insert
   yours between two existing ones.
3. **Copy the closest existing slide** that matches the layout you want
   (megastat, comparison table, code block, cards grid, etc.). Don't
   write a slide from scratch — every existing slide is a working
   example with the right chrome.
4. Edit the content inside `.slide`. Keep the chrome unchanged.
5. **Bump the footer counter** on your new slide AND on every following
   slide. Also update the `MM` total on every slide.
6. Add speaker notes inside `<aside class="notes">…</aside>`.

If the user describes a slide and you're not sure which layout to use,
suggest one from the table below and ask before generating.

## Layout helpers (when to use what)

| Helper class       | Use when                                                | Source slide                              |
| ------------------ | ------------------------------------------------------- | ----------------------------------------- |
| `.title-xl`        | Cover / closer hero text                                | `template/index.html` slide 1             |
| `.title-l`         | Standard slide headline                                 | most slides                               |
| `.lede`            | Subtitle / one-liner under headline                     | most slides                               |
| `.eyebrow`         | Small uppercase label (chrome + section dividers)       | every slide                               |
| `.row-2/3/4`       | Equal-width columns                                     | cards grid, stats grid                    |
| `.row-step`        | Numbered list with title + subtitle                     | agenda slide                              |
| `.card`            | Top-stripe card with `.num` + `.name` + `.desc`         | "three things" slide                      |
| `.card.left-stripe`| Side-stripe variant for tighter rows                    | dense lists                               |
| `.stat`            | Centered "big number + label" tile                      | stats slide                               |
| `.megastat`        | One enormous number + headline (240px digit)            | megastat slide                            |
| `.code` + `.titlebar` | Dark code block with filename header                 | code slide                                |
| `.cmp`             | Before/after table                                      | comparison slide                          |
| `.callout`         | Highlighted side-bordered note                          | comparison slide                          |
| `.qr-card`         | QR code block (bottom-right of closing slides)          | NEXO deck slide 22                        |
| `.cube-wm`         | Faded Cursor cube watermark on dark slides              | title + closer                            |
| `.partner-logo`    | Partner mark in bottom-right (co-branded decks)         | NEXO deck slide 1                         |

When you need an example, **read the matching source slide** in
`template/index.html` or `examples/cursor-nexo-security/index.html` and
copy the structure verbatim before editing the content.

## Theme tokens

All colors and fonts live in `theme.css` under `:root`. Reference them
via `var(--paper)`, never hardcode hex.

| Token             | Value     | Use                                  |
| ----------------- | --------- | ------------------------------------ |
| `--paper`         | `#F7F7F4` | Light background                     |
| `--ink`           | `#14120B` | Dark background + main text          |
| `--accent`        | `#5C5A52` | Warm grey accent (rules, top stripes)|
| `--line`          | `#E6E5DD` | Borders, dividers                    |
| `--muted`         | `#6B6960` | Secondary text                       |
| `--subtle`        | `#9E9C90` | Tertiary text (footer, captions)     |
| `--font-sans`     | Inter     | UI text                              |
| `--font-mono`     | JetBrains Mono | Code, numbers                  |

If the user asks for a different palette: change the four tokens in
`:root` — every component retints automatically.

## Cursor brand assets

`cursor-brand-assets/` is the source of truth (symlinked into each deck
as `brand/`). Two rules:

1. **Match light/dark variant to slide background.** `*_LIGHT.png` on
   `.slide`, `*_DARK.png` on `.slide.dark`. Wrong variant = invisible
   logo.
2. **Don't recolor or distort.** No filters except the documented
   `invert(1)` used on partner co-brand marks.

Folder map:

```
cursor-brand-assets/
├── General Logos/
│   ├── Lockup Horizontal/PNG/    ← chrome top-left, every slide
│   ├── Cube/PNG/                  ← watermark on dark slides
│   ├── Wordmark/PNG/              ← rare, when you want type-only
│   └── Lockup Vertical/PNG/       ← rare, when horizontal won't fit
├── App Icons/                     ← rare, for icon contexts
└── Avatars/                       ← speaker portraits
```

For everyday slides, you only need `General Logos/Lockup Horizontal/PNG/`.

## Co-branding (Cursor × Partner)

The template ships without a partner. To co-brand:

1. Drop the partner logo at `template/partner.png` (transparent,
   ~600×600).
2. Uncomment the `<span class="lockup-x">×</span>` and
   `<img class="lockup-partner">` lines in the chrome of every slide.
3. Optionally add `<img class="partner-corner" src="partner.png">` for
   a faint mark in the slide corners.

See `examples/cursor-nexo-security/index.html` for the full pattern.

## PDF export

```
http://localhost:4321/?print-pdf
```

Open in Chrome → File → Print → Save as PDF. Layout: Landscape · Margins:
None · Background graphics: ON.

## Common mistakes to avoid

- ❌ Stripping the chrome (logo + eyebrow + footer) "for cleanliness".
  It's brand-required on every slide.
- ❌ Hardcoding colors. Always `var(--…)`.
- ❌ Forgetting to bump the footer counter when adding/removing slides.
- ❌ Using the dark logo on a light slide (or vice versa).
- ❌ Adding a build step. There is none. There should be none.
- ❌ Editing `examples/cursor-nexo-security/` — that deck is preserved
  as a historical reference. Edit `template/` only.

## Where to look for more

- `README.md` — human-facing intro
- `CLAUDE.md` — project hints for Claude Code specifically
- `.cursor/rules/` — scoped rules that fire automatically in Cursor
  (`slide-authoring.mdc`, `theme-tokens.mdc`, `cursor-brand.mdc`,
  `adding-a-slide.mdc`, `deck-conventions.mdc`)
- `.github/copilot-instructions.md` — repo-level Copilot brief
- `template/README.md` — deck-specific notes for the generic starter
- `examples/cursor-nexo-security/README.md` — context for the NEXO deck
