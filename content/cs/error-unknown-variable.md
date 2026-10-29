---
title: Oprava chyby „unknown variable `x`"
description: Typst narazil na jméno, které nikde není definováno — obvykle překlep, chybějící #let, nebo proměnná použitá mimo svůj rozsah platnosti.
section: typst-errors
related: [error-unclosed-delimiter, error-unexpected-argument, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#x
```

## Co to znamená

Typst vyhodnotil identifikátor — v tomto případě `x` — a nenašel pro něj žádnou vazbu: není to vestavěná hodnota, nic jste mu nepřiřadili pomocí `#let`, není to parametr funkce ani pole slovníku. Stříška ukazuje přesně na jméno, které se nepodařilo rozpoznat.

## Časté příčiny

**Překlep ve jméně.** Typst nehádá, co jste mysleli; `#nazev-prace` a `#nazov-prace` jsou pro něj dvě různá, nesouvisející jména.

```typ example
#let nazev-prace = "Modely klimatu"
#nazev-prace
```

**Použití dříve, než je proměnná definovaná.** Typst čte dokument shora dolů, takže proměnná existuje až od svého `#let` dál — odkaz na ni o řádek výš selže.

```typ example
#let pocet = 3
Výsledky z #pocet experimentů.
```

**Použití mimo blok, kde byla definovaná.** `#let` uvnitř kódového bloku (`{ ... }`) je viditelné jen uvnitř něj. Pokud hodnotu potřebujete venku, nechte ji blok vrátit, místo abyste ji zahodili.

```typ example
#let x = {
  let y = 1
  y + 1
}
#x
```

## Zkontrolujte si porozumění

```quiz
Proč `#let a = 1` následované na dalším řádku `#b` (ne `a`) selže s hláškou „unknown variable `b`"?
- [ ] Typst povoluje jen jedno `#let` na dokument
- [x] `b` nebylo nikdy k ničemu přiřazeno
- [ ] Jména proměnných musí začínat stejným písmenem jako typ hodnoty
> Typst nahlásí přesně jméno, pro které nenašel vazbu — tady nic nikdy nedefinovalo `b`.
```
