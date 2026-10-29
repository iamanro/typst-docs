---
title: Your first document
description: Markup versus function calls, a complete document that compiles, and how to read a Typst error.
section: tutorial
order: 1
related: [tutorial/text-and-structure, markup-and-code, error-unknown-variable]
---

Typst documents are plain text files you write in any editor. There is no
menu to click and no template to install first — you type words, and Typst
lays them out. The one habit worth building right away is noticing which of
two modes you're in at any point in a line.

## Markup and function calls

Most of what you type is **markup**: characters that mean something special
to Typst without any extra syntax. A blank line starts a new paragraph,
`*word*` makes it bold, `_word_` makes it italic, and a line starting with
`=` is a heading. Markup covers the common cases so you rarely have to think
about it.

Everything else — setting a default, drawing a shape, pulling in a value,
changing how headings look — is a **function call**, and it always starts
with `#`. `#rect(width: 2cm, height: 1cm)` draws a rectangle; `#set
text(size: 11pt)` changes the default text size from this point onward. The
`#` is the signal: "what follows is code, not text." Once you can tell the
two apart at a glance, most of Typst's syntax stops feeling mysterious.

## A complete document

Here's a short document that uses both. Try it in the editor below — it's
live, so if you change the source, the preview on the right updates as you
type.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)
#set document(title: "Notes on Tidal Pools")

#title()

= Introduction
Tidal pools fill and drain with the tide, which makes them one of the
few places where you can watch an ecosystem reset itself twice a day.

#rect(width: 3cm, height: 1.5cm, fill: luma(220), radius: 2pt)[
  #align(center + horizon)[a rock pool]
]

This paragraph is plain markup: *bold*, _italic_, and a line break
all work without any `#`.
```

**What you should see:** a centered title at the top, an "Introduction"
heading, a small rounded gray box with a caption-like label inside it, and a
paragraph underneath with visible bold and italic words.

## Setting the document title

`#set document(title: "Notes on Tidal Pools")` doesn't print anything by
itself — it stores metadata, the same way a PDF has a title in its
properties even if the first page doesn't repeat it. To actually *display*
that title on the page, call `#title()`. Call it with no argument and it
reuses whatever you set with `#set document`; call it with content, like
`#title[A Different Heading]`, and it overrides the metadata for display
only. Keep the metadata call near the top of the file, before any content,
so it affects the whole document.

## What errors look like

Typst checks your document every time it compiles, and it stops at the
first problem it can't make sense of. Here's a document that reaches for a
variable that was never defined:

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
Hello, #visitor_name!
```

The message — "unknown variable `visitor_name`" — names the exact problem
and the line where it happened. In the live editor on this site, errors
show up the same way: as "Line *N*: message" underneath the preview pane,
and the preview itself keeps showing the *last version that compiled*
instead of going blank. That's deliberate — you can keep typing mid-thought
without losing your place, and the old preview is usually enough to tell
you whether your last edit was the one that broke things.

## Try it yourself

1. In the lab above, delete the `#title()` line. Watch the title metadata
   stay set but stop appearing on the page.
2. Change `fill: luma(220)` to `fill: luma(80)` and see the box turn dark
   gray; then change `luma(80)` to `luma(300)` and read the error that
   appears — `luma` values must stay between 0 and 255.
3. Add a second paragraph below the first one that uses `*bold*`, `_italic_`,
   and `#`-based markup (try `#underline[text]`) together in one sentence.

## Check your understanding

```quiz
What's the difference between `*bold*` and `#text(weight: "bold")[bold]`?
- [ ] There is no difference; Typst treats them identically
- [x] `*bold*` is markup shorthand; `#text(...)` is the same thing spelled out as a function call
- [ ] `#text(...)` only works inside headings
> Markup is shorthand for common function calls. `*bold*` and `#text(weight: "bold")[bold]` produce the same bold text.
```

```quiz
A live preview on this site is showing yesterday's version of your edit, and an error message sits below it reading "Line 4: unknown variable `color`". What does that tell you?
- [ ] The whole document failed to parse and nothing can be fixed
- [x] Line 4 uses a name Typst doesn't recognize; everything up to the last successful compile is still shown
- [ ] The error is unrelated to your code and can be ignored
> The editor keeps the last good preview and reports the first failing line, so you can compare what changed since it last worked.
```

## What to remember

- Markup (`*bold*`, `=`, blank lines for paragraphs) handles common cases;
  anything else is a `#`-prefixed function call.
- `#set document(title: ...)` stores metadata; `#title()` is what actually
  prints a title on the page.
- A Typst error names the problem and the line it happened on; the live
  editor on this site keeps your last working preview visible while you fix
  it.
