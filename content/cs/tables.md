---
title: Vytvářejte tabulky
description: Řádky, sloupce, záhlaví, střídavé podbarvení, sloučené buňky — vše, co potřebujete pro tabulku s výsledky.
section: learn-typst
order: 5
related: [page-setup, figures-and-images, set-rules]
---

`#table(...)` bere počet sloupců a pak plochý seznam buněk, vyplněný řádek po řádku, zleva doprava.

```typ example
#table(
  columns: 3,
  [Jméno], [Věk], [Město],
  [Alice], [30], [Praha],
  [Bob], [25], [Brno],
)
```

Ve výchozím stavu sdílejí sloupce dostupnou šířku rovným dílem a buňky nemají okraj. Obojí lze snadno změnit.

## Šířky sloupců

`columns` může být číslo (stejně široké sloupce), nebo pole kombinující pevné délky a poměrné jednotky (`fr`) —
stejný jazyk pro velikosti, jaký se používá jinde v Typstu.

```typ example
#table(
  columns: (1fr, 2fr, auto),
  [A], [Sloupec dvakrát širší], [Padne podle obsahu],
  [B], [Druhý řádek], [x],
)
```

## Skutečný řádek záhlaví

`table.header(...)` označí první řádek jako záhlaví — opakuje se, pokud se tabulka zalomí přes více stránek, a je
přirozeným místem pro názvy sloupců. `stroke` kreslí okraje buněk.

```typ example
#table(
  columns: 3,
  stroke: 0.5pt,
  table.header[Jméno][Věk][Město],
  [Alice], [30], [Praha],
  [Bob], [25], [Brno],
)
```

## Zarovnání a podbarvení

`align` a `fill` mohou mít jednu hodnotu pro celou tabulku, nebo funkci `(col, row)` pro kontrolu po buňkách —
hodí se to pro zarovnání čísel doprava nebo podbarvení řádku záhlaví.

```typ example
#table(
  columns: (1fr, 1fr, 1fr),
  align: (left, center, right),
  fill: (col, row) => if row == 0 { rgb("#e8e8e8") } else { none },
  table.header[Jméno][Věk][Město],
  [Alice], [30], [Praha],
  [Bob], [25], [Brno],
)
```

`stroke` přijímá podobnou funkci, takže můžete nakreslit jen ty linky, které chcete — třeba čáru pod záhlavím a nic
mezi datovými řádky — tak, že vrátíte různé hodnoty podle `(x, y)`.

```typ example
#table(
  columns: 2,
  stroke: (x, y) => if y == 0 { (bottom: 1pt) } else { none },
  [Délka], [12cm],
  [Šířka], [8cm],
)
```

## Sloučené buňky

`table.cell(colspan: n)[...]` roztáhne buňku přes několik sloupců — užitečné pro titulní řádek nad skutečnými daty.

```typ example
#table(
  columns: 2,
  stroke: (x, y) => if y == 0 { (bottom: 1pt) } else { 0.5pt + gray },
  table.cell(colspan: 2)[*Měření*],
  [Délka], [12cm],
  [Šířka], [8cm],
)
```

`rowspan` funguje stejně, jen svisle, když zavoláte `table.cell(rowspan: n)`.

## Tabulky jako obrázky (figures)

Tabulka bývá téměř vždy opatřená popiskem a číslem, což znamená zabalit ji do [`figure`](/figures-and-images)
místo použití samotného `#table(...)` — jak popisky a křížové odkazy fungují, je v další lekci.

## Zkuste si to sami

1. Vytvořte třísloupcovou tabulku se záhlavím a aspoň dvěma datovými řádky, se `stroke: 0.5pt`.
2. Zarovnejte poslední sloupec doprava pomocí funkce předané do `align`.
3. Přidejte titulní řádek nad záhlaví tabulky pomocí `table.cell(colspan: ...)`.

## Ověřte si porozumění

```quiz
Jak docílíte, aby bylo podbarvené jen záhlaví, odlišně od zbytku tabulky?
- [ ] Nejde to; podbarvení platí jednotně pro celou tabulku
- [x] Předáte do `fill` funkci `(col, row) => ...` a větvíte podle `row`
- [ ] Obalíte buňky záhlaví do `#highlight(...)`
> `fill` (a `stroke`, `align`) přijímají funkci indexu sloupce a řádku buňky pro kontrolu po jednotlivých buňkách.
```

```quiz
Co dělá `table.cell(colspan: 2)[...]`?
- [x] Roztáhne tu buňku přes dva sloupce na šířku
- [ ] Vytvoří dvě samostatné buňky se stejným obsahem
- [ ] Zdvojnásobí velikost písma v buňce
> `colspan` (a `rowspan`) umožní jedné buňce zabrat víc než jeden sloupec nebo řádek mřížky.
```

## Co si zapamatovat

- `#table(columns: n, ...)` vyplňuje buňky řádek po řádku; `columns` může kombinovat pevné a `fr` šířky.
- `table.header(...)` označí řádek záhlaví, který se opakuje přes zalomení stránky.
- `align`, `fill` a `stroke` přijímají jednu hodnotu, nebo funkci `(col, row)` pro styl po buňkách.
- `table.cell(colspan:, rowspan:)` sloučí buňky přes sloupce nebo řádky.
- Zabalte tabulku do [`figure`](/figures-and-images), když potřebuje popisek a číslo.
