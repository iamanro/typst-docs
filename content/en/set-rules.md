---
title: Use set rules
description: Change a default for everything that follows — fonts, paragraph spacing, list markers — with one line, instead of repeating options everywhere.
section: learn-typst
order: 2
related: [markup-and-code, show-rules, page-setup]
---

Almost every element in Typst — text, paragraphs, headings, lists, tables — has a function with default
arguments. A *set rule* overrides those defaults from that point onward, for everything created afterwards,
without you repeating the arguments at every call site. It reads like a sentence: "set text to this size", "set
paragraphs to be justified".

```typ example
#set text(font: "Libertinus Serif", size: 10pt)
#set par(justify: true, leading: 0.65em)

This paragraph is justified and uses tighter line spacing than the default, because both
set rules apply to everything typed after them.
```

That's the core idea: a set rule is not a one-time action, it's a standing instruction. Compare it to a function
call that configures the function itself, not a specific invocation — `set text(size: 9pt)` doesn't produce
9pt text right there, it tells every *following* piece of text to default to 9pt unless something more specific
overrides it.

## Set rules only affect what comes after them

Because a set rule changes a default going forward, text written *before* it keeps the old default. This trips
people up coming from word processors, where "select all, change font" is normal — in Typst you set the font
once, near the top, before any text exists.

```typ example
First paragraph, default size.

#set text(size: 16pt)

Second paragraph, now 16pt, because the rule came before it.
```

## Scoping a set rule

A set rule's effect ends at the end of the block it's in — a function body, a content block in `[...]`, or the
document itself. Wrap a rule in `[...]` or `{...}` to contain it to just that part of the document.

```typ example
Normal text.

#[
  #set text(fill: red)
  Only this paragraph is red.
]

Back to normal here.
```

The same containment happens inside a function: if `note` below sets a style, that style doesn't leak out to
whatever called it.

```typ example
#let note(body) = {
  set text(style: "italic")
  body
}

#note[An aside, italicized.] Back to upright text immediately after.
```

## Rules for anything with a default

Set rules aren't limited to `text` and `par`. Any element you'll meet later — [page](/page-setup),
[figure](/figures-and-images), [table](/tables), [bibliography](/bibliography) — can be configured the same way:

```typ example
#set list(marker: [→])
#set enum(numbering: "1)")

- first point
- second point

+ step one
+ step two
```

## Named arguments, not positional guessing

Set rules almost always use named arguments (`size: 10pt`, not just `10pt`), which is why they read naturally and
why you only need to mention the options you actually want to change — everything else keeps its default.

## Try it yourself

1. Set the document's base text size to something unusual (say, 13pt) and confirm with an example that text
   before the rule is unaffected if you put some text first.
2. Wrap a `#set text(fill: ...)` rule in `[...]` around a single sentence, and show that the sentence after it is
   back to normal.
3. Combine `#set par(justify: true)` with `#set text(size: 9pt)` in one example and write two short paragraphs to
   see both defaults apply.

## Check your understanding

```quiz
Where should a document-wide font change usually go?
- [ ] After the text you want to style, so Typst knows what to change
- [x] Near the top, before the text, as a set rule
- [ ] Inside every paragraph that uses that font
> Set rules change the default going forward; put them before the content they should affect.
```

```quiz
How do you limit a set rule to one part of a document?
- [ ] You can't; set rules always apply to the whole document
- [x] Wrap it together with the content in `[...]` or `{...}`
- [ ] Add `scope: local` to the set rule
> A set rule's effect ends at the close of its enclosing block — a content block, code block, or function body.
```

## What to remember

- A set rule (`#set element(args)`) changes the default for that element type from that point forward.
- It does not affect content written before it.
- Wrapping a set rule in `[...]` or inside a function body contains its effect to that scope.
- Most elements you'll use — text, par, list, enum, page, figure, table — accept set rules.
- For changing *how* an element is built, rather than its defaults, you'll want a [show rule](/show-rules) instead.
