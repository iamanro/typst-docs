---
title: Figures that communicate
description: What makes a figure readable at a glance, how to write captions that pull their weight, and a Typst example to check against.
section: research-writing
order: 3
related: [figures-and-images, cite-responsibly, appendix]
---

A reader who understands your Results section without reading its prose has a good set of figures. That's the bar: a figure should carry the finding, and the caption should carry enough context that the figure works even if someone screenshots it out of the paper.

## One figure, one point

Each figure should make one claim obvious. If you're tempted to cram three comparisons into one plot "to save space," you're usually hiding the real finding behind two others nobody asked for. Split it into two figures, or move the secondary comparison to supplementary material. Readers remember the one thing a figure showed them; they don't remember the fourth line in a six-line legend.

Keep labels legible at the final print size, not the size you see while editing. A plot that looks fine at full screen can become unreadable at two columns wide. If you're placing a figure with Typst's [`figure`](/figures-and-images) function, check it at the page width the template actually uses, not a wider draft layout.

## Captions do real work

A caption is not a title. It should let the figure stand alone:

- **What's plotted** — axes, units, what a line or color means, if not obvious from the figure itself.
- **How it was produced**, in one clause, if that matters for interpretation ("averaged over 20 runs", "n = 340").
- **The takeaway**, in plain language, especially for figures with a lot of visual detail. "Error rate drops sharply above 10 samples per class" is more useful at the end of a caption than making the reader derive it from the curve.

```typ example
#figure(
  rect(width: 4cm, height: 2.5cm, fill: luma(240), stroke: 0.5pt)[
    #place(bottom + left, dx: 0.3cm, dy: -0.3cm)[Y]
    #place(bottom + right, dx: -0.3cm, dy: -0.3cm)[X]
  ],
  caption: [
    Accuracy (Y) as a function of training set size (X), averaged
    over 20 runs. Accuracy plateaus beyond 10,000 examples.
  ],
) <fig-schematic>

As shown in @fig-schematic, returns diminish quickly.
```

Typst numbers and links figures automatically through `#figure` and `@` references — you never write "Figure 3" by hand, so a reordered or deleted figure can't leave a stale number behind. That's one less thing to check in a final read-through; it doesn't replace writing an informative caption yourself.

## Design for grayscale and color blindness

A meaningful fraction of readers either print in grayscale or can't distinguish red from green. Encode the key distinction with shape, pattern, or position as well as color — dashed versus solid lines, filled versus open markers — so the figure survives being printed badly or viewed by someone with deuteranopia. If you must rely on color alone, choose a palette designed for this (several are built from perceptual research rather than defaults) and say in the caption what each color means, since grayscale printing erases the legend's usefulness.

## Consistency across the paper

Use the same units, decimal precision, and axis conventions in every figure — if Figure 2 plots accuracy as a percentage and Figure 5 plots it as a fraction, a reader has to stop and recheck which is which. The same goes for terminology: if you call something "condition A" in the Methods, don't rename it "baseline" in a figure. Small inconsistencies like this are what peer reviewers flag first, because they suggest the figures were made at different times without a final pass to reconcile them — see [answering peer review](/answer-peer-review) for how reviewers read figures.
