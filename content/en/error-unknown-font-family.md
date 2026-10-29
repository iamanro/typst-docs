---
title: Fix "unknown font family"
description: A warning, not an error — Typst compiled the document anyway, but a font you named with #set text(font: ...) is not installed or embedded.
section: typst-errors
related: [fonts, error-expected-type]
---

Running Typst 0.15.1 on this document:

```typ
#set page(width: 10cm, height: auto, margin: 8mm)
#set text(font: "Helvetica Neue")
Hello world
```

prints this warning and compiles anyway, falling back to a default font:

```
warning: unknown font family: helvetica neue
  ┌─ main.typ:2:16
  │
2 │ #set text(font: "Helvetica Neue")
  │                 ^^^^^^^^^^^^^^^^
```

This is a **warning**, not an error: Typst still produces output, just not with the font you asked for, so it is easy to miss until someone opens the PDF and the typeface looks wrong.

## What it means

`font:` takes the font's family name exactly as its own metadata reports it — not a filename, not the name an operating system shows in a picker, and not necessarily the name on the font's download page. If Typst's font search (system fonts, embedded fonts, and anything passed with `--font-path`) turns up no family by that name, it warns and substitutes a fallback.

## Common causes

**A font that is simply not installed** where the document is compiled. A font available on your laptop is not automatically available on a CI server, a colleague's machine, or this site's build — check the fonts a build environment actually ships.

**The display name differs from the family name.** Many fonts are presented in a UI as "Family Light" or "Family Condensed Bold" while the family itself is just "Family", with weight and style set separately via `weight:` and `style:`. Use the family name, then adjust weight and style:

```typ
#set text(font: "Libertinus Serif", weight: "bold")
Hello world
```

**A typo or wrong capitalization in the name.** Typst compares case-insensitively (the warning above shows the name lowercased) but still requires the rest of the spelling to match exactly, including spaces.

## What to remember

- "Unknown font family" is a warning: the document still compiles, just with the wrong font.
- Use the font's family name, not a display label or filename.
- Confirm which fonts are available wherever the document actually gets compiled, not just on your own machine.
