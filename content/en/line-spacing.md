---
title: Change line and paragraph spacing
description: Set double-spaced or compact text with #set par(leading, spacing), and add one-off gaps with #v().
section: typst-tips
order: 4
related: [two-columns, footnotes, page-numbers]
---

Line spacing within a paragraph is `leading`; the gap between paragraphs is `spacing`. Both live on `#set par(..)`:

```typ example
#set par(leading: 1.4em, spacing: 2em)

First paragraph, with lines spaced further apart than normal.

Second paragraph, separated from the first by extra vertical space.
```

`leading` is measured in `em` units, relative to the current font size, so it scales with the text size automatically — raise it for a "double-spaced" look that reviewers expect, or lower it to fit more on a page:

```typ example
#set par(leading: 0.65em)

First line of a tightly spaced paragraph.
Second line right after it.
Third line still close.
```

## A one-off gap

For a single extra gap — say, before a quote or after a title — don't change the global setting; insert `#v(2em)` where you need it:

```typ example
First paragraph.

#v(2em)

Second paragraph with extra manual space above it.
```

`#v()` takes any length (`1em`, `12pt`, `1cm`); it only adds space at that one spot and leaves `leading`/`spacing` untouched everywhere else.

## Pitfalls

- `leading` and `spacing` set on `#set par(..)` apply everywhere from that point in the document onward — put journal-required "double spacing" near the top, once.
- Headings and other blocks have their own `#set block(spacing: ..)` and don't automatically follow paragraph `spacing`; if gaps around headings look wrong, check `heading`'s block spacing, not `par`.
- Extremely small `leading` (under about `0.5em`) makes ascenders and descenders overlap between lines — test at your target font size before committing to a value.
