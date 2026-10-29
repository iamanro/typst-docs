---
title: Markup and code
description: Typst documents mix plain markup with a small programming language; learn when you're in which, and how to cross between them.
section: learn-typst
order: 1
related: [set-rules, show-rules, templates]
---

A Typst file is markup by default — headings with `=`, emphasis with `_..._` and `*...*`, lists with `-`, all
producing content directly, the way Markdown does. But Typst is also a programming language: variables, functions,
loops, conditionals. The `#` character is the door between the two worlds. Write `#` and whatever follows is
evaluated as code until Typst can tell it's finished.

```typ example
Water boils at #(90 + 10)°C at sea level.
```

That's the simplest case: `#(...)` evaluates an expression and inserts the result as content. You don't need the
parentheses for a single identifier or function call — `#90 + 10` would actually print `90` and then leave `+ 10`
as literal text, because Typst stops reading code at the first thing that isn't part of an obvious continuation.
When in doubt, parenthesize.

## Variables

`#let` binds a name to a value. Once bound, use the name anywhere, in markup or in code, with a `#`.

```typ example
#let title = "Lab Report"
#let temperature = 21.5

= #title
The lab was kept at #temperature°C.
```

## Functions

`#let name(params) = ...` defines a function. The body after `=` can be a single expression, or `{ ... }` for
several statements, or `[ ... ]` when the function mostly produces content.

```typ example
#let square(x) = x * x
#let greet(name) = [Hello, #name! Welcome.]

#square(6)

#greet("Dr. Nováková")
```

Functions are values like any other — you'll pass them around a lot once you get to [show rules](/show-rules) and
[templates](/templates).

## Content blocks and code blocks

Square brackets `[...]` hold *content* — markup, possibly with more `#` expressions inside. Curly braces `{...}`
hold *code* — a sequence of statements whose last expression (if any) becomes the result. You nest one inside the
other constantly:

```typ example
#let box-with-label(label, body) = {
  [*#label:* ]
  body
}

#box-with-label("Note")[Remember to calibrate the sensor first.]
```

## Loops and conditionals

`#for` and `#if` work in both code and markup context. Inside markup, write them with `#` and give them a content
block; the loop body runs once per item and its output is inserted in place.

```typ example
#let samples = ("A1", "A2", "A3")

#for s in samples [
  - Sample #s: pending
]

#let n = samples.len()
#if n > 2 [
  That's #n samples — plenty for a first pass.
] else [
  Only #n samples; consider adding more.
]
```

## Strings, arrays, and dictionaries

The usual building blocks are there, with methods you call with `.`:

```typ example
#let authors = ("Alice", "Bob", "Carol")
#authors.join(", ", last: " and ")

#let paper = (title: "Diffusion in Thin Films", year: 2024)
#paper.title (#paper.year)
```

Arrays support `.map()`, `.filter()`, `.sum()`, `.len()` and more; dictionaries use `.key` or `.at("key")`. You'll
meet both again once you start writing [tables](/tables) or a reusable [template](/templates) from real data.

## Try it yourself

1. Write a `#let` variable for your name and greet yourself with a function, the way `greet` does above.
2. Make an array of three numbers and print their sum and their average in one example.
3. Write a function that takes a number and returns `[pass]` if it's above some threshold and `[fail]` otherwise,
   then call it a few times with different numbers.

## Check your understanding

```quiz
What does `#` do in Typst markup?
- [ ] Starts a comment, like in many programming languages
- [x] Switches from markup to code for what follows
- [ ] Inserts a literal hash character
> `#` hands control to Typst's code mode until the expression is clearly finished; use `#(...)` to be explicit about where it ends.
```

```quiz
What is the difference between `[...]` and `{...}`?
- [ ] They are interchangeable
- [x] `[...]` holds content (markup); `{...}` holds a sequence of code statements
- [ ] `[...]` is for functions, `{...}` is for variables
> Content blocks produce markup output; code blocks run statements and evaluate to their last expression.
```

## What to remember

- `#` switches from markup to code; parenthesize an expression with `#(...)` if it's ambiguous where it ends.
- `#let` defines variables and functions; a function's body can be an expression, a `{ }` code block, or a `[ ]`
  content block.
- `[...]` is content, `{...}` is code — you'll nest them inside each other all the time.
- `#for`/`#if` work directly in markup when followed by a content block.
- Arrays and dictionaries come with the methods you'd expect: `.map()`, `.filter()`, `.sum()`, `.join()`, `.at()`.
