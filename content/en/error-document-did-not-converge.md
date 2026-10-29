---
title: Fix "document did not converge within five attempts"
description: A warning — some value in your document (often from context, state, or a query) depends on its own final layout, so Typst's repeated-compilation step never settles.
section: typst-errors
related: [page-numbers, table-of-contents, error-unknown-font-family]
---

Running Typst 0.15.1 on this document:

```typ
#context {
  let elems = query(heading)
  let count = 1 + elems.len()
  count * [= Heading]
}
```

prints, and still produces a PDF with whatever the fifth attempt produced:

```
warning: document did not converge within five attempts
 = hint: see 1 additional warning for more details
 = hint: see https://typst.app/help/convergence for help

warning: number of heading elements did not stabilize
  ┌─ main.typ:2:14
  │
2 │   let elems = query(heading)
  │               ^^^^^^^^^^^^^^
  │
  = hint: the following numbers of elements were observed:
    - run 1: 0
    - run 2: 1
    - run 3: 2
    - run 4: 3
    - run 5: 4
    - final: 5
```

## What it means

Typst lays out a document, then checks whether anything that depends on the *result* of layout (page numbers shown in an outline, `here().position()`, state read back after being updated, query results) would change if it laid the document out again with that new information. If so, it repeats — up to five times — hoping the values settle down. "Did not converge" means they kept changing on every attempt; Typst gives up and ships the last version, which may be subtly wrong (a page number off by one, content shifted slightly).

## Common causes

**Querying for elements and then generating more of that same kind of element**, as in the example above: each attempt's heading count depends on the previous attempt's query result, so the document grows by one heading every time and nothing is stable to converge to. Avoid letting a query's result size feed back into how many matching elements get produced.

**A `state` that both reads its own current value and updates it inside the same `context`.** Prefer the function form of update — `my-state.update(old => ...)` — over reading, computing, and setting in separate steps, since the function form is evaluated once per layout pass rather than carrying a stale read forward.

**An outline, heading numbering, or table of contents that is made to depend on information only known after the outline itself is placed** — for example, numbering that changes based on which page a heading ends up on. Keep numbering and other outline-affecting state independent of the outline's own position.

## What to remember

- "Document did not converge" is a warning: Typst still produces a PDF, but it may not be laid out the way you expect.
- It happens when something layout-dependent (position, state, a query) feeds back into the layout that produced it.
- The accompanying "did not stabilize" warning names the exact `context` or state responsible — start there.
