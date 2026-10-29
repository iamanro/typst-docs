---
title: Figures and references
description: Wrapping content in a figure with a caption, labeling it, and cross-referencing it with @.
section: tutorial
order: 4
related: [tutorial/math, tutorial/citations, figures-and-images]
---

A figure in Typst is any piece of content — an image, a drawn shape, a
table — wrapped in `figure(...)` so it gets a caption and an automatic
number. You've seen `rect` and `circle` draw shapes directly; `figure`
wraps either of them (or a real `image(...)`) the same way it would wrap a
photograph.

## Figure and caption

```typ example
#figure(
  rect(width: 3cm, height: 1.5cm, fill: luma(230)),
  caption: [A sampling grid.],
)
```

`figure` takes the content as its first argument and a `caption:` as
content, not a plain string, so you can put emphasis or even a citation
inside it. Typst numbers figures automatically, in the order they appear in
the document — "Figure 1," "Figure 2," and so on — and that number lives in
the caption, not something you type yourself.

## Labels

A label attaches a name to the figure right after it, in angle brackets:
`<fig:pool>`. The name is yours to choose — it never shows up in the
output — and it only has to be unique within the document. Convention
helps more than Typst requires: prefixing labels (`fig:`, `eq:`, `tab:`)
makes it obvious at a glance what kind of thing you're pointing at later,
especially once a document has dozens of them.

## References with `@`

Once a figure has a label, `@fig:pool` anywhere else in the document
becomes a reference: Typst replaces it with "Figure 1" (or whatever number
that figure ends up with) and turns it into a link that jumps to the
figure when clicked. The number updates automatically if you reorder
figures or insert a new one earlier in the document — you never renumber
anything by hand, and you can never end up with a reference that silently
points to the wrong number.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)

As @fig:pool shows, the pool is roughly circular.

#figure(
  circle(radius: 1.2cm, fill: luma(200), stroke: 0.5pt),
  caption: [A tidal pool, viewed from above.],
) <fig:pool>

A second figure, this time a rectangle:

#figure(
  rect(width: 3cm, height: 1.5cm, fill: luma(230)),
  caption: [A sampling grid.],
) <fig:grid>

Figures @fig:pool and @fig:grid are numbered in the order they appear.
```

**What you should see:** a sentence referencing "Figure 1" before the
figure it describes even appears on the page, a circle captioned "Figure 1:
A tidal pool, viewed from above.", a rectangle captioned "Figure 2: A
sampling grid.", and a closing sentence correctly naming both.

## Try it yourself

1. Swap the order of the two `figure(...)` blocks and confirm the numbers
   in both captions and in the closing sentence update to match the new
   order.
2. Change a label from `<fig:pool>` to `<fig:1>` and update the matching
   `@fig:pool` references to `@fig:1` — the output doesn't change, only the
   name you're using internally.
3. Delete one `@fig:...` reference and replace the label it pointed to
   with a different name without updating the reference, to see what a
   broken reference looks like.

## Check your understanding

```quiz
You write `@fig:pool` in a sentence, then later add a brand-new figure labeled `<fig:tide>` *before* `<fig:pool>` in the document. What happens to the number shown for `@fig:pool`?
- [x] It automatically updates to reflect the new figure's position
- [ ] It stays frozen at whatever number it had when you first wrote `@fig:pool`
- [ ] Typst raises an error because the label order changed
> References are resolved from the final document, not from the order you wrote things in your source, so numbers always stay consistent.
```

```quiz
What does the text inside `<...>` after a figure actually control?
- [ ] The figure's visible caption
- [x] An internal name used only to reference the figure elsewhere with `@`
- [ ] The figure's number
> A label is an internal name, invisible in the output; it exists only so `@label` can find the right figure later.
```

## What to remember

- `figure(content, caption: [...])` wraps anything and gives it an
  automatic, caption-level number.
- `<name>` right after a figure labels it; the name is internal and never
  printed.
- `@name` inserts a live reference — the right number, a working link, and
  it stays correct if you reorder or insert figures.
