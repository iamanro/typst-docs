---
title: Oprava hlášky „document did not converge within five attempts"
description: Varování — nějaká hodnota ve vašem dokumentu (často z context, state nebo query) závisí na svém vlastním výsledném rozvržení, takže se Typstovo opakované překládání nikdy neustálí.
section: typst-errors
related: [page-numbers, table-of-contents, error-unknown-font-family]
---

Spuštění Typstu 0.15.1 na tomto dokumentu:

```typ
#context {
  let elems = query(heading)
  let count = 1 + elems.len()
  count * [= Heading]
}
```

vypíše, a přesto vytvoří PDF s tím, co vzešlo z pátého pokusu:

```
warning: document did not converge within five attempts
 = hint: see 1 additional warning for more details
 = hint: see https://typst.app/help/convergence for help

warning: number of heading elements did not stabilize
  ┌─ main.typ:2:14
  │
2 │   let elems = query(heading)
  │               ^^^^^^^^^^^^^^
  │
  = hint: the following numbers of elements were observed:
    - run 1: 0
    - run 2: 1
    - run 3: 2
    - run 4: 3
    - run 5: 4
    - final: 5
```

## Co to znamená

Typst dokument nejdřív rozvrhne a pak zkontroluje, jestli by se něco, co závisí na *výsledku* rozvržení (čísla stránek zobrazená v obsahu, `here().position()`, state přečtený poté, co byl aktualizován, výsledky query), změnilo, kdyby rozvrhoval znovu s touto novou informací. Pokud ano, zopakuje to — až pětkrát — v naději, že se hodnoty ustálí. „Did not converge" znamená, že se měnily při každém pokusu; Typst to vzdá a použije poslední verzi, která může být jemně špatně (číslo stránky posunuté o jednu, mírně posunutý obsah).

## Časté příčiny

**Vyhledání elementů pomocí query a následné vytvoření dalších elementů stejného druhu**, jako v příkladu výše: počet nadpisů při každém pokusu závisí na výsledku query z předchozího pokusu, takže dokument při každém průchodu naroste o jeden nadpis a nemá se k čemu ustálit. Nenechte výsledek query zpětně ovlivňovat, kolik odpovídajících elementů se vytvoří.

**`state`, který uvnitř stejného `context` zároveň čte svou aktuální hodnotu a aktualizuje ji.** Dávejte přednost funkční podobě aktualizace — `my-state.update(old => ...)` — před čtením, výpočtem a nastavením v oddělených krocích, protože funkční podoba se vyhodnotí jednou za průchod rozvržením místo přenášení zastaralé přečtené hodnoty.

**Obsah, číslování nadpisů nebo osnova závislá na informaci, kterou lze zjistit až po umístění samotné osnovy** — například číslování měnící se podle toho, na jakou stránku nadpis vyjde. Udržujte číslování a další stav ovlivňující osnovu nezávislý na pozici osnovy samotné.

## Co si zapamatovat

- „Document did not converge" je varování: Typst pořád vytvoří PDF, ale možná ne tak, jak čekáte.
- Stává se to, když něco závislého na rozvržení (pozice, state, query) zpětně ovlivňuje rozvržení, ze kterého to vzešlo.
- Doprovodné varování „did not stabilize" jmenuje přesný `context` nebo state, který za to může — začněte tam.
