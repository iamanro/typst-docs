---
title: Add a table of contents
description: Generate a table of contents from your headings with one line, then customize its title, depth, and which headings show up.
section: typst-tips
order: 1
related: [heading-numbering, page-numbers, appendix]
---

Call `#outline()` once, anywhere in the document. It scans every [heading](/heading-numbering) and lists it with its page number — no manual maintenance, no renumbering by hand.

```typ example
#set heading(numbering: "1.")

#outline()

= Introduction
= Methods
== Data collection
== Analysis
= Results
```

Typst places the entries where you call `#outline()`, usually right after the title, and keeps them in sync every time you recompile.

## Limiting the depth

A long paper doesn't need every sub-sub-heading in the contents. Pass `depth` to stop at a given [heading](/heading-numbering) level:

```typ example
#set heading(numbering: "1.")
#outline(depth: 2)

= Introduction
== Background
=== Prior work
= Methods
```

Only `=` and `==` headings appear; `===` is skipped even though it's still numbered in the body.

## Renaming or hiding entries

- Change the heading above the list with `#outline(title: "Contents")`, or drop it with `title: none` if you add your own heading.
- Keep a specific section out of the list by writing it as `#heading(outlined: false)[Acknowledgments]` instead of `= Acknowledgments`. It still prints and keeps its place in the numbering, just not in the outline.

## Pitfalls

- An empty outline usually means there are no headings yet, or they're all set to `outlined: false`.
- `#outline()` picks up every heading in the document, even one written inside a `#figure` caption or a footnote — avoid `=` markup there if you don't want it listed.
- If you also need a separate list of figures or tables, call `#outline(target: figure)` — it works the same way but lists figures instead of headings. See [figures and references](/tutorial/figures-and-references) for the full setup.
