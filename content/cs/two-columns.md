---
title: Dokument ve dvou sloupcích
description: Přepněte text do dvou (nebo více) sloupců, vynuťte zlom sloupce a přesto nechte titulek nebo obrázek přetéct přes celou šířku.
section: typst-tips
order: 3
related: [page-numbers, landscape-pages, line-spacing]
---

Nastavte `columns` u stránky a každý odstavec za tím automaticky plyne do vyvážených sloupců:

```typ example
#set text(lang: "cs")
#set page(columns: 2)

= Výsledky
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
```

Typst nejdřív naplní první sloupec, pak začne druhý; při každé úpravě textu oba sloupce přetéká znovu, takže je nikdy nevyrovnáváte ručně.

## Vynucení zlomu sloupce

Příkazem `#colbreak()` posunete následující obsah do dalšího sloupce, stejně jako `#pagebreak()` posune na novou stránku:

```typ example
#set text(lang: "cs")
#set page(columns: 2)

Tohle zůstává v prvním sloupci.

#colbreak()

Tohle začíná nahoře v druhém sloupci, i když v prvním ještě bylo místo.
```

## Přetečení přes celou šířku

Titulek nebo široký obrázek často potřebuje sloupce ignorovat. Obalte ho příkazem `#place(top + center, scope: "parent", float: true)[..]`, aby se roztáhl přes celou šířku stránky:

```typ example
#set text(lang: "cs")
#set page(columns: 2)
= Výsledky
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#place(top + center, scope: "parent", float: true)[
  #rect(width: 100%, height: 2cm, fill: luma(230))[Obrázek přes oba sloupce]
]

Text pokračuje pod širokým obrázkem, stále ve dvou sloupcích.
```

`scope: "parent"` řekne Typstu, aby měřil proti celé stránce místo aktuálního sloupce; `float: true` nechá okolní text obtékat místo překrývání.

## Časté problémy

- `columns` u stránky ovlivní celý dokument od daného místa dál. Pro jednorázový vícesloupcový blok uprostřed jednosloupcové stránky použijte samostatnou funkci `#columns(2)[...]`.
- Velmi krátké oddíly mohou ve dvou sloupcích vypadat nevyváženě — Typst sice vyrovnává výšky sloupců, ale jeden krátký odstavec může skončit osamocený v jednom sloupci.
- Pro širokou tabulku, pokud sloupce samy nestačí, zkuste [stránky na šířku](/landscape-pages).
