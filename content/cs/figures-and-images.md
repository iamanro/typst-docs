---
title: Obrázky
description: Popište a očíslujte jakýkoli obsah pomocí figure, odkažte se na něj štítkem a kreslete zástupnou grafiku bez externích souborů.
section: learn-typst
order: 6
related: [tables, page-setup, bibliography]
---

`#figure(...)` obalí jakýkoli obsah — obrázek, kresbu, tabulku — popiskem a automatickým číslem. Přesně to
použijete pro „Obrázek 1: ...“ v článku, a mechanismus je stejný bez ohledu na to, co je uvnitř.

```typ example
#figure(
  rect(width: 4cm, height: 2.5cm, fill: aqua, radius: 4pt),
  caption: [Zástupný obdélník.],
)
```

Typst nepotřebuje skutečnou fotku, aby ukázal, jak obrázky fungují — `rect`, `circle`, `line` a `curve` kreslí
přímo, což je navíc rychlý způsob, jak si nahrubo nakreslit diagram, aniž byste opustili editor.

```typ example
#figure(
  circle(radius: 1.5cm, fill: orange, stroke: 1pt + black),
  caption: [Kruh, nakreslený, ne importovaný.],
)
```

## Skutečné obrázky

`#image("cesta.png")` načte soubor vedle vašeho dokumentu. Pokud po ruce žádný soubor nemáte — nebo chcete
samostatnou ukázku, jako příklady na této stránce — `image(bytes("<svg ...>"))` přijme přímo zdrojový kód SVG, bez
nutnosti souboru:

```typ example
#figure(
  image(bytes("<svg xmlns='http://www.w3.org/2000/svg' width='120' height='80'>
    <rect width='120' height='80' fill='#eef'/>
    <circle cx='60' cy='40' r='28' fill='#36c'/>
  </svg>")),
  caption: [Obrázek načtený z vloženého SVG zdroje.],
)
```

Ve vlastních dokumentech téměř vždy použijete cestu k souboru; `bytes(...)` se hodí hlavně na generování obrázku z
dat přímo při sestavení dokumentu.

## Křížové odkazy

Opatřete obrázek štítkem `<nazev>` hned za ním a pak se na něj odkažte kdekoli přes `@nazev`. Typst sám doplní
„Obrázek 3“ (nebo jaké číslo je správně) a drží ho správné i po pozdějším přeskupení obrázků.

```typ example
#figure(
  rect(width: 3cm, height: 2cm, fill: aqua),
  caption: [Sestava.],
) <sestava>

Jak ukazuje @sestava, zařízení se vejde na standardní stůl.
```

## Styl číslování a nadřazené slovo

`#set figure(numbering: "1")` je výchozí stav; přepněte na `"I"` pro římské číslice nebo `"a"` pro písmena stejně
jako u [nadpisů](/show-rules). Tabulky dostanou vlastní počítadlo automaticky, když nastavíte `kind: table` —
hodí se, pokud chcete tabulku popsanou jako „Tabulka 1“ místo zahrnutí do číslování obrázků:

```typ example
#figure(
  rect(width: 3cm, height: 1.5cm, fill: green),
  caption: [Počítáno odděleně od obrázků.],
  kind: table,
  supplement: [Tabulka],
)
```

S `#set text(lang: "cs")` Typst automaticky použije slovo „Obrázek“ místo anglického „Figure“ jako nadřazené slovo
před číslem.

## Umístění

Ve výchozím stavu zůstane obrázek přesně tam, kam ho v textu umístíte. `placement: top` (nebo `bottom`) ho nechá
místo toho vznášet se k vrcholu nebo spodku stránky, podobně jako specifikátory `[t]`/`[b]` v LaTeXu:

```typ example
#figure(
  rect(width: 3cm, height: 2cm, fill: aqua),
  caption: [Vznáší se k vrcholu stránky.],
  placement: top,
)

Text těla, nad kterým se obrázek vznáší, bez ohledu na to, kde je tento odstavec v kódu.
```

## Zkuste si to sami

1. Vytvořte obrázek z `rect` nebo `circle`, dejte mu popisek, opatřete ho štítkem a odkažte se na něj přes `@štítek`
   ve větě.
2. Vytvořte jeden obrázek pomocí `image(bytes("<svg ...>"))` s vlastním jednoduchým tvarem.
3. Nastavte `kind: table` a `supplement: [Tabulka]` na obrázku obalujícím obdélník a porovnejte popisek s normálním
   obrázkem.

## Ověřte si porozumění

```quiz
Jak se odkážete na „Obrázek 2“, aniž byste číslo psali sami?
- [x] Opatříte obrázek štítkem `<nazev>` a odkážete se přes `@nazev`
- [ ] Ručně spočítáte obrázky nad ním a napíšete číslo
- [ ] Obrázky v Typstu nejde křížově odkazovat
> Typst sleduje počítadlo obrázků a doplní správné číslo u `@nazev`, automaticky aktualizované při přesunu obrázků.
```

```quiz
Jak vložíte obrázek bez samostatného souboru, pro samostatnou ukázku?
- [ ] Nejde to; `image()` vždy vyžaduje cestu k souboru
- [x] `image(bytes("<svg ...>"))` s vloženým zdrojem SVG
- [ ] Nakreslíte ho pomocí `#table()` místo toho
> `bytes(...)` umožní `image()` číst syrová obrazová data — včetně zdroje SVG — přímo z řetězce.
```

## Co si zapamatovat

- `#figure(obsah, caption: [...])` přidá popisek a automatické číslování k čemukoli, ne jen k obrázkům.
- `rect`, `circle`, `line` a `curve` kreslí přímo — užitečné pro diagramy bez externích souborů.
- `image(bytes("<svg ...>"))` načte vložený zdroj SVG, když není k dispozici soubor.
- Štítek přes `<nazev>`, odkaz přes `@nazev`; číslo se aktualizuje automaticky při změně pořadí.
- `placement: top`/`bottom` nechá obrázek vznášet se; `kind: table` mu dá vlastní počítadlo, oddělené od obrázků.
