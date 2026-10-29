---
title: Citujte zdroje s bibliografií
description: Přidejte seznam literatury ve stylu BibTeXu, citujte záznamy pomocí @klic a formátujte citace v konkrétním stylu.
section: learn-typst
order: 7
related: [figures-and-images, templates]
---

Typst umí číst záznamy bibliografie ve formátu BibTeX nebo Hayagriva a zbytek udělá sám — číslování, formátování
citací i sestavení seznamu literatury. Ve skutečném dokumentu necháte `#bibliography(...)` ukázat na soubor `.bib`;
příklady zde vkládají stejný BibTeX zdroj jako řetězec pomocí `bytes(...)`, protože samostatná ukázka nemůže
odkazovat na externí soubor.

```typ example
Jak ukázal @knuth1984, literární programování propojuje kód a prózu.

#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }"
))
```

`@knuth1984` cituje záznam podle jeho klíče z BibTeXu. Nezáleží na tom, kde v dokumentu je samotné
`#bibliography(...)` umístěno — citace před ním se vyřeší stejně — ale podle konvence patří na konec.

## Více záznamů, styl citací

Soubor `.bib` obvykle obsahuje mnoho záznamů; `@klic` funguje stejně pro kterýkoli z nich. `#set
bibliography(style: ...)` přepne celý seznam literatury (i každou citaci v textu) na pojmenovaný styl — zabudované
jsou `"ieee"`, `"apa"`, `"chicago-author-date"` a další.

```typ example
#set bibliography(style: "ieee")

Viz @knuth1984 a @einstein1905.

#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }
  @article{einstein1905,
    author = {Albert Einstein},
    title = {Zur Elektrodynamik bewegter K{\"o}rper},
    journal = {Annalen der Physik},
    year = {1905},
    volume = {322},
    number = {10},
    pages = {891--921},
  }"
))
```

## Citace konkrétní stránky

Přidejte lokátor v hranatých závorkách za klíč, abyste citovali stránku nebo část zdroje, kterou zvolený styl
správně naformátuje (`s. 5`, `s. 5–6`, apod.).

```typ example
Viz @knuth1984[s. 5] pro klíčový argument.

#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }"
))
```

Pro větší kontrolu — třeba citaci uvnitř věty místo v závorkách — dá `#cite(<klic>, form: "prose")` stejný výsledek
jako `@klic`, jen s možnostmi vypsanými explicitně.

## Výpis zdrojů, které jste necitovali

Předejte `full: true` pro výpis každého záznamu v souboru bibliografie, i těch, na které jste se nikdy neodkázali
přes `@klic` — hodí se pro seznam „další literatura“, nebo při psaní, než jsou všechny zdroje citované.

```typ example
#bibliography(bytes(
  "@article{knuth1984,
    author = {Donald E. Knuth},
    title = {Literate Programming},
    journal = {The Computer Journal},
    year = {1984},
    volume = {27},
    number = {2},
    pages = {97--111},
  }"
), full: true)
```

## Zkuste si to sami

1. Napište bibliografii se dvěma záznamy BibTeXu (použijte `bytes(...)`, jako výše) a citujte oba někde ve větě.
2. Přepněte styl na `"apa"` a porovnejte formátování citace i seznamu literatury se stylem `"ieee"`.
3. Citujte jeden záznam s lokátorem stránky, například `@klic[s. 12]`.

## Ověřte si porozumění

```quiz
Jak citujete záznam bibliografie s klíčem `smith2020`?
- [x] `@smith2020`
- [ ] `#cite("smith2020")`
- [ ] `<smith2020>` kdekoli v textu
- [ ] `[smith2020]`
> `@klic` je syntaxe pro citaci; `<klic>` slouží k opatření vlastního obsahu štítkem, jako jsou obrázky, ne k citování zdroje.
```

```quiz
Co dělá `#bibliography(..., full: true)`?
- [ ] Zobrazí plný text každého citovaného zdroje
- [x] Vypíše každý záznam v souboru, i ty nikdy necitované přes `@klic`
- [ ] Přepne na podrobnější citační styl
> `full: true` zahrne do seznamu literatury i necitované záznamy, místo jen těch, na které jste se skutečně odkázali.
```

## Co si zapamatovat

- `#bibliography("zdroje.bib")` čte záznamy BibTeXu nebo Hayagrivy; `bytes("...")` vloží zdroj přímo, když
  neexistuje soubor.
- Citujte záznam kdekoli přes `@klic`; přidejte lokátor jako `@klic[s. 5]` pro konkrétní stránku.
- `#set bibliography(style: "ieee" | "apa" | "chicago-author-date" | ...)` změní formátování citací i seznamu
  literatury všude.
- `full: true` vypíše každý záznam, včetně těch necitovaných.
- Na tom, kde v kódu je `#bibliography(...)` umístěné, pro vyřešení citací nezáleží, ale konvence ho dává na konec.
