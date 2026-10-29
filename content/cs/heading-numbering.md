---
title: Číslování nadpisů
description: Zapněte číslování oddílů ve stylu „1.1" jedním řádkem, vynechte úroveň nebo napište vlastní číslovací funkci pro každou úroveň.
section: typst-tips
order: 7
related: [table-of-contents, number-equations, appendix]
---

Nastavte `numbering` u `heading`, jen jednou. Každý `=`, `==`, `===` dostane číslo odpovídající jeho zanoření:

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.1")
= Úvod
== Pozadí
== Motivace
= Metody
```

Formátovací řetězec odpovídá hloubce zanoření: `"1.1"` čísluje dvě úrovně jako „1", „1.1", „1.2", „2"; pro hlubší zanoření přidejte další skupiny `.1`, nebo použijte `"1."` pro jednu plochou úroveň jako „1.", „2.", „3.".

## Různé styly podle úrovně

Pro kombinaci stylů — římské číslice u hlavních částí, arabské u oddílů pod nimi — předejte místo řetězce funkci. Dostane čísla nadpisu jako samostatné argumenty:

```typ example
#set text(lang: "cs")
#set heading(numbering: (..nums) => {
  let lvl = nums.pos().len()
  if lvl == 1 { numbering("I.", ..nums) } else { numbering("1.", nums.pos().last()) }
})
= Úvod
== Pozadí
= Metody
```

Nadpisy úrovně 1 se vytisknou jako „I.", „II."; nadpisy úrovně 2 se pod každým rodičem restartují na „1.".

## Vynechání jednoho nadpisu z číslování

Nadpis, který číslovat nechcete — „Poděkování" nebo „Abstrakt" — dostane přímo `numbering: none`, čímž přebije pravidlo platné pro celý dokument:

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.")
= Úvod
#heading(numbering: none)[Poděkování]
= Metody
```

Pořád se vytiskne normálně a pokud chcete, objeví se i v `#outline()`; prostě jen nemá číslo.

## Časté problémy

- Číslování sleduje *úroveň* nadpisu (`=`, `==`, ...), ne pořadí, v jakém oddíly píšete — přeskočení z `=` rovnou na `===` se stejně očísluje, jako by `==` existoval, s prázdnou prostřední skupinou.
- Pokud potřebujete nečíslovanou přílohu, která pak pokračuje písmeny, podívejte se na [přílohu](/appendix) — staví na `counter(heading).update(0)`.
- Změna číslovacího vzoru uprostřed dokumentu ovlivní jen nadpisy od daného místa dál; existující čísla nad ním styl zpětně nemění.
