---
title: Build tables
description: Rows, columns, headers, alternating fills, merged cells — everything you need for a results table.
section: learn-typst
order: 5
related: [page-setup, figures-and-images, set-rules]
---

`#table(...)` takes a column count and then a flat list of cells, filled row by row, left to right.

```typ example
#table(
  columns: 3,
  [Name], [Age], [City],
  [Alice], [30], [Prague],
  [Bob], [25], [Brno],
)
```

By default columns share the available width equally and cells have no border. Both are easy to change.

## Column widths

`columns` can be a number (equal fractional columns), or an array mixing fixed lengths and fractional (`fr`)
units — the same sizing language used elsewhere in Typst.

```typ example
#table(
  columns: (1fr, 2fr, auto),
  [A], [A column twice as wide], [Fits content],
  [B], [Second row], [x],
)
```

## A real header row

`table.header(...)` marks the first row as a header — it repeats if the table breaks across pages, and is the
natural place to put column titles. `stroke` draws cell borders.

```typ example
#table(
  columns: 3,
  stroke: 0.5pt,
  table.header[Name][Age][City],
  [Alice], [30], [Prague],
  [Bob], [25], [Brno],
)
```

## Alignment and fills

`align` and `fill` can take a single value for the whole table, or a function of `(col, row)` for per-cell
control — handy for right-aligning numbers or shading the header row.

```typ example
#table(
  columns: (1fr, 1fr, 1fr),
  align: (left, center, right),
  fill: (col, row) => if row == 0 { rgb("#e8e8e8") } else { none },
  table.header[Name][Age][City],
  [Alice], [30], [Prague],
  [Bob], [25], [Brno],
)
```

`stroke` accepts the same kind of function, so you can draw only the lines you want — a rule under the header, and
nothing between data rows, for example — by returning different stroke values depending on `(x, y)`.

```typ example
#table(
  columns: 2,
  stroke: (x, y) => if y == 0 { (bottom: 1pt) } else { none },
  [Length], [12cm],
  [Width], [8cm],
)
```

## Merged cells

`table.cell(colspan: n)[...]` spans a cell across several columns — useful for a title row above the real data.

```typ example
#table(
  columns: 2,
  stroke: (x, y) => if y == 0 { (bottom: 1pt) } else { 0.5pt + gray },
  table.cell(colspan: 2)[*Measurements*],
  [Length], [12cm],
  [Width], [8cm],
)
```

`rowspan` works the same way, vertically, when you call `table.cell(rowspan: n)`.

## Tables as figures

A table is almost always captioned and numbered, which means wrapping it in [`figure`](/figures-and-images) rather
than using `#table(...)` bare — see the next lesson for how captions and cross-references work.

## Try it yourself

1. Build a three-column table with a header row and at least two data rows, with `stroke: 0.5pt`.
2. Make the last column right-aligned using a function passed to `align`.
3. Add a title row above your table's header using `table.cell(colspan: ...)`.

## Check your understanding

```quiz
How do you make only the header row shaded differently from the rest?
- [ ] You can't; fill applies uniformly to the whole table
- [x] Pass a function `(col, row) => ...` to `fill` and branch on `row`
- [ ] Wrap the header cells in `#highlight(...)`
> `fill` (and `stroke`, `align`) accept a function of the cell's column and row index for per-cell control.
```

```quiz
What does `table.cell(colspan: 2)[...]` do?
- [x] Makes that cell span two columns wide
- [ ] Creates two separate cells with the same content
- [ ] Doubles the cell's font size
> `colspan` (and `rowspan`) let a single cell occupy more than one column or row of the grid.
```

## What to remember

- `#table(columns: n, ...)` fills cells row by row; `columns` can mix fixed and `fr` widths.
- `table.header(...)` marks the header row, which repeats across page breaks.
- `align`, `fill`, and `stroke` accept either a single value or a `(col, row)` function for per-cell styling.
- `table.cell(colspan:, rowspan:)` merges cells across columns or rows.
- Wrap a table in [`figure`](/figures-and-images) when it needs a caption and a number.
