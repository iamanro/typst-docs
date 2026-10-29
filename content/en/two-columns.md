---
title: Set a document in two columns
description: Switch the body text to two (or more) columns, force a column break, and still span a title or figure across the full width.
section: typst-tips
order: 3
related: [page-numbers, landscape-pages, line-spacing]
---

Set `columns` on the page, and every paragraph after it flows into balanced columns automatically:

```typ example
#set page(columns: 2)

= Results
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
```

Typst fills the first column, then starts the second; it reflows both whenever you edit the text, so you never balance columns by hand.

## Forcing a column break

Use `#colbreak()` to push the following content to the next column, the same way `#pagebreak()` moves to a new page:

```typ example
#set page(columns: 2)

This stays in the first column.

#colbreak()

This starts at the top of the second column, even though there was room left above.
```

## Spanning the full width

A title or a wide figure often needs to ignore the columns. Wrap it in `#place(top + center, scope: "parent", float: true)[..]` to float it across the whole page width:

```typ example
#set page(columns: 2)
= Results
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#place(top + center, scope: "parent", float: true)[
  #rect(width: 100%, height: 2cm, fill: luma(230))[Figure spanning both columns]
]

More text continues below the wide figure, still in two columns.
```

`scope: "parent"` tells Typst to measure against the full page instead of the current column; `float: true` lets the surrounding text flow around it instead of overlapping it.

## Pitfalls

- `columns` on the page affects the whole document from that point on. For a one-off multi-column block inside an otherwise single-column page, use the standalone `#columns(2)[...]` function instead.
- Very short sections can look lopsided in two columns — Typst balances column heights, but a single short paragraph may still end up alone in one column.
- For a wide table, see [landscape pages](/landscape-pages) if columns alone aren't enough room.
