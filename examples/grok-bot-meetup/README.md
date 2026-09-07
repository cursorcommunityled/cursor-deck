# Grok Bot Meetup · Malta — deck

Host deck for the **Grok Bot Meetup Malta**, Thursday 17 September 2026, 18:00–21:30,
at Coffee Circus Porto (149 Triq D'Argens, Ta' Xbiex). Host: Nick Mascaro.
English, 10 slides. Pure HTML + Reveal.js 5.1.0, no build step — same stack as the
other decks in this repo.

## Visual system

Grok Bot brand (Figma thumbnails + Luma Amsterdam cover): solid black `#000`, white type,
secondary `#777`, blob accents teal / pink / orange / blue / green. Chrome uses the official
Grok Bot circle mark (`assets/grok-mark-128.png`) + "Grok Bot" wordmark — not Cursor lockups.

Blob art in `assets/blobs/` is cut with alpha from the official family sheet
(`assets/blob-family-sheet.png`, same art as `assets/cover-ref.png`). `white.png` is the family's
circle rebuilt whole; `blue.png` is cut on its right edge and `green.png` on right + bottom in the
source art, so those must bleed off the slide. The small accent "bot dots" in cards and pipeline
pills are a CSS mask traced from `assets/grok-mark-512.png`.

## Run

```bash
npm run present:grok-bot   # from repo root → http://localhost:4321
```

`S` = speaker notes · `F` = fullscreen · `O` = overview · arrows = navigate.
Print to PDF: open `http://localhost:4321/?print-pdf`, then Chrome → Print → Save as PDF.

## Slides

| # | Slide | Layout |
| --- | --- | --- |
| 01 | Cover | black · title-xl · blob family |
| 02 | Tonight, in five parts | black · row-step agenda |
| 03 | What is Grok Bot? | black · quoted definition + callout |
| 04 | Always-on teammates | black · row-3 cards |
| 05 | What real work looks like | black · row-4 cards |
| 06 | One Bot is useful. A group chat of them is a team. | black · pipeline + quote |
| 07 | Routines: show it once, it repeats | black · row-3 cards |
| 08 | Why tonight | black · punchy headline + orange blob |
| 09 | How the evening runs | black · 2 × row-3 left-stripe cards |
| 10 | Give a Bot a job. Tonight. | black · closer CTA + blob family → luma.com/grok-malta · x.ai/bot |

## What's in this folder

| File | What it is |
| --- | --- |
| `index.html` | The 10-slide deck. Speaker notes live in each slide's `<aside class="notes">`. |
| `theme.css` | Grok Bot theme: black / `#777` tokens, blob accent cycling, float + rise-in motion, bot-dot mask. |
| `assets/` | `grok-mark-128.png` / `grok-mark-512.png` (official mark), `blobs/*.png` (alpha cutouts used on slides 1, 8, 10), reference art (`cover-ref.png`, `blob-family-sheet.png`, `meetup-malta-square-ref.png`). The top-level `blob-*.png`, `mark-crop.png` and `cover-amsterdam-style.png` are superseded crops, no longer referenced. |
| `brand/` | Symlink → `../../cursor-brand-assets`. Not used by this deck. |

## Sources

- Product wording is quoted from xAI's launch post **"Introducing Grok Bot"** (x.ai/news, 11 August 2026)
  and the product page **x.ai/bot**. The "real work" examples on slide 5 are the internal uses xAI
  described at launch (sales research, CRM upkeep, invoice processing from Gmail, bug reproduction).
- Event details (date, time, venue, format, ticket types) come from the Luma page **luma.com/grok-malta**.
- No statistics, prices, or seat counts are printed on the slides. Availability and pricing change;
  the speaker notes point people to x.ai/bot instead of quoting numbers.

## Editing notes

- Slides are sequential `<section>` blocks. The footer counter is `NN / 10` — **bump it on every slide**
  if you add or remove one.
- Every slide is black. Slides 1, 8 and 10 carry `has-blobs`; blob positions are inline on each `<img class="blob">`
  (`--dur / --delay / --amp / --rot` drive the float).
- Slide 9 deliberately has no clock times. Put the real run-of-show in the speaker notes so the deck
  doesn't go stale if timings shift.
- No QR yet. If you want one on the closer, generate it for `luma.com/grok-malta`, drop it in this folder,
  and reuse the `.qr-card` block from `examples/cursor-meetup-roma/index.html` slide 22.
