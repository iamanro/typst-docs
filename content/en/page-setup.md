---
title: Set up the page
description: Paper size, margins, numbering, headers and footers, and columns — all configured with one set rule.
section: learn-typst
order: 4
related: [set-rules, tables, figures-and-images]
---

Page layout is just another [set rule](/set-rules), on the `page` element. Everything from paper size to running
headers goes through `#set page(...)`, usually once near the top of the document. (The examples on this page are
rendered small, so you'll see the margin and header effects rather than a full A4 sheet — in a real document
you'd typically also choose `paper: "a4"` or `"us-letter"`.)

## Margins

```typ example
#set page(margin: 1cm)

Text with a 1cm margin on every side.
```

Margins can be set per side instead of uniformly, with `x`/`y` for the two axes or `left`/`right`/`top`/`bottom`
for full control:

```typ example
#set page(margin: (x: 1.5cm, top: 2cm, bottom: 1cm))

Wider side margins, extra room at the top.
```

## Paper size

`paper: "a4"`, `"us-letter"`, `"a5"` and many more presets are built in — see the
[Typst reference](https://typst.app/docs/reference/) for the full list. For a custom size, set `width` and
`height` directly instead of `paper`.

```typ
#set page(paper: "a4")
#set page(width: 21cm, height: 29.7cm)   // equivalent to a4
```

## Page numbering

`numbering` takes a pattern string, the same kind used for headings and figures: `"1"` for plain numbers, `"1 /
1"` for "page / total", `"i"` for lowercase Roman numerals.

```typ example
#set page(numbering: "1 / 1")

The page number appears automatically at the bottom.
```

## Headers and footers

`header` and `footer` take content, inserted on every page. Use `context` if the content needs to know something
page-dependent, like the current page number via `counter(page).display()`.

```typ example
#set page(
  header: [_Draft — do not distribute_],
  footer: context [Page #counter(page).display()],
)

Body text here; the header and footer repeat on every page.
```

## Columns

`columns: 2` splits the page body into side-by-side columns, useful for conference papers. Content flows into the
first column and continues into the next automatically.

```typ example
#set page(columns: 2)
#set par(justify: true)

Short multi-column text flows automatically from one column into the next once the first one fills up, the same
way it would in a two-column journal layout.
```

## Landscape and one-off pages

`flipped: true` swaps width and height for a landscape orientation. Because `page` is a set rule, you can change
it again partway through the document — handy for a single landscape table in an otherwise portrait paper — and
it only affects pages created from that point.

```typ
#set page(flipped: true)

A wide table or figure goes here.

#set page(flipped: false)

Back to portrait for the rest of the document.
```

## Try it yourself

1. Set asymmetric margins (wider on the left than the right) and confirm the effect in an example.
2. Add a footer that shows "Page N" using `counter(page).display()` inside `context`.
3. Try `columns: 2` with a few sentences of text and see where the column break falls.

## Check your understanding

```quiz
How do you make a footer show the current page number?
- [ ] `#set page(footer: "page number")`
- [x] `footer: context [Page #counter(page).display()]`
- [ ] Typst adds page numbers automatically; footer can't be customized
> `context` lets the footer content query page-dependent state like the page counter at the point it's placed.
```

```quiz
What does `#set page(flipped: true)` do?
- [ ] Mirrors the text horizontally
- [x] Swaps width and height for landscape orientation
- [ ] Flips to the next page immediately
> `flipped` exchanges the page's width and height, which is how you get a landscape page.
```

## What to remember

- Page layout is configured with `#set page(...)`, usually once near the top of the document.
- `margin` accepts a single length, or `(x:, y:)` / per-side keys for asymmetric margins.
- `numbering` uses the same pattern strings as headings and figures; `header`/`footer` take content, with
  `context` for page-dependent values like `counter(page)`.
- `columns: n` splits the page into side-by-side columns that fill automatically.
- `#set page(...)` can be issued again partway through the document to change layout for what follows, e.g. a
  landscape section.
