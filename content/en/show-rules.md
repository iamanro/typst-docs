---
title: Use show rules
description: Redefine how an element is rendered — not just its defaults — by intercepting it with a show rule.
section: learn-typst
order: 3
related: [set-rules, markup-and-code, templates]
---

A [set rule](/set-rules) changes an element's *defaults*. A show rule changes how an element is *built* — it
intercepts every match and lets you replace it with something else entirely, including the original content
transformed in some way. Where a set rule says "default to this", a show rule says "whenever you see this, do
that instead".

```typ example
#show heading: it => {
  set text(fill: blue)
  it
}

= A blue heading
Regular text stays unaffected.
```

The pattern is always `#show selector: transformation`. The selector says *what* to intercept — an element
function like `heading`, a piece of text, a regular expression. The transformation is either a function that
receives the matched element (as `it`) and returns new content, or a shorthand for simpler cases.

## The show-set shorthand

If all you want is to apply a set rule to a specific element type — not transform its structure — skip the
function and write the set rule directly after the colon:

```typ example
#show heading: set text(fill: blue)

= Same result, shorter
This only needed one line because nothing but the text color changed.
```

This is the single most common show rule you'll write: "for this one element type, change these defaults",
without touching anything else in the document.

## Matching by selector

`heading` matches every heading, but you can be more specific with `.where(...)`:

```typ example
#show heading.where(level: 1): set text(size: 16pt, weight: "black")

= Level one, large
== Level two, unaffected by that rule
```

You can also match a piece of literal text or a regular expression, which is handy for consistent terminology or
flagging things you haven't finished:

```typ example
#show "Typst": name => text(weight: "bold")[#name]
#show regex("TODO"): it => text(fill: red, it)

Typst renders fast. TODO: benchmark it properly.
```

## Transforming, not just styling

Because the transformation is a real function, it can restructure the content, not just recolor it. A common use
is adding something around every match:

```typ example
#show heading: it => {
  v(10pt, weak: true)
  it
  line(length: 100%, stroke: 0.5pt + gray)
}

= Section with a rule underneath
Body text follows.
```

`it` is the original element — you can still read its fields, like `it.body` for a heading's text or `it.level`
for its depth, if the transformation needs to branch on them.

## Show rules on the whole document

A show rule written with `#show: function` (no selector, just a colon and a function) wraps *everything from that
point in the document* through that function. This is exactly how [templates](/templates) are applied — you'll
see `#show: my-template.with(...)` at the top of a real paper.

```typ example
#let boxed(body) = rect(inset: 8pt, body)

#show: boxed

Now the rest of the page is inside a box.
```

## Try it yourself

1. Write a show rule that makes every `strong` (bold) word red, and test it on a sentence with two bold words.
2. Use `.where(level: 2)` to style only second-level headings differently from first-level ones.
3. Write a `#show: function` rule (no selector) that wraps the rest of a short example in a box, like the last
   example above.

## Check your understanding

```quiz
What's the difference between a set rule and a show rule on the same element?
- [ ] There is no difference, they're interchangeable
- [x] A set rule changes defaults; a show rule intercepts and can rebuild the element entirely
- [ ] Set rules only work on text, show rules only work on headings
> Set rules configure an element's arguments; show rules replace how the matched content is rendered, which is strictly more powerful.
```

```quiz
What does `#show heading: set text(fill: blue)` do?
- [x] It's shorthand for a show rule that just applies a set rule to matched headings
- [ ] It changes the color of all text in the document, not just headings
- [ ] It's invalid syntax; show rules need a function
> This is the show-set shorthand: when you only need to change defaults for one element type, you can skip writing a full transformation function.
```

## What to remember

- `#show selector: transformation` intercepts matches and replaces them.
- `#show element: set other(args)` is shorthand for applying a set rule only within that element.
- `.where(...)` narrows a selector; text and `regex(...)` can be selectors too.
- A function transformation receives the match as `it` and can read its fields or wrap it in more content.
- `#show: function` with no selector applies to the rest of the document — the mechanism behind
  [templates](/templates).
