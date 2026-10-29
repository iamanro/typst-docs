---
title: Používejte set pravidla
description: Změňte výchozí hodnotu pro vše, co následuje — fonty, mezery mezi odstavci, odrážky — jedním řádkem, místo opakování všude.
section: learn-typst
order: 2
related: [markup-and-code, show-rules, page-setup]
---

Téměř každý prvek v Typstu — text, odstavce, nadpisy, seznamy, tabulky — má funkci s výchozími argumenty. *Set
pravidlo* tyto výchozí hodnoty od daného místa přepíše pro vše, co vznikne dál, aniž byste argumenty opakovali u
každého volání. Čte se jako věta: „nastav text na tuto velikost“, „nastav odstavce na zarovnané do bloku“.

```typ example
#set text(font: "Libertinus Serif", size: 10pt)
#set par(justify: true, leading: 0.65em)

Tento odstavec je zarovnaný do bloku a používá užší řádkování než výchozí, protože obě
set pravidla platí pro všechno, co je napsané po nich.
```

To je jádro věci: set pravidlo není jednorázová akce, je to trvalý pokyn. Představte si volání funkce, které
nakonfiguruje samotnou funkci, ne jedno konkrétní volání — `set text(size: 9pt)` nevytvoří 9bodový text přímo na
místě, ale řekne každému *následujícímu* kusu textu, aby měl 9 bodů jako výchozí, pokud ho něco konkrétnějšího
nepřebije.

## Set pravidla platí jen od svého místa dál

Protože set pravidlo mění výchozí hodnotu směrem dopředu, text napsaný *před* ním si drží starou výchozí hodnotu.
To mate lidi přicházející z textových editorů, kde je normální „označ vše, změň font“ — v Typstu nastavíte font
jednou, blízko začátku, dřív, než vůbec nějaký text existuje.

```typ example
První odstavec, výchozí velikost.

#set text(size: 16pt)

Druhý odstavec, teď 16pt, protože pravidlo přišlo před ním.
```

## Omezení set pravidla na část dokumentu

Účinek set pravidla končí na konci bloku, ve kterém se nachází — tělo funkce, blok obsahu v `[...]`, nebo celý
dokument. Zabalte pravidlo do `[...]` nebo `{...}`, aby platilo jen pro tu část dokumentu.

```typ example
Normální text.

#[
  #set text(fill: red)
  Jen tato věta je červená.
]

Tady už je zase normální text.
```

Stejné omezení platí i uvnitř funkce: pokud `poznamka` níže nastaví styl, ten styl „neuteče“ ven, tam odkud byla
funkce zavolaná.

```typ example
#let poznamka(telo) = {
  set text(style: "italic")
  telo
}

#poznamka[Vsuvka, kurzívou.] Hned poté zase stojaté písmo.
```

## Pravidlo pro cokoli s výchozí hodnotou

Set pravidla nejsou omezená na `text` a `par`. Jakýkoli prvek, který potkáte později — [stránka](/page-setup),
[obrázek](/figures-and-images), [tabulka](/tables), [bibliografie](/bibliography) — lze konfigurovat stejně:

```typ example
#set list(marker: [→])
#set enum(numbering: "1)")

- první bod
- druhý bod

+ první krok
+ druhý krok
```

## Pojmenované argumenty, ne hádání pozice

Set pravidla téměř vždy používají pojmenované argumenty (`size: 10pt`, ne jen `10pt`), proto se čtou přirozeně a
proto stačí uvést jen ty volby, které opravdu chcete změnit — vše ostatní si drží výchozí hodnotu.

## Zkuste si to sami

1. Nastavte základní velikost písma dokumentu na něco neobvyklého (třeba 13pt) a ověřte příkladem, že text před
   pravidlem zůstal nedotčený, pokud nějaký text napíšete dřív.
2. Zabalte pravidlo `#set text(fill: ...)` do `[...]` kolem jediné věty a ukažte, že věta po něm je zase normální.
3. Zkombinujte `#set par(justify: true)` s `#set text(size: 9pt)` v jednom příkladu a napište dva krátké odstavce,
   abyste viděli obě výchozí hodnoty v akci.

## Ověřte si porozumění

```quiz
Kam by měla obvykle patřit celodokumentová změna fontu?
- [ ] Za text, který chcete stylovat, aby Typst věděl, co má změnit
- [x] Blízko začátku, před text, jako set pravidlo
- [ ] Dovnitř každého odstavce, který ten font používá
> Set pravidla mění výchozí hodnotu směrem dopředu; umístěte je před obsah, který mají ovlivnit.
```

```quiz
Jak omezíte set pravidlo jen na část dokumentu?
- [ ] Nejde to; set pravidla vždy platí pro celý dokument
- [x] Zabalíte ho spolu s obsahem do `[...]` nebo `{...}`
- [ ] Přidáte `scope: local` k set pravidlu
> Účinek set pravidla končí na konci jeho okolního bloku — bloku obsahu, bloku kódu, nebo těla funkce.
```

## Co si zapamatovat

- Set pravidlo (`#set prvek(argumenty)`) mění výchozí hodnotu daného typu prvku od toho místa dál.
- Neovlivní obsah napsaný před ním.
- Zabalení set pravidla do `[...]` nebo dovnitř těla funkce omezí jeho účinek na ten rozsah.
- Většina prvků, které budete používat — text, par, list, enum, page, figure, table — přijímá set pravidla.
- Pro změnu *způsobu*, jak je prvek sestavený, místo jeho výchozích hodnot, budete potřebovat
  [show pravidlo](/show-rules).
