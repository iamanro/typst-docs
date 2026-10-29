---
title: Citations and bibliographies
description: Loading a bibliography, citing with @key or #cite, and switching citation styles with one setting.
section: tutorial
order: 5
related: [tutorial/figures-and-references, bibliography, cite-responsibly]
---

Citations in Typst come from a bibliography file written in BibLaTeX or
Hayagriva format — the same `.bib` format most reference managers already
export. You load it once with `#bibliography(...)`, cite entries by their
key anywhere in the text, and Typst builds the reference list and formats
every in-text citation to match, consistently, without you touching either
by hand again.

## Loading a bibliography

Normally you'd point `bibliography("references.bib")` at a file sitting
next to your document. Since the examples on this page are single files
with nothing alongside them, they load the same BibLaTeX source as inline
bytes instead: `#bibliography(bytes("..."))`. The content is identical
BibLaTeX syntax either way — only where it comes from differs, so
everything below applies the same way to a real `.bib` file in your own
project.

## Citing with `@key`

Once a bibliography is loaded, `@` followed by a BibLaTeX key — the string
right after the opening brace of an entry, like `connell1972` in
`@article{connell1972, ...}` — inserts a formatted citation at that spot.
It behaves like a figure reference: Typst looks up the entry, inserts the
right in-text form for whatever style you chose, and adds the full entry to
the reference list at the end automatically. You never type "et al." or a
bracketed number yourself.

## The explicit `#cite` function

`@key` is shorthand for `#cite(<key>)`. Reach for the explicit function
when you need options the shorthand doesn't expose — most often a page
number or chapter for a specific quote:
`#cite(<connell1972>, supplement: [p. 4])` cites the same entry but adds
"p. 4" in the right place for the style in use.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)

Tidal pools act as natural laboratories for studying rapid environmental
change @connell1972, and their biodiversity has been surveyed extensively
since #cite(<stephenson1949>, supplement: [pp. 15-20]).

#bibliography(bytes(
  "@article{connell1972,
    author = {Connell, Joseph H.},
    title = {Community Interactions on Marine Rocky Intertidal Shores},
    journal = {Annual Review of Ecology and Systematics},
    year = {1972},
  }
  @book{stephenson1949,
    author = {Stephenson, T. A. and Stephenson, Anne},
    title = {The Universal Features of Zonation Between Tide-Marks on Rocky Coasts},
    publisher = {Journal of Ecology},
    year = {1949},
  }"
), style: "ieee")
```

**What you should see:** a paragraph with two in-text citation markers in
IEEE's bracketed-number style, a second one carrying a page range, and a
numbered reference list below the paragraph listing both sources in full.

## Switching styles

`style: "ieee"` in the example above is the only thing deciding how
citations and the reference list look. Change it to `"apa"` and every
citation in the document reformats from `[1]` to `(Connell, 1972)`, and the
reference list reflows to match — no find-and-replace, because the style
only ever touches how entries are *displayed*, never the underlying data
you cited from.

## Try it yourself

1. Change `style: "ieee"` to `style: "apa"` and watch both citation markers
   and the reference list switch from numbers to author-year form.
2. Add a `supplement: [p. 4]` argument to the first `@connell1972` citation
   by rewriting it as `#cite(<connell1972>, supplement: [p. 4])`.
3. Add a third BibLaTeX entry to the bytes string with a new key, then cite
   it with `@` somewhere in the paragraph, and confirm it appears in the
   reference list without any extra configuration.

## Check your understanding

```quiz
What does `style: "apa"` versus `style: "ieee"` change about a cited document?
- [x] Only how citations and the reference list are formatted and displayed
- [ ] Which bibliography entries are included
- [ ] The BibLaTeX syntax you have to use for each entry
> The style controls display only — in-text form and reference-list layout. The underlying bibliography data and keys stay the same.
```

```quiz
You need to cite the same source twice, once in general and once with a specific page number. What's the cleanest way?
- [ ] Add two separate BibLaTeX entries with the same information
- [x] Use `@key` for the general citation and `#cite(<key>, supplement: [p. N])` for the one with a page number
- [ ] Type the page number directly into the BibLaTeX entry's year field
> `#cite` is the full function behind the `@key` shorthand; `supplement` is how you attach a page number or similar detail to one specific citation.
```

## What to remember

- `#bibliography(...)` loads a BibLaTeX or Hayagriva source — a real file
  path normally, `bytes("...")` when the source has to live inline.
- `@key` cites an entry by its BibLaTeX key; `#cite(<key>, supplement: [...])`
  is the same thing with room for a page number or similar detail.
- `style: "..."` on `#bibliography` controls formatting for every citation
  and the whole reference list at once.
