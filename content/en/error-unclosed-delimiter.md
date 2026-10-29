---
title: Fix "unclosed delimiter"
description: Typst reached the end of the file while still waiting for a closing bracket or parenthesis to match one it opened earlier.
section: typst-errors
related: [error-unknown-variable, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#let intro = [This is the start of my introduction
```

## What it means

Every `[`, `(`, or `{` that Typst opens must be closed with a matching `]`, `)`, or `}`. When the file ends (or, less often, a heading or another construct interrupts the expression) before that match is found, Typst reports `unclosed delimiter` and points at the opening bracket it is still waiting on — not at the missing closing one, since it does not know where you meant to put it.

## Common causes

**A missing closing bracket after content spanning several lines.** Content blocks written with `[...]` are easy to leave open when they grow long.

```typ example
#let intro = [This is the start of my introduction.]
#intro
```

**A missing closing parenthesis in a tuple or function call.** The same applies to `(...)` — common in coordinates, array literals, or arguments split across lines.

```typ example
#let point = (1, 2)
#point
```

**A bracket closed with the wrong character.** `[` must close with `]`, not `)` — Typst does not treat them as interchangeable, and mismatching them produces the same "unclosed delimiter" message because, from the parser's point of view, the original bracket is still open.

## Check your understanding

```quiz
Typst reports "unclosed delimiter" pointing at a `[` on line 2, but your file is 40 lines long. Where is the actual mistake most likely to be?
- [x] Somewhere after line 2 — a closing `]` for that bracket is missing
- [ ] Always on line 2 itself
- [ ] In a completely unrelated file
> The caret marks the opening bracket, not the place where the closing one should have been — scan forward from there.
```
