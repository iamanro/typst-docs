---
title: Cite sources with a bibliography
description: Add a BibTeX-style reference list, cite entries with @key, and format citations in a particular style.
section: learn-typst
order: 7
related: [figures-and-images, templates]
---

Typst reads bibliography entries in BibTeX or Hayagriva format and does the rest — numbering, formatting
citations, and building the reference list — automatically. In a real document you'll point `#bibliography(...)`
at a `.bib` file; the examples here embed the same BibTeX source as a string with `bytes(...)`, since a standalone
snippet can't reference an external file.

```typ example
As @knuth1984 showed, literate programming connects code and prose.

#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }"
))
```

`@knuth1984` cites the entry by its BibTeX key. It doesn't matter where in the document `#bibliography(...)`
itself appears — citations before it still resolve — but by convention it goes at the end.

## Multiple entries, a citation style

A `.bib` file normally holds many entries; `@key` works the same for any of them. `#set bibliography(style: ...)`
switches the whole reference list (and every in-text citation) to a named style — `"ieee"`, `"apa"`,
`"chicago-author-date"` and others are built in.

```typ example
#set bibliography(style: "ieee")

See @knuth1984 and @einstein1905.

#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }
  @article{einstein1905,
    author = {Albert Einstein},
    title = {Zur Elektrodynamik bewegter K{\"o}rper},
    journal = {Annalen der Physik},
    year = {1905},
    volume = {322},
    number = {10},
    pages = {891--921},
  }"
))
```

## Citing a specific page

Add a locator in brackets after the key to cite a page or section within the source, which the chosen style
formats correctly (`p. 5`, `pp. 5–6`, and so on).

```typ example
See @knuth1984[p. 5] for the key argument.

#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }"
))
```

For more control — a citation inside a sentence rather than in brackets, for instance — `#cite(<key>, form:
"prose")` gives you the same result as `@key` with extra options spelled out.

## Listing sources you didn't cite

Pass `full: true` to list every entry in the bibliography file, including ones you never referenced with `@key` —
useful for a "further reading" list, or while drafting, before every source has been cited yet.

```typ example
#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }"
), full: true)
```

## Try it yourself

1. Write a bibliography with two BibTeX entries (use `bytes(...)`, as above) and cite both somewhere in a
   sentence.
2. Switch the style to `"apa"` and compare the citation and reference-list formatting to `"ieee"`.
3. Cite one entry with a page locator, like `@key[p. 12]`.

## Check your understanding

```quiz
How do you cite a bibliography entry with the key `smith2020`?
- [x] `@smith2020`
- [ ] `#cite("smith2020")`
- [ ] `<smith2020>` anywhere in the text
- [ ] `[smith2020]`
> `@key` is the citation syntax; `<key>` is for labeling your own content, like figures, not for citing a reference.
```

```quiz
What does `#bibliography(..., full: true)` do?
- [ ] Shows the full text of every cited source
- [x] Lists every entry in the file, even ones never cited with `@key`
- [ ] Switches to a more detailed citation style
> `full: true` includes uncited entries in the reference list, instead of only the ones you actually referenced.
```

## What to remember

- `#bibliography("refs.bib")` reads BibTeX or Hayagriva entries; `bytes("...")` embeds the source directly when
  there's no file.
- Cite an entry anywhere with `@key`; add a locator like `@key[p. 5]` for a specific page.
- `#set bibliography(style: "ieee" | "apa" | "chicago-author-date" | ...)` changes citation and reference-list
  formatting throughout.
- `full: true` lists every entry, including ones you never cited.
- Where `#bibliography(...)` appears in the source doesn't matter for resolving citations, but convention puts it
  at the end.
