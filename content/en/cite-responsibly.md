---
title: Cite responsibly
description: What a citation owes the reader, how to avoid common citation sins, and how Typst's bibliography keeps you honest.
section: research-writing
order: 4
related: [bibliography, tutorial/citations, structure-a-paper]
---

A citation is a promise: "if you check this source, you'll find what I'm claiming." Broken promises — wrong attributions, citations that don't actually support the claim, or that cite a retracted paper as valid — are the fastest way to lose a reviewer's trust, and they're avoidable with a bit of discipline.

## Cite the claim, not the vibe

Every citation should support a specific, checkable claim in your sentence, not just gesture at "related work in this area." If you write "deep learning has transformed NLP [12]", ask what [12] is actually being cited for — a survey, a specific result, a historical first? Vague citations ("studies have shown...") are a sign the claim itself is underspecified; sharpen the sentence until it's clear exactly what the source needs to back up.

Common citation problems worth checking for before submission:

- **Citing a secondary source for a primary claim.** If you learned a fact from a review paper, check the review's own citation for that fact and cite the original if it's accessible — reviews sometimes mischaracterize what they cite.
- **Citing something you haven't read**, pulled from someone else's reference list. This is how citation errors propagate across a whole field; at minimum, read the abstract and check it supports your specific claim.
- **Over-citing yourself.** A couple of self-citations where genuinely relevant are normal; a reference list that's 40% your own lab is a signal reviewers (and editors) notice and sometimes ask about directly.
- **Citing a retracted or withdrawn paper** without saying so, usually by accident — citation managers don't always flag retractions. Worth a manual check for any paper central to your argument, especially if it's more than a few years old.

## Build the bibliography once, cite it everywhere

Typst's `bibliography()` function reads a `.bib` (or Hayagriva `.yml`) file and typesets both the in-text citations and the reference list from the same source, in whatever style the target venue requires — so a typo in an author's name only needs fixing in one place.

```typ example
#bibliography(bytes("@article{doe2024,
  author = {Doe, Jane},
  title = {A Study of Things},
  journal = {Journal of Examples},
  year = {2024},
}"), style: "ieee")

As shown by @doe2024, this works.
```

This small example embeds the bibliography inline with `bytes(...)`; a real paper keeps it in its own `.bib` file and passes the path instead — see the [bibliography lesson](/bibliography) and the [citations tutorial step](/tutorial/citations) for the full workflow, including switching citation styles without retyping a single reference.

Because the reference list is generated, not hand-typed, a citation key that doesn't exist in your `.bib` file fails the build loudly instead of silently printing "[?]" in the PDF — see [fixing a missing label](/error-label-does-not-exist) if that happens with a figure or equation reference instead of a citation.

## Czech-specific note

If you're writing for a Czech institution or journal that still asks for references formatted per **ČSN ISO 690**, check whether Hayagriva ships a style matching it before hand-formatting; if not, the IEEE or APA styles that ship with Typst are close enough for a draft, and you can request the exact format as a copy-edit step before final submission rather than fighting the style file for a one-off thesis.
