---
title: Figures and images
description: Caption and number any content with figure, cross-reference it with a label, and draw placeholder artwork without external image files.
section: learn-typst
order: 6
related: [tables, page-setup, bibliography]
---

`#figure(...)` wraps any content — an image, a drawing, a table — with a caption and an automatic number. It's
what you'd use for "Figure 1: ..." in a paper, and the mechanism is the same regardless of what's inside.

```typ example
#figure(
  rect(width: 4cm, height: 2.5cm, fill: aqua, radius: 4pt),
  caption: [A placeholder rectangle.],
)
```

Typst doesn't need a real picture to show you how figures work — `rect`, `circle`, `line`, and `curve` draw
directly, which is also a fast way to sketch a diagram without leaving your editor.

```typ example
#figure(
  circle(radius: 1.5cm, fill: orange, stroke: 1pt + black),
  caption: [A circle, drawn, not imported.],
)
```

## Real images

`#image("path.png")` loads a file next to your document. If you don't have a file on hand — or want a
self-contained snippet, like the examples on this page — `image(bytes("<svg ...>"))` takes raw SVG source
directly, no file needed:

```typ example
#figure(
  image(bytes("<svg xmlns='http://www.w3.org/2000/svg' width='120' height='80'>
    <rect width='120' height='80' fill='#eef'/>
    <circle cx='60' cy='40' r='28' fill='#36c'/>
  </svg>")),
  caption: [An image loaded from inline SVG source.],
)
```

In your own documents you'll almost always use a file path instead; `bytes(...)` is mainly useful for generating
an image from data at compile time.

## Cross-references

Label a figure with `<name>` right after it, then refer to it anywhere with `@name`. Typst fills in "Figure 3" (or
whatever the right number is) automatically, and keeps it correct if you reorder figures later.

```typ example
#figure(
  rect(width: 3cm, height: 2cm, fill: aqua),
  caption: [The setup.],
) <setup>

As shown in @setup, the apparatus fits on a standard bench.
```

## Numbering style and supplement

`#set figure(numbering: "1")` is the default; switch to `"I"` for Roman numerals or `"a"` for letters the same way
you would for [headings](/show-rules). Tables get their own counter automatically when you set `kind: table` —
useful if you want a table captioned as "Table 1" rather than folded into the figure numbering:

```typ example
#figure(
  rect(width: 3cm, height: 1.5cm, fill: green),
  caption: [Counted separately from figures.],
  kind: table,
  supplement: [Table],
)
```

## Placement

By default a figure stays exactly where you put it in the text. `placement: top` (or `bottom`) lets it float to
the top or bottom of the page instead, the way LaTeX's `[t]`/`[b]` specifiers do:

```typ example
#figure(
  rect(width: 3cm, height: 2cm, fill: aqua),
  caption: [Floats to the top of the page.],
  placement: top,
)

Body text that the figure floats above, regardless of where this paragraph sits in the source.
```

## Try it yourself

1. Make a figure from a `rect` or `circle`, give it a caption, label it, and reference it with `@label` in a
   sentence.
2. Build one figure from `image(bytes("<svg ...>"))` with your own small shape.
3. Set `kind: table` and `supplement: [Table]` on a figure wrapping a rectangle, and compare the caption to a
   normal figure's.

## Check your understanding

```quiz
How do you refer to "Figure 2" without writing the number yourself?
- [x] Label the figure with `<name>` and reference it with `@name`
- [ ] Count the figures above it manually and type the number
- [ ] Figures can't be cross-referenced in Typst
> Typst tracks the figure counter and fills in the right number at `@name`, updating automatically if figures move.
```

```quiz
How do you insert an image without a separate image file, for a self-contained example?
- [ ] You can't; `image()` always requires a file path
- [x] `image(bytes("<svg ...>"))` with inline SVG source
- [ ] Draw it with `#table()` instead
> `bytes(...)` lets `image()` read raw image data — SVG source included — directly from a string.
```

## What to remember

- `#figure(content, caption: [...])` adds a caption and automatic numbering to anything, not just images.
- `rect`, `circle`, `line`, and `curve` draw directly — useful for diagrams without external files.
- `image(bytes("<svg ...>"))` loads inline SVG source when there's no file to reference.
- Label with `<name>`, reference with `@name`; the number updates automatically if order changes.
- `placement: top`/`bottom` lets a figure float; `kind: table` gives it its own counter, separate from figures.
