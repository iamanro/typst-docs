---
title: Structure a paper
description: The IMRaD shape most journals expect, how to mirror it in Typst headings, and when it's fine to break the mould.
section: research-writing
order: 1
related: [write-an-abstract, heading-numbering, templates]
---

Most empirical papers share a skeleton: **Introduction, Methods, Results, Discussion** — IMRaD for short. Reviewers and readers expect it, so deviating without a reason makes your paper harder to read, not more original. Learn the shape before you bend it.

## What each section is for

- **Introduction** answers "why should I care?" and "what's missing?". End it by stating, in one or two sentences, what the paper actually does. A reader who stops after the introduction should know your contribution.
- **Methods** (or "Materials and Methods") is a recipe, not a narrative. Someone in your field should be able to redo the work from this section alone. Write it in the order things happened, not the order you thought of them.
- **Results** reports what you found, without arguing about what it means yet. Resist the urge to interpret here — that's the next section's job. Figures and tables carry most of the weight; the prose should guide the reader through them, not repeat their numbers.
- **Discussion** is where you argue. Say what the results mean, how they relate to prior work, what the limitations are, and what should happen next. A short paper can combine Results and Discussion, but keep the distinction — finding versus interpretation — even inside one section.

Some fields swap the order (methods-first in physics, results-and-discussion merged in short reports) or add sections (Related Work in computer science, Theory in some social sciences). Check two or three recent papers from your target venue before you commit to a structure; conventions vary more than textbooks suggest.

## Mirror the structure in headings

A paper's headings should map directly onto this shape — a reader skimming the outline should see the argument. Typst's [heading numbering](/heading-numbering) and [table of contents](/table-of-contents) tips cover the mechanics; here the point is to keep the hierarchy shallow. Two levels (`=`, `==`) are enough for most papers; a third level is a sign a section is trying to do too much and should probably split.

```typ example
#set heading(numbering: "1.1")

= Introduction
= Methods
== Participants
== Procedure
= Results
= Discussion
```

While drafting, put `#outline()` at the top of the document temporarily. It turns your heading list into a live table of contents, which makes an unbalanced paper — a two-page Methods section next to a two-paragraph Discussion — obvious at a glance. Delete or comment it out before submission unless the venue wants one.

```typ example
#set heading(numbering: "1.1")
#outline()

= Introduction
= Methods
= Results
= Discussion
```

## Writing order, not reading order

Nobody writes IMRaD top to bottom. A common order that works:

1. **Methods** first, while the details are fresh and you have the fewest opinions about what they mean.
2. **Results**, built around the figures and tables you already have.
3. **Introduction** last (or at least, rewritten last) — you can only motivate the paper properly once you know what it found.
4. **Discussion** and the **abstract** (see [write an abstract](/write-an-abstract)) come after everything else, since both summarize work that's now finished.

Writing in this order also keeps Typst's `#outline()` useful throughout: even an unfinished Introduction gets a heading early, so the document's skeleton is visible from day one, and you fill in prose against a structure that's already roughly right.

## Templates help, but don't hide the shape

If your venue supplies a Typst template, use it — it already encodes expected section names, numbering, and page setup (see [templates](/templates)). A template changes how the structure looks; it doesn't change what belongs in each part. Keep applying the guidance above even inside someone else's `#show` rules.
