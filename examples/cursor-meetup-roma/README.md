# Cursor Community Meetup · Roma — deck

Host deck for the first **Cursor Community Meetup in Rome** (Saturday 27 June 2026).
Italian, 21 slides, 4 acts. Pure HTML + Reveal.js, no build step — same stack as the
other decks in this repo.

## Run

```bash
npm run present:meetup-roma   # from repo root → http://localhost:4321
```

`S` = speaker notes · `F` = fullscreen · `O` = overview · arrows = navigate.
Print to PDF: open `http://localhost:4321/?print-pdf`, then Chrome → Print → Save as PDF.

## What's in this folder

| File | What it is |
| --- | --- |
| `index.html` | The 21-slide deck. Four acts: **La terza era · Vibe coding vs AI Engineer · Cursor Community · Ospiti** — closes on a "scan to join & build" CTA. |
| `globe.js` | Self-contained 3D dotted globe for slide 14 (Natural Earth landmask embedded, **zero runtime network**, Canvas 2D, retina + drag + reduced-motion). |
| `qr-build.png` | QR for the closing slide (21) → `hack.vibefy.net/brainstorm/RQUBKMFB`. Decode-verified. |
| `SPEECH.md` | Full Italian speaker script, slide by slide, with timing + delivery tips. The same cues live in each slide's speaker notes (`S`). |
| `pitch-map.html` | Printable one-page **pitch map** to memorize the flow. Open in a browser → Print → A4 landscape. |
| `theme.css` | Cursor theme tokens + this deck's extra components (pipeline, kpi, speaker, globe). |

## Editing notes

- Slides are sequential `<section>` blocks. The footer counter is `NN / 21` — **bump it on every slide** if you add or remove one.
- Dark slides use `*_DARK` logo/cube; light slides use `*_LIGHT`. Wrong variant = invisible.
- Speakers use **monogram initials** (no photos). Swap a `.monogram` for an `<img>` if you get headshots for Sunita / Giacomo / Marco.
- The `~500 ambassador applications/week` figure is an insider number, not a public citation.
- The Cursor Insights data (8.6K lines, 13.8% mega-PRs, 90%+ context, 46×, 81%, 7%→36%) and the SpaceX/Composer points are credited to the **Compile 26 · Michael Truell keynote** (slides 3 and 11). The reported $60B SpaceX acquisition is deliberately omitted — only the official compute partnership is shown.
