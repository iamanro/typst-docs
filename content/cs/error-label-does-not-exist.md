---
title: Oprava chyby „label `<results>` does not exist in the document"
description: Odkázali jste na popisek pomocí @name dřív, než byl v dokumentu tímto popiskem cokoliv označeno.
section: typst-errors
related: [figures-and-images, bibliography, error-file-not-found]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
Viz @results pro podrobnosti.
```

## Co to znamená

`@results` je Typstova syntaxe pro odkazy: vyhledá element v dokumentu, který nese popisek `<results>` (nadpis, obrázek, rovnici, ...) a vloží na něj křížový odkaz. Pokud žádný element v dokumentu tento přesný popisek nemá, Typst odkaz nemůže sestavit a nahlásí ho jako chybějící.

## Časté příčiny

**Popisek nebyl k ničemu připojen.** Popisek za nadpisem, obrázkem nebo rovnicí ho k nim připojí; samotné `@results` bez odpovídajícího popisku nic nevytváří.

```typ example
#set heading(numbering: "1.")
= Výsledky <results>
Viz @results pro podrobnosti.
```

**Popisek je na elementu, který Typst neumí očíslovat.** Odkaz na nadpis vyžaduje aktivní `#set heading(numbering: ...)`, protože odkaz potřebuje něco zobrazit (standardně číslo). Obrázky se číslují automaticky, takže fungují i bez dalšího nastavení.

```typ example
#figure(
  rect(width: 2cm, height: 2cm),
  caption: [Čtverec.],
) <fig-square>
Viz @fig-square.
```

**Překlep mezi popiskem a odkazem.** `<results>` a `@result` (bez „s") jsou pro Typst dva různé popisky — jméno musí sedět přesně.

## Zkontrolujte si porozumění

```quiz
Napíšete `= Conclusion <concl>` a pak `@conclusion` (ne `@concl`). Co se stane?
- [x] Typst nahlásí, že popisek `<conclusion>` neexistuje
- [ ] Typst si sám domyslí nejbližší popisek
- [ ] Odkaz se tiše zobrazí prázdný
> Typst porovnává popisky podle přesného jména; `conclusion` a `concl` jsou pro něj dva různé popisky.
```
