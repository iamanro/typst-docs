---
title: Answer peer review
description: How to read a hostile review without panicking, structure a response letter, and typeset one with Typst.
section: research-writing
order: 5
related: [collaborate-with-coauthors, structure-a-paper, figures-that-communicate]
---

A review that lists ten problems with your paper is not, usually, ten reasons to reject it — most reviewers who bother to write detailed comments are trying to help the paper get accepted. Read it that way first, even when the tone is blunt. The response letter is where you show the editor you took the criticism seriously, not where you argue you were right all along.

## Read before you react

Read the whole review once without responding to anything, ideally a day apart from your first read if you have the time. First reactions to criticism are rarely the ones worth putting in a response letter. On the second read, sort comments into three buckets:

- **Clear fixes** — a missing citation, an unclear figure, a typo in an equation. Just fix these; don't argue.
- **Misunderstandings** — the reviewer read something differently than you intended. This usually means your writing was ambiguous, even if the reviewer's specific objection is wrong. Fix the text so the next reader can't misread it the same way, then explain the clarification in your response.
- **Genuine disagreements** — the reviewer wants an experiment you think is unnecessary, or disputes a claim you still believe. These need a real, evidenced argument in your response, not "we disagree." If you can run the requested experiment cheaply, running it is usually faster than arguing you shouldn't have to.

## Structure the response letter

Address every point, in the order the reviewer raised it, even ones you're not changing anything for. An unaddressed comment reads as "we ignored this" to a reviewer checking their own list on the second round. For each point: quote or paraphrase the comment, state what you changed (or why you didn't), and point to exactly where the change is in the revised paper.

```typ example
#let comment(n, body) = block(
  fill: luma(245), inset: 8pt, radius: 4pt,
)[*Reviewer comment #n:* #body]
#let response(body) = block(inset: (left: 8pt))[*Response:* #body]

#comment(1)[The introduction lacks motivation for why this
  problem matters outside the lab.]
#response[We added two sentences on p. 2 citing deployed
  systems affected by this issue (Section 1, paragraph 2).]

#comment(2)[Figure 3 is not explained in enough detail.]
#response[We rewrote the caption and added axis units
  (Section 4.1).]
```

Two reusable functions like these keep every reviewer comment and response visually consistent without retyping formatting each time, and they make it trivial to renumber if a reviewer's comments get reordered — change the argument, not the block structure.

## Track what's not resolved yet while drafting

While you're still working through a long list of comments, a simple marker keeps open items from getting lost in a draft you're editing over several days:

```typ example
#let todo(body) = text(fill: red, weight: "bold")[TODO: #body]

We reran the ablation with the requested baseline.
#todo[Still need the runtime numbers from Priya before
  this paragraph is final.]
```

Search for "TODO" before submitting the revision — an open one in a response letter is far more visible to an editor than it ever was to you while writing.

## Keep the tone professional, not deferential

You don't need to agree with every point to be civil about it. "We appreciate the reviewer's concern, but respectfully disagree, for the following reason: ..." is a complete, professional sentence — use it for genuine disagreements rather than either capitulating to a change you think would hurt the paper, or being curt. Editors read these letters too, and they're judging whether you engaged seriously, not whether you agreed with everything.
