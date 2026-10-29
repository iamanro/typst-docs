---
title: Use a different font
description: Switch fonts with #set text(font: ..), list what's installed with typst fonts, and point Typst at your own font files.
section: typst-tips
order: 8
related: [heading-numbering, two-columns, error-unknown-font-family]
---

Set `font` on `#set text(..)` with the family's name, exactly as it appears when you ask Typst which fonts it can see. This page's compiled examples are limited to the three fonts bundled with this site (Libertinus Serif, New Computer Modern Math, DejaVu Sans Mono); on your own machine you can use any font you have installed.

```typ example
#set text(font: "Libertinus Serif", size: 11pt)
This body text uses Libertinus Serif.

#set text(font: "DejaVu Sans Mono")
`code()` and identifiers look better in a monospace font like DejaVu Sans Mono.

#set text(font: "Libertinus Serif")
Math defaults to the New Computer Modern Math font: $ integral_0^1 x^2 dif x = 1/3 $
```

Math uses a separate "math font" (here, New Computer Modern Math) that provides the extra glyph variants formulas need; you don't set it the same way as body text — it's picked automatically from the fonts available, or chosen explicitly with `#set text(font: "...", ..)` inside `#show math.equation`.

## Finding fonts on your machine

Typst only sees fonts it can find — the ones installed on your system, plus any you point it at. List what it currently finds with:

```bash
typst fonts
```

If the family you want (say, a university's house font, or "Noto Serif" for broader script coverage) isn't in that list, either install it system-wide or tell Typst where the files are.

## Using a font Typst doesn't see yet

Put the font files (`.ttf`/`.otf`) in a folder, then pass it with `--font-path` when compiling:

```bash
typst compile --font-path fonts/ paper.typ paper.pdf
```

```typ
#set text(font: "Noto Serif")
= My Paper
Now this document uses a font from the fonts/ folder, not a system font.
```

`--font-path` can be repeated or point at a whole directory tree; Typst scans it the same way it scans system font directories. In the web editor, use the font upload panel instead — the setting is the project's, not the CLI's.

## Fallback chains

`font` also accepts an array, tried in order until a glyph is found — useful when one font is missing a script or symbol:

```typ example
#set text(font: ("Libertinus Serif", "DejaVu Sans Mono"))
This paragraph lists a fallback chain: Typst uses the first font that has the needed glyphs.
```

## Pitfalls

- A misspelled or missing family name doesn't error — it falls back silently and produces an "unknown font family" warning instead; see [fix "unknown font family"](/error-unknown-font-family) if your build fails on it.
- Font names are matched by family, not by file name — check the name Typst reports with `typst fonts`, not the font file's filename.
- `--font-path` must be given on every compile; it isn't remembered between runs, so build scripts need it every time.
