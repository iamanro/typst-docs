---
title: Write an abstract
description: A one-paragraph recipe for abstracts — what the four sentences are, why they're written last, and a draft you can tighten.
section: research-writing
order: 2
related: [structure-a-paper, cite-responsibly]
---

An abstract is read far more often than the paper itself — by reviewers deciding whether to accept the invitation, by readers deciding whether to open the PDF, by search engines deciding where to rank it. It earns that attention by compressing the whole paper into roughly 150–250 words, not by teasing it.

## Four sentences, in order

Most good abstracts answer four questions, in this order, usually one or two sentences each:

1. **What's the problem?** The gap or question the paper addresses, stated so a non-specialist in the field can follow it.
2. **What did you do?** The method, in one sentence — not the full recipe, just enough to signal the approach (a user study, a proof, a simulation, a survey of N papers).
3. **What did you find?** The headline result, with a number or direction if you have one ("accuracy improved by 12%", not "accuracy improved").
4. **Why does it matter?** The implication — for the field, for practice, or for future work.

Skip background you'd put in the introduction, skip citations (most venues disallow them in the abstract), and skip hedging words that do no work ("it is shown that", "we believe that"). State results directly: "X reduces Y" reads better than "we believe X may reduce Y."

## Write it last

The abstract summarizes a paper that, if you write it first, doesn't exist yet. Draft it after the [structure](/structure-a-paper) is in place and the Results and Discussion sections are at least roughly final — otherwise you'll rewrite the abstract every time a number changes. A useful trick: once the paper is done, copy the first sentence of your introduction, the last sentence of your methods, your single strongest result, and the first sentence of your discussion into one paragraph. That's a rough draft; tighten it from there.

## A worked example

Weak:

> In this paper we investigate the interesting problem of citation errors in academic writing. We believe this is an important topic that has not received enough attention. We propose a method and show some results. Our findings have implications for the field.

Better:

> Citation errors — wrong page numbers, misattributed quotes, retracted sources cited as valid — appear in an estimated 15% of references in published papers, yet no lightweight check exists for authors to run before submission. We built a Typst package that cross-checks citation keys against a bibliography file and flags retracted DOIs using the Retraction Watch database. Across 40 manuscripts, it caught 23 errors that passed human proofreading. Journals could adopt this as a pre-submission check at near-zero cost.

The second version names the gap, the method, a concrete number, and a concrete implication — no sentence is wasted on throat-clearing.

## Length and format vary by venue

Some venues cap abstracts at 150 words; others allow 300 and expect structured subheadings (Background, Methods, Results, Conclusion) for a [structured abstract](/structure-a-paper). Check the submission instructions before polishing — cutting a 250-word abstract to 150 after the fact is harder than drafting to the limit from the start. In Typst, keep the abstract as a normal paragraph (or a `#heading` of its own if the template asks for one); there's no special abstract element to learn, so the writing is the whole task.
