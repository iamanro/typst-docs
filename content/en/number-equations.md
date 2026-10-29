---
title: Number equations and reference them
description: Turn on equation numbering with one set rule, label an equation, and reference it with @label — including numbers that follow the section.
section: typst-tips
order: 6
related: [heading-numbering, footnotes, table-of-contents]
---

Set `numbering` on `math.equation`, then label any equation you want a number for:

```typ example
#set math.equation(numbering: "(1)")

The mass-energy relation is
$ E = m c^2 $ <einstein>
and holds generally.
```

Equations without a label don't get a visible number even though `numbering` is on — only labeled ones are counted and shown, so inline math stays unnumbered by default.

## Referencing an equation

Use `@label` the same way you would for a figure or section. Typst inserts the right number and keeps it correct if equations are added or removed above it:

```typ example
#set math.equation(numbering: "(1)")

$ a^2 + b^2 = c^2 $ <pyth>
As shown in @pyth, the relation holds for right triangles.
```

## Numbering by section

For "(1.1)", "(1.2)", "(2.1)" style numbers that reset per chapter, build the pattern from the current [heading](/heading-numbering) counter:

```typ example
#set heading(numbering: "1.")
= Physics

#set math.equation(numbering: n => numbering("(1.1)", counter(heading).get().first(), n))
The mass-energy relation is
$ E = m c^2 $ <einstein>
as shown in @einstein.
```

The function receives the running equation count `n`; combining it with `counter(heading).get().first()` gives the current chapter number.

## Pitfalls

- Numbering only appears on equations written as a separate block (`$ .. $` on its own line); inline math like `$x + 1$` in running text is never numbered.
- If `@label` fails to compile with "cannot reference text", the label landed on the wrong line — put it immediately after the closing `$`, with no blank line in between.
- Equation numbers and [heading numbers](/heading-numbering) are independent counters by default; the per-section pattern above is what links them.
