---
title: Fix "unexpected argument: fil"
description: You passed a named argument that the function does not accept — almost always a typo in the argument name.
section: typst-errors
related: [error-expected-type, error-unknown-variable, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#rect(fil: blue)
```

## What it means

Typst functions accept a fixed, documented set of named arguments. `rect()` has `fill`, not `fil`; passing any name it does not recognize fails immediately, before the function runs, because Typst cannot guess whether you meant `fill`, `file`, or something else entirely. The message names exactly the argument it rejected.

## Common causes

**A typo in the argument name.** The fix is simply the correct spelling:

```typ example
#rect(fill: blue)
```

**Using an argument name from a different function.** `text()` has `size`, `image()` has `width` and `height`, `rect()` has `width`, `height`, `fill`, `stroke`, `radius` — mixing them up (passing `stroke` to a function that only lays out an `image`, say) triggers the same error. Check the function's own reference entry, not a similar one you remember.

**A renamed or removed argument after upgrading Typst.** Occasionally an argument name changes between versions; the changelog for the version you upgraded to will list it. Rerunning `typst --version` confirms which compiler is actually rejecting the call.

## Check your understanding

```quiz
`#image("x.png", smooth: true)` fails with "unexpected argument: smooth". What should you check first?
- [x] Whether `image()` actually has an argument with that name
- [ ] Whether the image file itself is corrupted
- [ ] Whether the document has a `#set page` rule
> "Unexpected argument" means Typst does not recognize the name at all. The reference for `image` shows the real one: `scaling: "smooth"`.
```
