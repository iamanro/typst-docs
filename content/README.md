# Writing pages

One Markdown file per page in `content/<lang>/`. The path is the URL slug:
`content/en/set-rules.md` → `/typst-docs/en/set-rules/`. `index.md` is the language home.
Every language uses the same slugs (English), so pages link to their translations.

## Front matter

```
---
title: Use set rules
description: One sentence shown under the title, in search and in hub lists.
section: learn-typst
order: 2
related: [show-rules, page-setup]
---
```

- `section`: `tutorial`, `learn-typst`, `typst-tips`, `typst-errors` or `research-writing`.
  The hub pages are `tutorial.md` and `topics/<section>.md`; they list their pages automatically.
- `order`: position in the section. `tutorial` and `learn-typst` get "Step/Lesson N of M" navigation.
- `related`: slugs of pages in the same language. Broken slugs fail the build.

## Links

`[set rules](/set-rules)` or `[fonts](/fonts#variable-fonts)` link to a page in the same language.
Broken links fail the build.

## Typst blocks

All Typst blocks are compiled with Typst 0.15.1 during the build. A block that fails, or that compiles
with warnings, fails the build.

- ` ```typ ` – highlighted code only, not compiled.
- ` ```typ example ` – a snippet shown next to its rendered output, with an "Edit and run" button.
  The build adds `#set page(width: 12cm, height: auto, margin: 6mm)` before it.
- ` ```typ lab ` – a complete document in a live two-pane editor (tutorial steps). Nothing is added.
- ` ```typ error ` – code that must fail; the page shows Typst's real error message.

## Quizzes

````
```quiz
Where does a document-wide font change belong?
- [ ] In every paragraph
- [x] In a `set text` rule at the top
- [ ] In a show rule on `heading`
> A set rule changes the default for everything after it.
```
````
