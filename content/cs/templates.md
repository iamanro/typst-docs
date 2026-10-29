---
title: Napište šablonu
description: Zabalte styl svého článku do jedné funkce a pak ji aplikujte na celý dokument jediným show pravidlem.
section: learn-typst
order: 8
related: [show-rules, set-rules, page-setup]
---

Vše na této stránce je funkce, která vezme zbytek dokumentu a vrátí ho předělaný. To je šablona: funkce, jejíž
poslední parametr je tělo dokumentu, aplikovaná jedenkrát pomocí `#show: moje-sablona.with(...)`. Jednotlivé
části jste už viděli — [set pravidla](/set-rules), [show pravidla](/show-rules), funkce z
[první lekce](/markup-and-code) — šablona je jen sesbírá na jedno místo, abyste neopakovali formátovací pravidla
časopisu v každém článku, který píšete.

## Nejjednodušší případ

Funkce, která svůj argument do něčeho zabalí, je už šablonou v tom smyslu, jak to Typst chápe:

```typ example
#let poznamka(telo) = rect(inset: 8pt, radius: 4pt, fill: rgb("#eef"))[#telo]

#show: poznamka

Celý zbytek stránky je obalen šablonovou funkcí.
```

`#show: poznamka` (bez selektoru před dvojtečkou) znamená „aplikuj tuto funkci na všechno od teď dál“. Je to
show pravidlo, které jste potkali v [předchozí lekci](/show-rules), jen bez konkrétního prvku k zacílení.

## Skutečná šablona článku

Užitečná šablona obvykle bere konfiguraci — název, autory, třeba abstrakt — jako pojmenované argumenty, s tělem
dokumentu jako posledním, nepojmenovaným. Uvnitř pár set pravidel určí vzhled, pak se vloží `doc`.

```typ example
#let sablona(
  title: none,
  authors: (),
  abstract: none,
  doc,
) = {
  set page(width: 12cm, height: auto, margin: 8mm)
  set text(size: 10pt)
  set par(justify: true)
  set heading(numbering: "1.")

  align(center)[
    #text(14pt, weight: "bold")[#title]
    #v(6pt)
    #authors.join(", ")
  ]

  if abstract != none {
    v(10pt)
    pad(x: 8pt)[*Abstrakt.* #abstract]
  }

  v(12pt)
  doc
}

#show: sablona.with(
  title: "Difuze v tenkých vrstvách",
  authors: ("A. Nováková", "B. Svoboda"),
  abstract: [Zkoumáme difuzní koeficienty v tenkých polymerních vrstvách za různých teplot.],
)

= Úvod
Difuzní procesy jsou klíčové pro pochopení chování tenkých vrstev.

= Metody
Použili jsme standardní čtyřbodovou sondu.
```

Fungují tu tři věci:

- `title`, `authors` a `abstract` mají výchozí hodnoty (`none` nebo `()`), takže volající může ty, které
  nepotřebuje, vynechat.
- `doc` nemá výchozí hodnotu a je poslední — Typst dovolí poslednímu parametru funkce zůstat nepojmenovaný, takže
  `#show: sablona.with(title: ..., authors: ...)` může `doc` nechat na show pravidlu, aby ho doplnilo zbytkem
  dokumentu.
- Set pravidla uvnitř `sablona` jsou omezená na tělo funkce (viz [set pravidla](/set-rules)), takže platí pro
  `doc` a vše v něm, aniž by unikla ven, pokud by `sablona` byla někdy zavolaná zevnitř něčeho jiného.

## `.with(...)`

`sablona.with(title: "...", authors: (...))` nevolá samotnou `sablona` — vrátí *novou funkci* s těmito argumenty předem
vyplněnými, pořád čekající na `doc`. To je přesně tvar, jaký `#show: ...` potřebuje: funkce jednoho argumentu
(tělo dokumentu). `.with(...)` použijete pokaždé, když chcete funkci částečně aplikovat, než ji předáte show
pravidlu.

## Jeden soubor, jedna šablona, znovupoužití

Ve větším projektu byste dali `sablona` do vlastního souboru a na začátek každého článku napsali `#import
"sablona.typ": sablona`, takže každý dokument v projektu sdílí jednu definici — šablonu změníte jednou a každý
článek, který ji importuje, změnu převezme. Příklady na této stránce drží vše v jednom souboru jen proto, že
samostatná ukázka nemůže odkazovat na druhý soubor.

## Zkuste si to sami

1. Napište šablonovou funkci s jedním pojmenovaným argumentem (třeba `title`) a parametrem těla `doc`, a
   aplikujte ji pomocí `#show: vase-sablona.with(title: "...")`.
2. Přidejte druhý pojmenovaný argument s výchozí hodnotou (třeba `subtitle: none`) a předávejte ho jen někdy.
3. Uvnitř své šablony přidejte set pravidlo pro `text` nebo `par` a ověřte, že platí i pro vložené tělo dokumentu.

## Ověřte si porozumění

```quiz
Proč je parametr `doc` poslední a nepojmenovaný?
- [x] Aby ho `#show: sablona.with(ostatni: argumenty)` mohl doplnit později, jako funkci, kterou Typst zavolá se zbytkem dokumentu
- [ ] Protože Typst vyžaduje, aby první parametr byl pojmenovaný
- [ ] Je to jen stylová konvence bez funkčního dopadu
> `.with(...)` vrátí funkci stále čekající na zbývající parametr; ponechání `doc` nepojmenovaného a posledního je to, co umožní show pravidlu ho doplnit.
```

```quiz
Co přesně dělá `#show: sablona.with(title: "Článek")`?
- [ ] Okamžitě vykreslí dokument s názvem „Článek“
- [x] Aplikuje `sablona`, předem vyplněnou `title: "Článek"`, na zbytek dokumentu
- [ ] Nastaví vlastnost stránky jménem `title`
> `.with(...)` částečně aplikuje funkci; `#show: ...` (bez selektoru) ji pak spustí na všechno, co následuje ve zdroji.
```

## Co si zapamatovat

- Šablona je funkce, jejíž poslední parametr je tělo dokumentu, aplikovaná pomocí `#show: sablona.with(...)`.
- `.with(...)` částečně aplikuje pojmenované argumenty a vrací funkci stále čekající na `doc`.
- Výchozí hodnoty (`none`, `()`, nebo konkrétní výchozí hodnota) dovolí volajícím vynechat argumenty, které
  nepotřebují.
- Set pravidla uvnitř těla šablony jsou omezená na ni, takže stylují `doc`, aniž by unikla do toho, co šablonu
  volá.
- Ve skutečných projektech definujte šablonu jednou ve vlastním souboru a `#import` ji do každého dokumentu, který
  ji používá.
