---
title: Obrázky a odkazy
description: Zabalení obsahu do figure s popiskem, jeho označení popiskem a křížový odkaz pomocí @.
section: tutorial
order: 4
related: [tutorial/math, tutorial/citations, figures-and-images]
---

Obrázek (anglicky *figure*) je v Typstu jakýkoli obsah — obrázek, nakreslený
tvar, tabulka — zabalený do `figure(...)`, čímž získá popisek a automatické
číslo. Viděli jste, jak `rect` a `circle` kreslí tvary přímo; `figure`
zabalí kterýkoli z nich (nebo skutečný `image(...)`) úplně stejně, jako by
zabalil fotografii.

## Figure a popisek

```typ example
#figure(
  rect(width: 3cm, height: 1.5cm, fill: luma(230)),
  caption: [Vzorkovací mřížka.],
)
```

`figure` bere obsah jako první argument a `caption:` jako obsah, ne jako
obyčejný text, takže do něj můžete vložit zvýraznění nebo třeba citaci.
Typst obrázky čísluje automaticky, v pořadí, v jakém se v dokumentu
objevují — pokud máte zapnutý `#set text(lang: "cs")`, uvidíte „Obrázek 1“,
„Obrázek 2“ a tak dále, a to číslo žije v popisku, nepíšete ho sami.

## Popisky (labely)

Popisek (anglicky *label*) připojí k obrázku jméno hned za ním, v lomených
závorkách: `<fig:tun>`. Jméno si volíte sami — ve výstupu se nikde
neobjeví — a musí být jedinečné jen v rámci dokumentu. Konvence pomůže
víc, než Typst vyžaduje: předpona (`fig:`, `eq:`, `tab:`) na první pohled
řekne, na jaký druh věci odkazujete, zvlášť jakmile jich má dokument
desítky.

## Odkazy pomocí `@`

Jakmile má obrázek popisek, `@fig:tun` kdekoli jinde v dokumentu se stane
odkazem: Typst ho nahradí za „Obrázek 1“ (nebo jaké číslo obrázek nakonec
dostane) a udělá z něj odkaz, který po kliknutí skočí na obrázek. Číslo se
samo aktualizuje, když obrázky přeuspořádáte nebo před nimi vložíte nový —
nic nepřečíslováváte ručně a nikdy vám nezůstane odkaz, který tiše
ukazuje na špatné číslo.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)
#set text(lang: "cs")

Jak ukazuje @fig:tun, tůň je přibližně kruhová.

#figure(
  circle(radius: 1.2cm, fill: luma(200), stroke: 0.5pt),
  caption: [Slaništní tůň, pohled shora.],
) <fig:tun>

Druhý obrázek, tentokrát obdélník:

#figure(
  rect(width: 3cm, height: 1.5cm, fill: luma(230)),
  caption: [Vzorkovací mřížka.],
) <fig:mrizka>

Obrázky @fig:tun a @fig:mrizka jsou očíslovány v pořadí, v jakém se
objevují.
```

**Co byste měli vidět:** větu odkazující na „Obrázek 1“ dřív, než se
samotný obrázek vůbec objeví, kruh s popiskem „Obrázek 1: Slaništní tůň,
pohled shora.", obdélník s popiskem „Obrázek 2: Vzorkovací mřížka.“ a
závěrečnou větu, která správně pojmenuje oba.

## Vyzkoušejte si to

1. Prohoďte pořadí obou bloků `figure(...)` a ověřte, že se čísla v obou
   popiscích i v závěrečné větě aktualizují podle nového pořadí.
2. Změňte popisek z `<fig:tun>` na `<fig:1>` a odpovídající odkazy
   `@fig:tun` upravte na `@fig:1` — výstup se nezmění, mění se jen jméno,
   které interně používáte.
3. Smažte jeden odkaz `@fig:...` a popisek, na který ukazoval, přejmenujte
   na jiné jméno, aniž byste odkaz upravili, abyste viděli, jak vypadá
   rozbitý odkaz.

## Ověřte si, že to chápete

```quiz
Napíšete `@fig:tun` do věty a později před `<fig:tun>` přidáte úplně nový obrázek s popiskem `<fig:odliv>`. Co se stane s číslem u `@fig:tun`?
- [x] Automaticky se aktualizuje podle nové pozice obrázku
- [ ] Zůstane zmrazené na čísle, které mělo, když jste `@fig:tun` poprvé napsali
- [ ] Typst nahlásí chybu, protože se změnilo pořadí popisků
> Odkazy se vyhodnocují z výsledného dokumentu, ne z pořadí, ve kterém jste věci psali ve zdroji, takže čísla zůstávají vždy konzistentní.
```

```quiz
Co vlastně řídí text uvnitř `<...>` za obrázkem?
- [ ] Viditelný popisek obrázku
- [x] Interní jméno použité jen k odkazování na obrázek jinde pomocí `@`
- [ ] Číslo obrázku
> Popisek je interní jméno, ve výstupu neviditelné; existuje jen proto, aby `@popisek` později našel správný obrázek.
```

## Co si zapamatovat

- `figure(obsah, caption: [...])` zabalí cokoli a dá tomu automatické
  číslo na úrovni popisku.
- `<jméno>` hned za obrázkem mu dá popisek; jméno je interní a nikdy se
  netiskne.
- `@jméno` vloží živý odkaz — správné číslo (v češtině „Obrázek N“ díky
  `#set text(lang: "cs")`), funkční odkaz, a zůstane správný i při
  přeuspořádání nebo vložení obrázků.
