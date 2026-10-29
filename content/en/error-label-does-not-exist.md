---
title: Fix "label `<results>` does not exist in the document"
description: You referenced a label with @name before anything in the document was tagged with that label.
section: typst-errors
related: [figures-and-images, bibliography, error-file-not-found]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
See @results for details.
```

## What it means

`@results` is Typst's reference syntax: it looks up whatever element in the document carries the label `<results>` (a heading, a figure, an equation, ...) and inserts a cross-reference to it. If no element anywhere in the document has that exact label, Typst cannot build the reference and reports it as missing.

## Common causes

**The label was never attached to anything.** A label after a heading, figure, or equation attaches it; a bare `@results` by itself does not create one.

```typ example
#set heading(numbering: "1.")
= Results <results>
See @results for details.
```

**The label is on an element Typst cannot number.** Referencing a heading requires `#set heading(numbering: ...)` to be active, because the reference needs something to display (a number, by default). Figures are numbered automatically, so they work without extra setup.

```typ example
#figure(
  rect(width: 2cm, height: 2cm),
  caption: [A square.],
) <fig-square>
See @fig-square.
```

**A typo between the label and the reference.** `<results>` and `@result` (missing the "s") are different labels as far as Typst is concerned — exact spelling match is required.

## Check your understanding

```quiz
You write `= Conclusion <concl>` and later `@conclusion` (not `@concl`). What happens?
- [x] Typst reports that label `<conclusion>` does not exist
- [ ] Typst auto-corrects to the closest label
- [ ] The reference silently shows nothing
> Typst matches labels by exact name; `conclusion` and `concl` are two different labels to it.
```
