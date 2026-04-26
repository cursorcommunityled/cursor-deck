# Project context for Claude Code

The full brief lives in [`AGENTS.md`](AGENTS.md) — read that first. It
covers slide anatomy, theme tokens, brand asset usage, and the workflow
for adding a slide.

## Claude-specific notes

- **Stack is intentionally pure HTML + Reveal.js.** Don't introduce
  React, Vite, Next.js, MDX, or any build step unless the user
  explicitly asks. A previous Next.js version of this template was
  scrapped for trapping authors out of raw layout.
- **Editing slides:** use `Edit` on the existing `index.html`. Slides
  are sequential `<section>` blocks in one file. Don't split them into
  separate files.
- **Speaker notes:** `<aside class="notes">…</aside>` inside each
  `<section>`. Visible with `S` during the talk.
- **Two decks:**
  - `template/` — generic starter, **edit this**.
  - `examples/cursor-nexo-security/` — real Cursor × NEXO deck, kept
    verbatim. **Do not edit** unless the user explicitly asks for a
    historical correction.
- **Footer counter:** when you add/remove a slide in `template/`, update
  every `NN / MM` counter in the file. Easy to miss.
- **Light vs dark logos:** match `*_LIGHT.png` to `.slide`, `*_DARK.png`
  to `.slide.dark`. Wrong variant disappears against the background.
- **Run / preview:** `npm run present:template` or
  `npm run present:example` — both serve on `localhost:4321`.

## When in doubt

Read the closest existing slide in `template/index.html` or
`examples/cursor-nexo-security/index.html` and copy its structure
verbatim before editing content. Every layout helper has at least one
working example in those files.
