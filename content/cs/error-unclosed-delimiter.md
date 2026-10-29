---
title: Oprava chyby „unclosed delimiter“
description: Typst došel na konec souboru, zatímco pořád čekal na uzavírací závorku odpovídající té, kterou dřív otevřel.
section: typst-errors
related: [error-unknown-variable, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#let intro = [Tohle je začátek mého úvodu
```

## Co to znamená

Každá `[`, `(` nebo `{`, kterou Typst otevře, musí být uzavřena odpovídající `]`, `)` nebo `}`. Když soubor skončí (nebo, méně často, výraz přeruší nadpis či jiná konstrukce) dřív, než se taková dvojice najde, Typst nahlásí `unclosed delimiter` a ukáže na otevírací závorku, na kterou stále čeká — ne na chybějící uzavírací, protože neví, kam jste ji chtěli dát.

## Časté příčiny

**Chybějící uzavírací závorka po obsahu táhnoucím se přes víc řádků.** Bloky obsahu zapsané pomocí `[...]` je snadné nechat otevřené, když se rozrostou.

```typ example
#let intro = [Tohle je začátek mého úvodu.]
#intro
```

**Chybějící uzavírací kulatá závorka v n-tici nebo volání funkce.** Totéž platí pro `(...)` — časté u souřadnic, polí nebo argumentů rozdělených přes víc řádků.

```typ example
#let bod = (1, 2)
#bod
```

**Závorka uzavřená špatným znakem.** `[` musí uzavírat `]`, ne `)` — Typst je nepovažuje za zaměnitelné a jejich záměna vyvolá stejnou hlášku „unclosed delimiter“, protože z pohledu parseru je původní závorka pořád otevřená.

## Zkontrolujte si porozumění

```quiz
Typst nahlásí „unclosed delimiter“ se stříškou na `[` na řádku 2, ale váš soubor má 40 řádků. Kde nejspíš je skutečná chyba?
- [x] Někde za řádkem 2 — chybí uzavírací `]` k té závorce
- [ ] Vždy přímo na řádku 2
- [ ] V úplně jiném souboru
> Stříška ukazuje na otevírací závorku, ne na místo, kde měla být ta uzavírací — hledejte dál v textu.
```
