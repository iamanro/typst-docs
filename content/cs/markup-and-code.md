---
title: Zápis a kód
description: Dokument v Typstu kombinuje obyčejný zápis (markup) s malým programovacím jazykem; naučte se mezi nimi přepínat.
section: learn-typst
order: 1
related: [set-rules, show-rules, templates]
---

Soubor v Typstu je ve výchozím stavu zápis (markup) — nadpisy pomocí `=`, zvýraznění pomocí `_..._` a `*...*`,
seznamy pomocí `-`, vše vytváří obsah přímo, podobně jako v Markdownu. Typst je ale zároveň programovací jazyk:
proměnné, funkce, cykly, podmínky. Znak `#` je dveřmi mezi oběma světy. Napište `#` a vše, co následuje, se
vyhodnotí jako kód, dokud Typst nepozná, že výraz skončil.

```typ example
Voda vaří při #(90 + 10)°C na hladině moře.
```

To je nejjednodušší případ: `#(...)` vyhodnotí výraz a vloží výsledek jako obsah. U jednoho identifikátoru nebo
volání funkce závorky nepotřebujete — `#90 + 10` by ale vytisklo `90` a `+ 10` ponechalo jako obyčejný text, protože
Typst přestává číst kód hned u první věci, která zjevně nepokračuje. V nejistém případě výraz uzavřete do závorek.

## Proměnné

`#let` naváže jméno na hodnotu. Jakmile je jméno navázané, použijte ho kdekoli — v zápisu i v kódu — se znakem `#`.

```typ example
#let nazev = "Laboratorní protokol"
#let teplota = 21.5

= #nazev
Laboratoř byla udržována na #teplota°C.
```

## Funkce

`#let jmeno(parametry) = ...` definuje funkci. Tělo za `=` může být jediný výraz, `{ ... }` pro víc příkazů, nebo
`[ ... ]`, pokud funkce především vytváří obsah.

```typ example
#let druha-mocnina(x) = x * x
#let pozdrav(jmeno) = [Ahoj, #jmeno! Vítej.]

#druha-mocnina(6)

#pozdrav("doktorko Nováková")
```

Funkce jsou hodnoty jako kterékoli jiné — budete je hodně předávat dál, jakmile se dostanete k
[show pravidlům](/show-rules) a [šablonám](/templates).

## Bloky obsahu a bloky kódu

Hranaté závorky `[...]` obsahují *obsah* — zápis, případně s dalšími `#` výrazy uvnitř. Složené závorky `{...}`
obsahují *kód* — posloupnost příkazů, jejíž poslední výraz (pokud existuje) je výsledkem. Jedno do druhého
budete vnořovat neustále:

```typ example
#let ramecek-s-popiskem(popisek, telo) = {
  [*#popisek:* ]
  telo
}

#ramecek-s-popiskem("Poznámka")[Nezapomeňte nejdřív zkalibrovat senzor.]
```

## Cykly a podmínky

`#for` a `#if` fungují jak v kódu, tak přímo v zápisu. Uvnitř zápisu je pište se znakem `#` a dejte jim blok
obsahu; tělo cyklu proběhne jednou pro každou položku a jeho výstup se vloží na místo.

```typ example
#let vzorky = ("A1", "A2", "A3")

#for v in vzorky [
  - Vzorek #v: čeká na zpracování
]

#let n = vzorky.len()
#if n > 2 [
  To je #n vzorků — na první pokus dost.
] else [
  Jen #n vzorky, zvažte přidání dalších.
]
```

## Řetězce, pole a slovníky

Obvyklé stavební kameny tu jsou, s metodami volanými přes tečku:

```typ example
#let autori = ("Alice", "Bob", "Karolína")
#autori.join(", ", last: " a ")

#let clanek = (nazev: "Difuze v tenkých vrstvách", rok: 2024)
#clanek.nazev (#clanek.rok)
```

Pole podporují `.map()`, `.filter()`, `.sum()`, `.len()` a další; slovníky se čtou přes `.klic` nebo
`.at("klic")`. Obojí se vám bude hodit znovu, až začnete psát [tabulky](/tables) nebo znovupoužitelnou
[šablonu](/templates) z reálných dat.

## Zkuste si to sami

1. Napište proměnnou `#let` se svým jménem a pozdravte se funkcí, podobně jako `pozdrav` výše.
2. Vytvořte pole tří čísel a v jednom příkladu vypište jejich součet i průměr.
3. Napište funkci, která vezme číslo a vrátí `[splněno]`, pokud je nad určitou hranicí, jinak `[nesplněno]`, a
   zavolejte ji s několika různými čísly.

## Ověřte si porozumění

```quiz
Co dělá znak `#` v zápisu Typstu?
- [ ] Zahajuje komentář, jako v mnoha programovacích jazycích
- [x] Přepne ze zápisu do kódu pro to, co následuje
- [ ] Vloží doslovný znak hash
> `#` předá řízení kódovému režimu Typstu, dokud není jasné, kde výraz končí; pro jistotu použijte `#(...)`.
```

```quiz
Jaký je rozdíl mezi `[...]` a `{...}`?
- [ ] Jsou zaměnitelné
- [x] `[...]` obsahuje obsah (zápis); `{...}` obsahuje posloupnost příkazů kódu
- [ ] `[...]` je pro funkce, `{...}` pro proměnné
> Bloky obsahu produkují výstup v podobě zápisu, bloky kódu vykonávají příkazy a vyhodnotí se na poslední výraz.
```

## Co si zapamatovat

- `#` přepíná ze zápisu do kódu; výraz uzavřete do `#(...)`, pokud není jasné, kde končí.
- `#let` definuje proměnné i funkce; tělo funkce může být výraz, blok kódu `{ }` nebo blok obsahu `[ ]`.
- `[...]` je obsah, `{...}` je kód — budete je do sebe neustále vnořovat.
- `#for`/`#if` fungují přímo v zápisu, pokud po nich následuje blok obsahu.
- Pole a slovníky mají metody, jaké byste čekali: `.map()`, `.filter()`, `.sum()`, `.join()`, `.at()`.
