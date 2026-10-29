---
title: Add an appendix
description: Reset heading numbering after the main text and switch to letters, so appendix sections read "A", "B" instead of continuing "7", "8".
section: typst-tips
order: 10
related: [heading-numbering, table-of-contents, footnotes]
---

Reset the heading counter to zero and change the numbering pattern right before your appendix sections start:

```typ example
#set heading(numbering: "1.")
= Introduction
= Methods

#counter(heading).update(0)
#set heading(numbering: "A.")
= Survey questions
= Raw data
```

`counter(heading).update(0)` restarts numbering at zero so the next heading becomes "A" rather than continuing the chapter count; the new `#set heading(numbering: "A.")` then switches the style from numbers to letters from that point on.

## Keeping the table of contents in order

If you call [`#outline()`](/table-of-contents) earlier in the document, the appendix sections still get listed — with their letter numbering — because `#outline()` just reads whatever numbering is active when it renders:

```typ example
#set heading(numbering: "1.")
#outline()

= Introduction
= Methods

#counter(heading).update(0)
#set heading(numbering: "A.")
#heading(outlined: false)[Appendix]
= Survey questions
```

The unlabeled `Appendix` divider heading uses `outlined: false` so it doesn't clutter the contents list, while the lettered sections below it still show up.

## Pitfalls

- Resetting the counter without also changing `numbering` just restarts the Arabic sequence at "1" again — you need both lines, counter reset and new pattern, for the letter style.
- Do the reset at the very start of the appendix, before the first `=` heading; resetting after the first appendix heading leaves that one numbered from the main sequence.
- If appendix sections also need their own [equation numbering](/number-equations) restarted, reset `counter(math.equation)` the same way.
