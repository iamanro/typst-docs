---
title: Oprava chyby „file not found“
description: Funkce, která čte externí soubor — image(), include, read(), bibliography() — dostala cestu, kterou se z aktuálního souboru nepodařilo najít.
section: typst-errors
related: [error-label-does-not-exist, figures-and-images, bibliography]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#image("figure.png")
```

Diagnostika uvádí přesnou cestu, kterou se Typst pokusil najít: `file not found (searched at /absolutní/cesta/k/figure.png)`.

## Co to znamená

Funkce jako `image()`, `include`, `read()` a `bibliography()` berou cestu a hledají ji **relativně k souboru, který je volá**, ne relativně k vašemu terminálu nebo kořeni projektu. Pokud soubor na daném místě není — špatná složka, špatné jméno, špatná přípona, nebo nebyl vůbec uložen — kompilace se zastaví s touto chybou a ukáže absolutní cestu, kterou hledala, což je nejrychlejší způsob, jak chybu najít.

## Časté příčiny

**Relativní cesta, která neodpovídá skutečné struktuře složek.** Pokud dokument leží v `paper/main.typ` a obrázek v `paper/figures/plot.png`, volání potřebuje `image("figures/plot.png")`, ne `image("plot.png")`.

**Překlep v názvu souboru nebo příponě**, včetně velikosti písmen — `Figure.PNG` a `figure.png` jsou na systémech rozlišujících velikost písmen (většina serverů i lokálně na Linuxu) dva různé soubory.

**Soubor opravdu ještě neexistuje.** Pro příklady a laboratoře na tomto webu (a kdekoliv, kam nelze přibalit další soubory) sestavte obrazová data přímo, místo odkazu na cestu:

```typ example
#image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><rect width=\"40\" height=\"40\" fill=\"steelblue\"/></svg>"))
```

`image()` přijímá kromě cesty i surová data, takže vložené SVG (nebo jiný zakódovaný obrázek) se souborovému systému úplně vyhne — užitečné pro šablony a reprodukovatelné ukázky, které nesmí záviset na externích souborech.

## Zkontrolujte si porozumění

```quiz
Váš dokument je v `report/main.typ` a logo v `report/assets/logo.png`. Které volání funguje?
- [ ] `image("logo.png")`
- [x] `image("assets/logo.png")`
- [ ] `image("report/assets/logo.png")`
> Cesty se řeší relativně k souboru, který je volá, takže z `report/main.typ` potřebujete jen část za `report/`.
```
