---
title: Číslování stránek
description: Zapněte čísla stránek jedním nastavením, zvolte formát jako „1 / 1“ a v průběhu dokumentu styl změňte.
section: typst-tips
order: 2
related: [table-of-contents, landscape-pages, two-columns]
---

Nastavte jednou vlastnost `numbering` u stránky:

```typ example
#set text(lang: "cs")
#set page(numbering: "1", number-align: center)

= Ahoj
Tato stránka má teď dole uprostřed číslo.
```

Ve výchozím stavu se číslo zobrazí vycentrované v patě stránky. `numbering` přijímá stejný formátovací řetězec jako [číslování nadpisů](/heading-numbering): `"1"` pro arabské číslice, `"i"` pro malé římské, `"A"` pro písmena, nebo kombinaci jako `"1 / 1"` pro „stránka / celkem stránek“:

```typ example
#set text(lang: "cs")
#set page(numbering: "1 / 1")

= Zpráva
První stránka.
#pagebreak()
Druhá stránka.
```

## Restart nebo skrytí čísel

Titulní stránka obvykle nemá ukazovat „1“. Nastavte pro ni `numbering: none` a pak zapněte zpátky:

```typ example
#set text(lang: "cs")
#set page(numbering: "1", number-align: center)

= Titulní stránka
Tato stránka se počítá do celkového počtu, ale její číslo je skryté.
#pagebreak()
#set page(numbering: none)
Skryté i tady — třeba u obálky nebo abstraktu.
#pagebreak()
#set page(numbering: "1")
Číslování je zase vidět a pokračuje v počítání odtud.
```

Skrytí čísla stránku z počítání nevynechá — pořád zabírá místo v pořadí. Pokud chcete, aby úvodní část byla v římských číslicích a hlavní text začínal arabskou „1“, nastavte počítadlo ručně příkazem `#counter(page).update(1)` těsně před přepnutím formátu.

## Časté problémy

- `numbering: none` číslo jen skryje, stránka se pořád počítá — hodí se na titulní stránky, ne na vynechání stránek z číslování.
- Změna `numbering` platí jen od daného místa dál — pravidlo `#set page(..)` dejte těsně před oddíl, kde se má styl změnit.
- Pro jinou pozici čísla použijte `number-align` (třeba `top + right`), místo abyste si patu stránky stavěli sami.
