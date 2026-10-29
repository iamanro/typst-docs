---
title: Číslování rovnic a odkazy na ně
description: Zapněte číslování rovnic jedním pravidlem, rovnici označte štítkem a odkažte se na ni pomocí @štítek — i s čísly podle kapitoly.
section: typst-tips
order: 6
related: [heading-numbering, footnotes, table-of-contents]
---

Nastavte `numbering` u `math.equation` a pak štítkem označte každou rovnici, která má mít číslo:

```typ example
#set text(lang: "cs")
#set math.equation(numbering: "(1)")

Vztah mezi hmotností a energií je
$ E = m c^2 $ <einstein>
a platí obecně.
```

Rovnice bez štítku viditelné číslo nedostane, i když je `numbering` zapnuté — počítají se a zobrazují se jen označené, takže vzorce v běžném textu zůstávají bez čísla.

## Odkaz na rovnici

Použijte `@štítek` stejně jako u obrázku nebo oddílu. Typst vloží správné číslo a udrží ho správné i při přidání nebo odebrání rovnic nad ním:

```typ example
#set text(lang: "cs")
#set math.equation(numbering: "(1)")

$ a^2 + b^2 = c^2 $ <pyth>
Jak ukazuje @pyth, vztah platí pro pravoúhlé trojúhelníky.
```

## Číslování podle kapitoly

Pro čísla ve stylu „(1.1)“, „(1.2)“, „(2.1)“, která se resetují po kapitolách, postavte formát z aktuálního počítadla [nadpisů](/heading-numbering):

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.")
= Fyzika

#set math.equation(numbering: n => numbering("(1.1)", counter(heading).get().first(), n))
Vztah mezi hmotností a energií je
$ E = m c^2 $ <einstein>
jak ukazuje @einstein.
```

Funkce dostane běžící počet rovnic `n`; spojením s `counter(heading).get().first()` získáte číslo aktuální kapitoly.

## Časté problémy

- Číslo se objeví jen u rovnic napsaných jako samostatný blok (`$ .. $` na vlastním řádku); matematika v běžném textu jako `$x + 1$` se nikdy nečísluje.
- Pokud se `@štítek` nepřeloží s chybou „cannot reference text“, skončil štítek na špatném řádku — dejte ho hned za uzavírací `$`, bez prázdného řádku mezi nimi.
- Čísla rovnic a [čísla nadpisů](/heading-numbering) jsou ve výchozím stavu nezávislá počítadla; propojí je až vzorec podle kapitoly výše.
