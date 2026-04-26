# Generic Deck Template

Fork-this starter. 10 representative slides covering every layout the theme
ships with: title, agenda, section divider, bullets, megastat, code block,
comparison table, cards grid, pull-quote, closing.

## Run it

```bash
# from the repo root
npm run present:template
# → http://localhost:4321
```

## Adapt it

1. **Open `index.html`.** Each slide is a `<section>`.
2. **Replace `Your Talk Title`, `Your Name`, `Your Org`, `Session 00 · Topic`** — search & replace.
3. **Edit `.eyebrow`, `.title-l`, `.lede`, `.row-step`, etc.** — see `theme.css` for every helper class.
4. **Add a slide:** copy any `<section>...</section>` block, paste it where you want, edit the content, bump the footer counter.
5. **Delete a slide:** remove its `<section>` block.

## Add a co-brand (Cursor × Partner)

The title slide and closer have a commented-out partner lockup:

```html
<!-- <span class="lockup-x" aria-hidden="true">×</span>
<img class="lockup-partner" src="partner.png" alt="Partner"> -->
```

Drop your partner's logo at `template/partner.png` (transparent PNG, ~600×600
works well — the `.lockup-partner` class crops it for the wordmark) and
uncomment those lines on every slide where you want the co-brand visible.

For a richer co-brand pattern (partner mark in the bottom-right corner of
every slide), look at how `examples/cursor-nexo-security/index.html` uses
`<img class="partner-logo">` and `<img class="partner-corner">`.

## Change the colors

All tokens live at the top of `theme.css`:

```css
:root {
  --ink:    #14120B;
  --paper:  #F7F7F4;
  --accent: #5C5A52;
  /* … */
}
```

Edit those four and the whole deck retints.
