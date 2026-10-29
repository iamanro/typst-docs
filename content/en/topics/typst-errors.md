---
title: Typst errors
description: How to read a Typst compiler diagnostic, and fixes for the error and warning messages researchers run into most often.
---

Typst stops at the first problem it cannot make sense of and prints a diagnostic with three parts: the **message** (what went wrong), a **location** (`file.typ:line:column`), and a caret pointing at the exact span of text that triggered it. For example:

```
error: unknown variable `x`
  ┌─ main.typ:4:1
  │
4 │ #x
  │  ^
```

This tells you the file, the line, the column, and the specific token Typst choked on — usually enough to find the mistake without searching further.

## Fix the first error first

Typst compiles your whole document before reporting anything, so you may see several diagnostics at once. Start with the **first** one. A single mistake — a missing `#let`, an unclosed bracket, a typo in a function argument — often breaks everything that comes after it, so later errors can simply be echoes of the first one. Fix it, recompile, and the rest of the list frequently shrinks or disappears.

Two kinds of diagnostics exist:

- **Errors** stop the compiler; the document does not produce output until you fix them.
- **Warnings** (shown in yellow in the CLI and web app) let the document compile anyway, but point at something that is probably not what you intended — an unknown font, or a layout that could not settle on a final answer.

The pages below quote the exact message Typst 0.15.1 prints for common mistakes, explain what it means, and show the fix.
