---
title: Fix "unknown variable `x`"
description: Typst evaluated a name that is not defined anywhere it can see — usually a typo, a missing #let, or a name used outside its scope.
section: typst-errors
related: [error-unclosed-delimiter, error-unexpected-argument, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#x
```

## What it means

Typst evaluated an identifier — `x` in this case — and found no binding for it: not a built-in, not something you set with `#let`, not a function parameter, not a field on a dictionary. The caret points at the exact name it could not resolve.

## Common causes

**A typo in the name.** Typst does not guess what you meant; `#paper-titel` and `#paper-title` are unrelated names to it.

```typ example
#let paper-title = "Climate Models"
#paper-title
```

**Used before it is defined.** Typst reads a document top to bottom, so a variable only exists from its `#let` onward — referencing it earlier, even a line above, fails.

```typ example
#let count = 3
Results from #count experiments.
```

**Used outside the block it was defined in.** A `#let` inside a code block (`{ ... }`) is only visible inside that block. If you need the value outside, return it from the block instead of discarding it.

```typ example
#let x = {
  let y = 1
  y + 1
}
#x
```

## Check your understanding

```quiz
Why does `#let a = 1` followed on the next line by `#b` (not `a`) fail with "unknown variable `b`"?
- [ ] Typst only allows one `#let` per document
- [x] `b` was never bound to anything
- [ ] Variable names must start with the same letter as the value's type
> Typst reports exactly the name it could not find a binding for — here, nothing ever defined `b`.
```
