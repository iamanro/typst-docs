---
title: Turn a page sideways
description: Flip one page to landscape for a wide table or figure, or set the whole document to a landscape paper size.
section: typst-tips
order: 9
related: [two-columns, page-numbers, appendix]
---

Add `flipped: true` to `#set page(..)`. It swaps width and height, so the page turns 90 degrees without you recalculating dimensions:

```typ example
= Portrait section
Normal page.
#pagebreak()
#set page(flipped: true)
= Wide table
This page is flipped to landscape, useful for a wide table.
#pagebreak()
#set page(flipped: false)
Back to portrait.
```

`flipped` only changes orientation from the point it's set, so a single wide table or figure can sit on its own landscape page in an otherwise portrait document — flip before it, flip back after.

## A fully landscape document

If the whole paper should be landscape, set `flipped: true` once at the top, alongside your paper size:

```typ example
#set page(paper: "a4", flipped: true, margin: 2cm)
= Wide figure
This whole document is in landscape A4.
```

`paper: "a4"` (or `"us-letter"`, etc.) picks the standard dimensions; `flipped: true` then swaps them to landscape.

## Pitfalls

- `flipped` swaps whatever `width`/`height` or `paper` is currently set — set the paper size first, or set both together, so you flip the size you expect.
- Page numbers and margins carry over as-is; a landscape page keeps the same `margin` values, which can look unbalanced on a much wider page — adjust `margin` alongside `flipped` if needed.
- Combining `flipped: true` with multiple [columns](/two-columns) works, but on a single wide landscape page you often don't need columns at all.
