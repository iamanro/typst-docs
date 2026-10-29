---
title: Number your pages
description: Turn on page numbers with one setting, pick a format like "1 / 1", and switch styles partway through a document.
section: typst-tips
order: 2
related: [table-of-contents, landscape-pages, two-columns]
---

Set the `numbering` property on the page, once:

```typ example
#set page(numbering: "1", number-align: center)

= Hello
This page now has a number at the bottom center.
```

By default the number appears centered in the footer. `numbering` takes the same pattern string as [heading numbering](/heading-numbering): `"1"` for plain Arabic numerals, `"i"` for lowercase Roman, `"A"` for letters, or a combined pattern like `"1 / 1"` for "page / total pages":

```typ example
#set page(numbering: "1 / 1")

= Report
First page.
#pagebreak()
Second page.
```

## Restarting or hiding numbers

A title page usually shouldn't show "1". Set `numbering: none` for a page, then switch back:

```typ example
#set page(numbering: "1", number-align: center)

= Title page
This page counts toward the total, but its number is hidden.
#pagebreak()
#set page(numbering: none)
Hidden here too — a cover or abstract page, for instance.
#pagebreak()
#set page(numbering: "1")
Numbering is visible again, continuing the count from before.
```

Hiding the number doesn't skip the page in the count — it still occupies a slot. If you want a front matter in Roman numerals that restarts in Arabic numerals at "1" for the main text, reset the counter explicitly with `#counter(page).update(1)` right before switching the `numbering` format.

## Pitfalls

- `numbering: none` hides the number but the page still counts; use it for cover pages, not to exclude pages from pagination.
- Changing `numbering` only affects pages from that point onward — put the `#set page(..)` rule right before the section where the style should change.
- For a different number position, use `number-align` (for example `top + right`) rather than trying to build your own footer.
