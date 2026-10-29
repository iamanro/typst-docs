---
title: Add footnotes
description: Attach a footnote with #footnote[..], reuse the same note twice, and adjust how the footnote rule looks.
section: typst-tips
order: 5
related: [number-equations, line-spacing, appendix]
---

Put `#footnote[..]` right after the word or sentence it belongs to. Typst numbers it, places the marker, and prints the note at the bottom of the page automatically:

```typ example
Water boils at 100°C at sea level.#footnote[At standard atmospheric pressure, 101.325 kPa.]

More text continues after the footnote mark.
```

If the note runs long, Typst moves part of it to the next page rather than overflowing — you don't need to manage that yourself.

## Reusing the same footnote

To point at an already-defined footnote a second time (without duplicating the text or incrementing the counter), label the first one and pass the label to a second `#footnote(..)` call:

```typ example
The result was confirmed twice.#footnote[See the appendix for raw data.] <note>
Later we refer back to it again#footnote(<note>).
```

Both markers print the same number and both point at one entry at the bottom.

## Styling the footnote rule

The thin line above the footnotes is `footnote.entry`'s `separator`; override it like any other stroke:

```typ example
#set footnote.entry(separator: line(length: 30%, stroke: 0.5pt))

Water boils at 100°C at sea level.#footnote[At standard atmospheric pressure, 101.325 kPa.]
```

## Pitfalls

- A footnote called inside a heading or inside `#outline()`'s scanned content can behave oddly — keep footnotes in body paragraphs.
- Footnotes restart numbering per chapter only if you explicitly reset `counter(footnote)`; by default numbering runs continuously through the whole document.
- For numbered claims that need a citation rather than an aside, use [bibliography](/bibliography) instead — footnotes and citations serve different purposes.
