---
title: Text a struktura
description: Odstavce, zvýraznění, nadpisy, seznamy a jak Typst pozná, kde končí řádek a kde odstavec.
section: tutorial
order: 2
related: [tutorial/first-document, tutorial/math, markup-and-code]
---

Většina odborného textu jsou kapitoly, odstavce, trochu zvýraznění a
občas seznam. Typst zvládne všechno z toho hrstkou znaků, které už znáte
z psaní obyčejného textu — jen je potřeba vědět, které z nich Typst
zpracovává jinak.

## Odstavce

Odstavec je prostě text. Typstu nevadí zalomení řádku uvnitř něj — pokud
dlouhou větu rozdělíte na víc řádků zdroje, Typst je stejně spojí do
jednoho plynulého odstavce, přesně jako to dělá Markdown. Co naopak nový
odstavec začíná, je **prázdný řádek**. Dva znaky nového řádku za sebou,
bez ohledu na to, kolik mezer je na prázdném řádku, Typstu řeknou: „tahle
věta skončila, začni znovu, s mezerou nad odstavcem."

Pokud potřebujete zalomit řádek *bez* nového odstavce — časté třeba u
adres nebo básní — ukončete řádek zpětným lomítkem: `první řádek \`. To je
tvrdé zalomení; přejde na další řádek, ale zachová stejnou mezeru a
odsazení jako okolní text.

## Zvýraznění

`*slovo*` udělá ze **slovo** tučné, `_slovo_` udělá ze *slovo* kurzívu a
zpětné uvozovky jako `` `slovo` `` vysází text neproporcionálním písmem —
stejná konvence, jakou znáte z Markdownu. Jde o zkratky za
`#text(weight: "bold")[slovo]`, `#emph[slovo]` a `#raw("slovo")` — markup
existuje proto, že tučné a kurzívní písmo jsou natolik běžné, že si
zaslouží jeden znak místo volání funkce.

## Nadpisy

Řádek začínající `=` je nadpis nejvyšší úrovně, `==` je o úroveň níž,
`===` o další a tak dále. Typst nadpisy automaticky čísluje a stylizuje —
žádné ruční „1.2.3“ na začátku a žádný samostatný příkaz, který by říkal
„tohle je podkapitola tamté“. Zanoření určuje jen počet znaků `=`, které
napíšete.

## Seznamy

`-` začíná odrážkový seznam, `+` číslovaný a odsazení řádku o dvě mezery
ho zanoří pod položku nad ním. U seznamu s `+` čísla nepíšete sami — Typst
je přečísluje automaticky, když položku přidáte nebo smažete, což se hodí
ve chvíli, kdy seznam editujete víckrát.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)
#set text(lang: "cs")

= Metodika
== Vzorkování

Vodu jsme odebrali na třech místech.

+ Místo A, u ústí
+ Místo B, uprostřed tůně
+ Místo C, pod převisem
  - měřeno za odlivu
  - měřeno za přílivu

Tento řádek končí tvrdým zalomením \
a pokračuje hned pod ním, pořád ve stejném odstavci.

Nový odstavec začíná po prázdném řádku, s běžnou mezerou nad sebou.

*Tučně*, _kurzíva_ a `kód` se v jedné větě dobře čtou.
```

**Co byste měli vidět:** číslovaný nadpis „Metodika“ s menším číslovaným
podnadpisem „Vzorkování“, číslovaný seznam tří míst, kde třetí má dvě
zanořené odrážky, dvouřádkový blok, který zůstává jedním odstavcem,
samostatný odstavec pod ním a nakonec větu kombinující tučné, kurzívní a
neproporcionální písmo.

## Vyzkoušejte si to

1. Přidejte čtvrtou položku `+` do seznamu a ověřte, že se očísluje jako
   `4.` automaticky; pak smažte druhou položku a sledujte, jak se zbytek
   přečísluje.
2. Změňte `== Vzorkování` na `=== Vzorkování` a sledujte, jak se zmenší a
   přečísluje jako hlubší podkapitola místo sourozence „Metodiky“.
3. Odstraňte zpětné lomítko na konci řádku s „tvrdým zalomením“ a sledujte,
   jak se oba řádky spojí do jednoho zalamovaného řádku místo toho, aby
   zůstaly viditelně oddělené.

## Ověřte si, že to chápete

```quiz
Chcete, aby dva řádky zůstaly ve stejném odstavci (stejná mezera, stejné odsazení), ale přesto se vizuálně zalomily na určitém místě. Co napíšete na konec prvního řádku?
- [ ] Dvě mezery
- [ ] Prázdný řádek
- [x] Zpětné lomítko
> Zpětné lomítko (`\`) vynutí zalomení řádku bez nového odstavce; prázdný řádek by nový odstavec začal.
```

```quiz
Napíšete `=== Výsledky` přímo pod nadpis `= Metodika`, bez nadpisu `==` mezi nimi. Co se stane?
- [x] Typst ho přesto vysází jako podpodkapitolu; číslování jen odráží úrovně, které jste použili
- [ ] Typst nahlásí chybu, protože byla přeskočena úroveň
- [ ] Automaticky se povýší na `==`
> Typst nevyžaduje, aby se objevila každá úroveň — nadpisy čísluje a zanořuje podle počtu znaků `=`, nic víc.
```

## Co si zapamatovat

- Prázdný řádek začíná nový odstavec; zpětné lomítko na konci řádku ho
  zalomí bez nového odstavce.
- `*tučně*`, `_kurzíva_` a `` `kód` `` jsou zkratky za odpovídající volání
  funkcí.
- `=`, `==`, `===` zanořují nadpisy podle počtu rovnítek; Typst je za vás
  očísluje.
- Seznam s `-` je odrážkový, se `+` je automaticky číslovaný a při úpravě
  se sám přečísluje.
