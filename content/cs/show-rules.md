---
title: Používejte show pravidla
description: Předefinujte, jak se prvek vykresluje — ne jen jeho výchozí hodnoty — tím, že ho zachytíte show pravidlem.
section: learn-typst
order: 3
related: [set-rules, markup-and-code, templates]
---

[Set pravidlo](/set-rules) mění *výchozí hodnoty* prvku. Show pravidlo mění, jak je prvek *sestavený* — zachytí
každý výskyt a dovolí ho nahradit úplně něčím jiným, včetně původního obsahu nějak upraveného. Tam, kde set
pravidlo říká „defaultně použij tohle“, show pravidlo říká „kdykoli uvidíš tohle, udělej místo toho tamto“.

```typ example
#show heading: it => {
  set text(fill: blue)
  it
}

= Modrý nadpis
Běžný text zůstává nedotčený.
```

Vzorec je vždy `#show selektor: transformace`. Selektor říká *co* zachytit — funkci prvku jako `heading`, kus
textu, regulární výraz. Transformace je buď funkce, která dostane zachycený prvek jako `it` a vrátí nový obsah,
nebo zkratka pro jednodušší případy.

## Zkratka show-set

Pokud chcete jen aplikovat set pravidlo na konkrétní typ prvku — ne měnit jeho strukturu — přeskočte funkci a
napište set pravidlo přímo za dvojtečku:

```typ example
#show heading: set text(fill: blue)

= Stejný výsledek, kratší zápis
Stačil jeden řádek, protože se měnila jen barva textu.
```

Tohle je nejčastější show pravidlo, jaké napíšete: „u tohoto jednoho typu prvku změň tyhle výchozí hodnoty“, aniž
byste se dotkli čehokoli jiného v dokumentu.

## Zacílení selektorem

`heading` zachytí každý nadpis, ale můžete být konkrétnější pomocí `.where(...)`:

```typ example
#show heading.where(level: 1): set text(size: 16pt, weight: "black")

= Úroveň jedna, velká
== Úroveň dva, tímto pravidlem neovlivněná
```

Můžete zacílit i konkrétní text nebo regulární výraz, což se hodí pro konzistentní terminologii nebo označení
nedodělaných míst:

```typ example
#show "Typst": jmeno => text(weight: "bold")[#jmeno]
#show regex("TODO"): it => text(fill: red, it)

Typst vykresluje rychle. TODO: změřit přesně.
```

## Transformace, ne jen styl

Protože transformace je skutečná funkce, může obsah restrukturovat, ne jen přebarvit. Běžné použití je přidat
něco kolem každého výskytu:

```typ example
#show heading: it => {
  v(10pt, weak: true)
  it
  line(length: 100%, stroke: 0.5pt + gray)
}

= Sekce s linkou pod nadpisem
Následuje text těla.
```

`it` je původní prvek — jeho pole si můžete přečíst, třeba `it.body` pro text nadpisu nebo `it.level` pro jeho
úroveň, pokud transformace potřebuje podle nich větvit.

## Show pravidlo na celý dokument

Show pravidlo zapsané jako `#show: funkce` (bez selektoru, jen dvojtečka a funkce) obalí *všechno od toho místa v
dokumentu dál* danou funkcí. Přesně takto se aplikují [šablony](/templates) — na začátku skutečného článku uvidíte
`#show: moje-sablona.with(...)`.

```typ example
#let v-ramecku(telo) = rect(inset: 8pt, telo)

#show: v-ramecku

Teď je zbytek stránky uvnitř rámečku.
```

## Zkuste si to sami

1. Napište show pravidlo, které obarví každé tučné (`strong`) slovo na červeno, a otestujte ho na větě se dvěma
   tučnými slovy.
2. Použijte `.where(level: 2)` ke stylování jen nadpisů druhé úrovně jinak než těch první.
3. Napište pravidlo `#show: funkce` (bez selektoru), které obalí zbytek krátkého příkladu rámečkem, podobně jako v
   posledním příkladu výše.

## Ověřte si porozumění

```quiz
Jaký je rozdíl mezi set pravidlem a show pravidlem na stejném prvku?
- [ ] Žádný, jsou zaměnitelné
- [x] Set pravidlo mění výchozí hodnoty; show pravidlo zachytí a může prvek celý přestavět
- [ ] Set pravidla fungují jen na text, show pravidla jen na nadpisy
> Set pravidla konfigurují argumenty prvku; show pravidla nahrazují způsob vykreslení zachyceného obsahu, což je striktně silnější.
```

```quiz
Co dělá `#show heading: set text(fill: blue)`?
- [x] Je to zkratka pro show pravidlo, které jen aplikuje set pravidlo na zachycené nadpisy
- [ ] Změní barvu veškerého textu v dokumentu, ne jen nadpisů
- [ ] Je to neplatný zápis; show pravidla potřebují funkci
> Tohle je zkratka show-set: pokud potřebujete jen změnit výchozí hodnoty pro jeden typ prvku, nemusíte psát celou transformační funkci.
```

## Co si zapamatovat

- `#show selektor: transformace` zachytí výskyty a nahradí je.
- `#show prvek: set jiny(argumenty)` je zkratka pro aplikaci set pravidla jen v rámci toho prvku.
- `.where(...)` zúží selektor; selektorem může být i text nebo `regex(...)`.
- Funkční transformace dostane výskyt jako `it` a může číst jeho pole nebo ho obalit dalším obsahem.
- `#show: funkce` bez selektoru platí na zbytek dokumentu — to je mechanismus za [šablonami](/templates).
