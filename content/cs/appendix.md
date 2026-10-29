---
title: Přidání přílohy
description: Po hlavním textu vynulujte číslování nadpisů a přepněte na písmena, aby oddíly přílohy šly „A“, „B“ místo pokračování „7“, „8“.
section: typst-tips
order: 10
related: [heading-numbering, table-of-contents, footnotes]
---

Těsně před oddíly přílohy vynulujte počítadlo nadpisů a změňte formát číslování:

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.")
= Úvod
= Metody

#counter(heading).update(0)
#set heading(numbering: "A.")
= Dotazník
= Surová data
```

`counter(heading).update(0)` restartuje číslování na nulu, takže další nadpis bude „A“ místo pokračování v číslování kapitol; nové `#set heading(numbering: "A.")` pak od daného místa přepne styl z čísel na písmena.

## Udržení pořádku v obsahu

Pokud dříve v dokumentu voláte [`#outline()`](/table-of-contents), oddíly přílohy se v obsahu objeví i se svým písmenným číslováním — protože `#outline()` jen čte, jaké číslování je zrovna aktivní při vykreslení:

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.")
#outline()

= Úvod
= Metody

#counter(heading).update(0)
#set heading(numbering: "A.")
#heading(outlined: false)[Příloha]
= Dotazník
```

Neoznačený oddělovací nadpis „Příloha“ používá `outlined: false`, aby nezaplňoval obsah, zatímco očíslované oddíly pod ním se v obsahu dál zobrazují.

## Časté problémy

- Pouhé vynulování počítadla bez změny `numbering` jen znovu nastartuje arabskou řadu od „1“ — na písmenný styl potřebujete obojí, reset počítadla i nový formát.
- Reset proveďte hned na začátku přílohy, před prvním nadpisem `=`; reset až po prvním nadpisu přílohy způsobí, že ten první zůstane očíslovaný z hlavní řady.
- Pokud mají mít oddíly přílohy i vlastní restartované [číslování rovnic](/number-equations), vynulujte stejným způsobem `counter(math.equation)`.
