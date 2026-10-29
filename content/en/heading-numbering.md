---
title: Number your headings
description: Turn on "1.1" style numbering for sections with one line, skip a level, or write a custom numbering function per level.
section: typst-tips
order: 7
related: [table-of-contents, number-equations, appendix]
---

Set `numbering` on `heading`, once. Every `=`, `==`, `===` gets a number that matches its nesting:

```typ example
#set heading(numbering: "1.1")
= Introduction
== Background
== Motivation
= Methods
```

The pattern string mirrors the nesting depth: `"1.1"` numbers two levels as "1", "1.1", "1.2", "2"; add more `.1` groups for deeper nesting, or use `"1."` for a single flat level like "1.", "2.", "3.".

## Different styles per level

To mix styles — Roman numerals for top-level parts, Arabic for sections underneath — pass a function instead of a string. It receives the heading's numbers as separate arguments:

```typ example
#set heading(numbering: (..nums) => {
  let lvl = nums.pos().len()
  if lvl == 1 { numbering("I.", ..nums) } else { numbering("1.", nums.pos().last()) }
})
= Introduction
== Background
= Methods
```

Level 1 headings print "I.", "II."; level 2 headings restart at "1." under each parent.

## Excluding one heading

A heading you don't want numbered — "Acknowledgments" or "Abstract" — takes `numbering: none` directly, overriding the document-wide rule:

```typ example
#set heading(numbering: "1.")
= Introduction
#heading(numbering: none)[Acknowledgments]
= Methods
```

It still prints normally and still appears in `#outline()` if you want it there; it simply has no number.

## Pitfalls

- Numbering follows heading *level* (`=`, `==`, ...), not the order you write sections in — skipping from `=` straight to `===` still numbers as if `==` existed, with an empty middle group.
- If you need an unnumbered appendix section that restarts with letters afterward, see [appendix](/appendix) — it builds on `counter(heading).update(0)`.
- Changing the numbering pattern partway through the document only affects headings after that point; existing numbers above it don't retroactively change style.
