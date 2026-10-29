---
title: Text and structure
description: Paragraphs, emphasis, headings, lists, and how Typst decides where a line or a paragraph ends.
section: tutorial
order: 2
related: [tutorial/first-document, tutorial/math, markup-and-code]
---

Most research writing is sections, paragraphs, a bit of emphasis, and the
occasional list. Typst handles all of it with a handful of characters you
already know from writing plain text — the trick is knowing which ones
Typst treats specially.

## Paragraphs

A paragraph is just text. Typst doesn't care about line breaks inside it —
if you wrap a long sentence onto several source lines, Typst still joins
them into one flowing paragraph, exactly like Markdown does. What *does*
start a new paragraph is a **blank line**. Two newlines in your source, no
matter how many spaces are on the blank line, tell Typst "this sentence is
over; start fresh, with paragraph spacing above."

If you need to break a line *without* starting a new paragraph — common in
addresses or verse — end the line with a backslash: `line one \`. That's a
hard line break; it moves to the next line but keeps the same paragraph
spacing and indentation rules as the text around it.

## Emphasis

`*word*` makes **word** bold, `_word_` makes *word* italic, and backticks
like `` `word` `` render in monospace, the same convention you'd expect from
Markdown. These are shorthand for `#text(weight: "bold")[word]`,
`#emph[word]`, and `#raw("word")` — the markup exists because bold and
italic are common enough to deserve one character instead of a function
call.

## Headings

A line starting with `=` is a top-level heading; `==` is one level down,
`===` another, and so on. Typst numbers and styles headings automatically —
no manual "1.2.3" prefixes, and no separate command to say "this is a
subsection of that one." The nesting is just how many `=` characters you
type.

## Lists

`-` starts a bullet list, `+` starts a numbered one, and indenting a line by
two spaces nests it under the item above. You don't write the numbers
yourself for a `+` list — Typst renumbers automatically if you add or
remove an item, which matters once a list gets edited more than once.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)

= Methods
== Sampling

We collected water samples from three sites.

+ Site A, near the inlet
+ Site B, mid-pool
+ Site C, under the overhang
  - measured at low tide
  - measured at high tide

This line ends with a hard break \
and continues right below it, same paragraph.

A new paragraph starts after a blank line, with normal spacing above it.

*Bold*, _italic_, and `monospace code` all read clearly in a sentence.
```

**What you should see:** a numbered heading "Methods" with a smaller
numbered sub-heading "Sampling," a numbered list of three sites where the
third has two nested bullets, a two-line block that stays one paragraph,
a separate paragraph below it, and a final line mixing bold, italic, and
monospace text.

## Try it yourself

1. Add a fourth `+` item to the list and confirm it's numbered `4.`
   automatically, then delete the second item and watch the rest renumber.
2. Turn `== Sampling` into `=== Sampling` and see it shrink and renumber
   under "Methods" as a deeper subsection instead of a sibling.
3. Remove the trailing backslash from the "hard break" line and watch the
   two lines merge into one wrapped line instead of staying visually split.

## Check your understanding

```quiz
You want two lines to stay in the same paragraph (same spacing, same indent) but still break visually at a specific point. What do you type at the end of the first line?
- [ ] Two spaces
- [ ] A blank line
- [x] A backslash
> A backslash (`\`) forces a line break without starting a new paragraph; a blank line would start one.
```

```quiz
You write `=== Results` directly under a `= Methods` heading, with no `==` heading in between. What happens?
- [x] Typst still renders it as a sub-sub-heading; the numbering just reflects the levels you used
- [ ] Typst raises an error because a level was skipped
- [ ] It's automatically promoted to `==`
> Typst doesn't require every level to appear — it numbers and nests headings based on how many `=` you wrote, nothing more.
```

## What to remember

- A blank line starts a new paragraph; a trailing backslash breaks a line
  without starting one.
- `*bold*`, `_italic_`, and `` `code` `` are shorthand for the matching
  function calls.
- `=`, `==`, `===` nest headings by how many equals signs you type; Typst
  numbers them for you.
- `-` lists are unordered, `+` lists are automatically numbered and
  renumber themselves when you edit them.
