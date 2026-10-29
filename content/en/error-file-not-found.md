---
title: Fix "file not found"
description: A function that reads an external file — image(), include, read(), bibliography() — was given a path that does not resolve from the current file.
section: typst-errors
related: [error-label-does-not-exist, figures-and-images, bibliography]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#image("figure.png")
```

The diagnostic names the exact path Typst tried: `file not found (searched at /absolute/path/to/figure.png)`.

## What it means

Functions like `image()`, `include`, `read()`, and `bibliography()` take a path and resolve it **relative to the file that calls them**, not relative to your terminal or project root. If the file is not there — wrong folder, wrong name, wrong extension, or the file was never saved — compilation stops with this error and shows the absolute path it searched, which is the fastest way to spot the mistake.

## Common causes

**A relative path that does not match the real folder layout.** If your document lives in `paper/main.typ` and the figure is in `paper/figures/plot.png`, the call needs `image("figures/plot.png")`, not `image("plot.png")`.

**A typo in the filename or extension**, including case — `Figure.PNG` and `figure.png` are different files on case-sensitive filesystems (most servers, and Linux locally).

**The file genuinely does not exist yet.** For examples and labs on this site (and anywhere you cannot ship extra files), build the image data directly instead of pointing at a path:

```typ example
#image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><rect width=\"40\" height=\"40\" fill=\"steelblue\"/></svg>"))
```

`image()` accepts raw bytes as well as a path, so an inline SVG (or any encoded image) sidesteps the filesystem entirely — useful for templates and reproducible snippets that must not depend on external assets.

## Check your understanding

```quiz
Your document is at `report/main.typ` and the logo is at `report/assets/logo.png`. Which call works?
- [ ] `image("logo.png")`
- [x] `image("assets/logo.png")`
- [ ] `image("report/assets/logo.png")`
> Paths resolve relative to the calling file itself, so from `report/main.typ` you only need the part after `report/`.
```
