---
title: Write a template
description: Package your paper's styling into one function, then apply it to a whole document with a single show rule.
section: learn-typst
order: 8
related: [show-rules, set-rules, page-setup]
---

Everything on this page is a function that takes the rest of the document and returns it, restyled. That's a
template: a function whose last parameter is the document body, applied once with `#show: my-template.with(...)`.
You've already seen the pieces — [set rules](/set-rules), [show rules](/show-rules), functions from
[the first lesson](/markup-and-code) — a template just collects them in one place so you don't repeat your
journal's formatting rules in every paper you write.

## The simplest case

A function that wraps its argument in something is already a template, in the sense Typst means it:

```typ example
#let note(body) = rect(inset: 8pt, radius: 4pt, fill: rgb("#eef"))[#body]

#show: note

This whole rest of the page is wrapped by the template function.
```

`#show: note` (no selector before the colon) means "apply this function to everything from here on". It's the
show rule you met in the [previous lesson](/show-rules), just without a specific element to match.

## A real paper template

A useful template usually takes configuration — a title, authors, maybe an abstract — as named arguments, with
the document body as the last, unnamed one. Inside, a handful of set rules fix the look, then `doc` is inserted.

```typ example
#let conf(
  title: none,
  authors: (),
  abstract: none,
  doc,
) = {
  set page(width: 12cm, height: auto, margin: 8mm)
  set text(size: 10pt)
  set par(justify: true)
  set heading(numbering: "1.")

  align(center)[
    #text(14pt, weight: "bold")[#title]
    #v(6pt)
    #authors.join(", ")
  ]

  if abstract != none {
    v(10pt)
    pad(x: 8pt)[*Abstract.* #abstract]
  }

  v(12pt)
  doc
}

#show: conf.with(
  title: "Diffusion in Thin Films",
  authors: ("A. Nováková", "B. Svoboda"),
  abstract: [We study diffusion coefficients in thin polymer films under temperature.],
)

= Introduction
Diffusion processes are central to understanding thin-film behavior.

= Methods
We used a standard four-point probe setup.
```

Three things make this work:

- `title`, `authors`, and `abstract` all have default values (`none` or `()`), so callers can skip the ones they
  don't need.
- `doc` has no default and comes last — Typst lets a function's final parameter stay unnamed, so `#show:
  conf.with(title: ..., authors: ...)` can leave `doc` for the show rule to fill in with the rest of the document.
- The set rules inside `conf` are scoped to the function body (see [set rules](/set-rules)), so they apply to
  `doc` and everything in it without leaking out if `conf` were ever called from inside something else.

## `.with(...)`

`conf.with(title: "...", authors: (...))` doesn't call `conf` — it returns a *new function* with those arguments
pre-filled, still waiting for `doc`. That's exactly the shape `#show: ...` needs: a function of one argument (the
document body). You'll use `.with(...)` any time you want to partially apply a function before handing it to a
show rule.

## One file, one template, reused

In a larger project you'd put `conf` in its own file and `#import "template.typ": conf` at the top of each paper,
so every document in the project shares one definition — change the template once, and every paper that imports
it picks up the change. The examples on this page keep everything in one file only because a standalone snippet
can't reference a second file.

## Try it yourself

1. Write a template function with one named argument (e.g. `title`) and a `doc` body parameter, and apply it with
   `#show: your-template.with(title: "...")`.
2. Add a second named argument with a default value (like `subtitle: none`) and only pass it sometimes.
3. Inside your template, add a set rule for `text` or `par` and confirm it applies to the document body passed in.

## Check your understanding

```quiz
Why does the `doc` parameter come last and stay unnamed?
- [x] So `#show: template.with(other: args)` can supply it later, as the function Typst calls with the rest of the document
- [ ] Because Typst requires the first parameter to be named
- [ ] It's just a style convention with no functional effect
> `.with(...)` returns a function still waiting for the remaining parameter; leaving `doc` unnamed and last is what lets a show rule fill it in.
```

```quiz
What does `#show: conf.with(title: "Paper")` actually do?
- [ ] Immediately renders a document titled "Paper"
- [x] Applies `conf`, pre-filled with `title: "Paper"`, to the rest of the document
- [ ] Sets a page property called `title`
> `.with(...)` partially applies the function; `#show: ...` (no selector) then runs it on everything that follows in the source.
```

## What to remember

- A template is a function whose last parameter is the document body, applied with `#show: template.with(...)`.
- `.with(...)` partially applies named arguments, returning a function still waiting for `doc`.
- Default values (`none`, `()`, or a concrete default) let callers skip arguments they don't need.
- Set rules inside the template's body are scoped to it, so they style `doc` without leaking into whatever calls
  the template.
- In real projects, define the template once in its own file and `#import` it into every document that uses it.
