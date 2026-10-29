---
title: Oprava chyby „expected relative length or auto, found string"
description: Argument funkce dostal hodnotu špatného typu — často text v uvozovkách tam, kde Typst čeká délku, barvu nebo číslo.
section: typst-errors
related: [error-unexpected-argument, page-setup, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#rect(width: "4cm")
```

## Co to znamená

Typst je na úrovni argumentů funkcí staticky typovaný: `width:` u `rect()` očekává délku (nebo `auto`), ne text. `"4cm"` je *řetězec* — čtyři znaky — ne délka čtyři centimetry, i když to tak vypadá. Typst nahlásí, jaký typ čekal, jaký skutečně dostal, a přesně který argument.

Každá hláška „expected ... found ..." má stejný tvar. Očekávaný typ pochází z dokumentace dané funkce; skutečný typ je to, co jste doopravdy napsali — řetězec tam, kde se čekala délka, celé číslo tam, kde se čekala barva, obsah tam, kde se čekal řetězec, a tak dále.

## Časté příčiny

**Délka v uvozovkách místo čísla s jednotkou.** Stačí odstranit uvozovky:

```typ example
#rect(width: 4cm)
```

**Logická hodnota nebo `none` v uvozovkách.** `"true"` je řetězec; `true` (bez uvozovek) je booleovská hodnota, kterou Typst čeká u příznaků jako `stroke: none` nebo `fill: none` — opět stačí odstranit uvozovky a dostanete skutečnou hodnotu, ne text, který se jí jen podobá.

**Předání uloženého řetězce tam, kde je potřeba typovaná hodnota**, například šířka poskládaná z uživatelského vstupu. Převeďte ji výslovně, místo abyste doufali, že ji Typst sám přetypuje:

```typ example
#let w = "4cm"
#rect(width: eval(w, mode: "code"))
```

## Zkontrolujte si porozumění

```quiz
`#set text(size: "11pt")` selže s hláškou „expected length, found string". Co je špatně?
- [x] `"11pt"` je text v uvozovkách, ne délka `11pt`
- [ ] `text()` argument `size` vůbec nepřijímá
- [ ] `11pt` je pro `set text` moc malé
> Odstraněním uvozovek — `size: 11pt` — dáte Typstu skutečnou hodnotu délky místo čtyř znaků textu.
```
