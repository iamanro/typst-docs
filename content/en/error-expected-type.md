---
title: Fix "expected relative length or auto, found string"
description: A function argument got a value of the wrong type — often a quoted string where Typst wants a length, a color, or a number.
section: typst-errors
related: [error-unexpected-argument, page-setup, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#rect(width: "4cm")
```

## What it means

Typst is statically typed at the level of function arguments: `width:` on `rect()` expects a length (or `auto`), not text. `"4cm"` is a *string* — four characters — not the length four centimeters, even though it looks like one. Typst reports the type it expected, the type it actually received, and the exact argument.

Every "expected ... found ..." message follows this pattern. The expected type comes from the function's documentation; the found type is whatever you actually wrote — a string where a length was needed, an integer where a color was needed, content where a string was needed, and so on.

## Common causes

**Quoting a length instead of writing it as a number with a unit.** Drop the quotes:

```typ example
#rect(width: 4cm)
```

**Quoting a boolean or `none`.** `"true"` is a string; `true` (no quotes) is the boolean Typst expects for flags like `stroke: none` or `fill: none` — again, drop the quotes to get the real value, not text that merely looks like it.

**Passing a stored string where a typed value is required**, for instance a width assembled from user input. Convert it explicitly instead of hoping Typst will coerce it:

```typ example
#let w = "4cm"
#rect(width: eval(w, mode: "code"))
```

## Check your understanding

```quiz
`#set text(size: "11pt")` fails with "expected length, found string". What is wrong?
- [x] `"11pt"` is quoted text, not the length `11pt`
- [ ] `text()` does not accept a `size` argument
- [ ] `11pt` is too small for `set text`
> Removing the quotes — `size: 11pt` — gives Typst an actual length value instead of four characters of text.
```
