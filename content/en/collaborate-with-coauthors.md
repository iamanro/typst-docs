---
title: Collaborate with coauthors
description: Keeping a multi-author Typst paper from turning into conflicting copies — version control, visible comments, and who owns what.
section: research-writing
order: 6
related: [answer-peer-review, templates, structure-a-paper]
---

Typst files are plain text, which means the tools built for collaborating on code work for collaborating on a paper too — that's a real advantage over binary formats, but only if you and your coauthors actually use them instead of emailing `.typ` files back and forth with initials in the filename.

## Use version control, not "paper_v3_final_FINAL.typ"

Put the project in a Git repository (on GitHub, GitLab, or your institution's equivalent) from the first draft, not after things get confusing. Because Typst sources are plain text, diffs are readable — a coauthor can see exactly which sentences changed in a commit, the way they would for code, instead of comparing two whole documents by eye. This also means:

- Nobody overwrites someone else's edits by saving over a shared file at the wrong moment.
- Every version is recoverable — you can always go back to what the abstract said before last week's rewrite.
- Each coauthor can work on their section on a separate branch and merge, instead of taking turns with a single file.

If your coauthors aren't comfortable with Git, a shared folder (Dropbox, institutional storage) with one person responsible for merging changes is a weaker but workable fallback — the important part is a single agreed-upon current version, not the specific tool.

## Make open questions visible in the document itself

A question left in a chat message gets lost; a question left in the document gets seen by whoever opens it next. A small `todo` helper, defined once at the top of the file, turns any open issue into something that shows up in the compiled PDF in red, impossible to miss during a read-through:

```typ example
#let todo(body) = text(fill: red, weight: "bold")[TODO: #body]

The method section is complete.

#todo[Needs the IRB approval number — ask Sam.]

Results are drafted but the stats need a second pass.
#todo[Can we justify the sample size with a power analysis?]
```

Before submission, search the file for "TODO" (or add a check in your CI if the paper is built automatically) to make sure none slipped through to the final PDF — a stray red TODO in a submitted manuscript is a bad first impression for an editor.

## Agree on who owns which section

Even with good tooling, two people editing the same paragraph at the same time causes friction. Assign rough ownership of sections early — whoever collected the data writes Methods, whoever ran the analysis drafts Results — and treat edits outside your own section as suggestions via a comment or a `todo`, not silent rewrites, unless you've agreed otherwise. This matters more as the author list grows; a two-author paper can get away with looser norms than a six-author one.

## Keep formatting decisions in one place

If one coauthor changes the citation style or page margins locally to "see how it looks" and forgets to revert it, the next person who compiles the file gets a confusing diff that has nothing to do with content. Keep `#set` and `#show` rules — and any custom functions like `todo` above — in a clearly marked block at the top of the file, or in a separate file imported with `#import`, so formatting changes are easy to spot and revert separately from actual writing changes. See [templates](/templates) if your venue supplies one; adopting it early avoids a late scramble to reformat a nearly finished paper.
