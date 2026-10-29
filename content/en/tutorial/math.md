---
title: Writing math
description: Inline versus block equations, symbols and fractions, lining up steps with &, and numbering equations.
section: tutorial
order: 3
related: [tutorial/text-and-structure, tutorial/figures-and-references, number-equations]
---

Typst has a dedicated math mode, entered with dollar signs. There's no
package to load and no preamble to configure — `$...$` just works, and it
looks close to what you'd write by hand.

## Inline versus block math

`$x^2$` with no spaces around the dollar signs stays **inline**, sitting on
the same line as the surrounding text, sized to match it: the area is
$A = pi r^2$. Add a space right after the opening `$` and right before the
closing `$` — `$ x^2 $` — and the equation becomes a **block**: it gets its
own centered line, with more room to breathe, which is what you want for
anything longer than a few symbols.

## Symbols and fractions

Greek letters and operators are spelled out by name: `alpha`, `beta`,
`pi`, `sum`, `integral`, `times`, `->` all render as their symbols without
any escape character. A fraction is just `/`: `(1 + sqrt(5)) / 2` becomes a
proper stacked fraction, not a slash — Typst recognizes the shape and lays
it out accordingly. Superscripts and subscripts use `^` and `_`, same as
most math notation you've seen, and `sqrt(...)` wraps a value in a root
sign.

## Lining up steps with `&`

A multi-step derivation is one of the few places block math needs explicit
help: without it, Typst has no way to know which parts of each line should
line up underneath each other. Put `&` right before the part you want
aligned, and separate lines with `\`, same as a hard line break in text.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)
#set math.equation(numbering: "(1)")

The area of a circle is $A = pi r^2$, where $r$ is the radius.

$ A &= pi r^2 \
    &= pi (2"cm")^2 \
    &= 4 pi thin "cm"^2 $ <eq:area>

See @eq:area for the expansion. The golden ratio is
$ phi = (1 + sqrt(5)) / 2 approx 1.618. $
```

**What you should see:** a sentence with a small inline formula, a numbered
three-line derivation where every `=` sign lines up in the same column, and
an unnumbered block equation for the golden ratio underneath it.

## Numbering equations

By default, block equations aren't numbered — most short ones don't need
to be referenced later. Turn numbering on globally with
`#set math.equation(numbering: "(1)")`, placed once near the top of the
document; every block equation after that gets a running number in the
style you gave, and you can swap `"(1)"` for `"1."` or `"[1]"` without
touching anything else. Give an equation a label like `<eq:area>` right
after it, and `@eq:area` anywhere else in the document turns into a
clickable "(1)" that always matches the real number — even if you add
equations earlier and everything shifts.

## Try it yourself

1. Remove the space inside `$ phi = ... $` on both sides (`$phi = ...$`) and
   watch it collapse from its own centered block into inline text.
2. Change the numbering format to `"1."` and see both the derivation's
   number and the reference in the sentence above it update together.
3. Add a fourth line to the derivation, `&= pi dot 4 thin "cm"^2`, starting
   with `&` so it stays aligned with the others.

## Check your understanding

```quiz
Why does `$ x^2 $` (with spaces inside the dollar signs) render differently from `$x^2$` (no spaces)?
- [ ] They're identical; the spaces are ignored
- [x] The spaces switch the equation from inline to its own centered block
- [ ] Spaces inside math always cause an error
> A space right after `$` and right before the closing `$` tells Typst to lay the equation out as a block instead of inline.
```

```quiz
In a multi-line equation, what does `&` do?
- [ ] Inserts an ampersand character
- [x] Marks the point in each line that should line up vertically with the other lines
- [ ] Starts a new equation
> `&` is an alignment point; Typst stacks everything before the first `&` on each line under each other, and likewise for what follows.
```

## What to remember

- `$x$` with no surrounding spaces is inline; `$ x $` with spaces on both
  sides is a centered block.
- Symbols are spelled out (`alpha`, `sum`, `->`); `/` makes a real fraction.
- `&` aligns multi-line derivations; `\` separates the lines.
- `#set math.equation(numbering: "(1)")` numbers every block equation after
  it, and a label plus `@label` keeps references in sync automatically.
