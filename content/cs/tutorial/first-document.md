---
title: Váš první dokument
description: Markup versus volání funkcí, kompletní dokument, který se přeloží, a jak vypadá chyba v Typstu.
section: tutorial
order: 1
related: [tutorial/text-and-structure, markup-and-code, error-unknown-variable]
---

Dokumenty v Typstu jsou obyčejné textové soubory, které píšete v libovolném
editoru. Není potřeba klikat na žádnou nabídku ani instalovat šablonu —
napíšete text a Typst ho zalomí do stránky. Hned od začátku se vyplatí
všímat si, ve kterém ze dvou režimů se zrovna nacházíte.

## Markup a volání funkcí

Většina toho, co píšete, je **markup**: znaky, které pro Typst znamenají
něco zvláštního bez jakékoli další syntaxe. Prázdný řádek začíná nový
odstavec, `*slovo*` ho ztuční, `_slovo_` ho zkurzívní a řádek začínající
`=` je nadpis. Markup pokrývá běžné případy, takže nad ním většinou vůbec
nemusíte přemýšlet.

Všechno ostatní — nastavení výchozí hodnoty, nakreslení tvaru, vložení
hodnoty, změna vzhledu nadpisů — je **volání funkce** a vždy začíná `#`.
`#rect(width: 2cm, height: 1cm)` nakreslí obdélník; `#set text(size: 11pt)`
od tohoto místa dál změní výchozí velikost textu. `#` je signál: „co
následuje, je kód, ne text." Jakmile od sebe tyto dva režimy na první
pohled rozeznáte, většina syntaxe Typstu přestane být záhadou.

## Kompletní dokument

Tady je krátký dokument, který používá obojí. Vyzkoušejte si ho v editoru
níže — je živý, takže když zdroj upravíte, náhled vpravo se aktualizuje za
běhu.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)
#set text(lang: "cs")
#set document(title: "Poznámky o slaništích")

#title()

= Úvod
Slaniska se při přílivu zaplavují a při odlivu vysychají, takže je to
jedno z mála míst, kde lze dvakrát denně sledovat, jak se celý ekosystém
obnoví.

#rect(width: 3cm, height: 1.5cm, fill: luma(220), radius: 2pt)[
  #align(center + horizon)[skalní tůň]
]

Tento odstavec je čistý markup: *tučně*, _kurzíva_ a zalomení řádku
fungují bez jakéhokoli `#`.
```

**Co byste měli vidět:** vystředěný titulek nahoře, nadpis „Úvod", malý
zaoblený šedý obdélník s popiskem uprostřed a pod ním odstavec s viditelně
tučným a kurzívním slovem.

## Nastavení titulku dokumentu

`#set document(title: "Poznámky o slaništích")` sám o sobě nic nevytiskne —
jen uloží metadata, podobně jako má PDF titulek ve vlastnostech souboru,
i když se neobjeví na první stránce. Aby se titulek na stránce opravdu
zobrazil, zavolejte `#title()`. Zavoláte-li ho bez argumentu, použije se
to, co jste nastavili přes `#set document`; zavoláte-li ho s obsahem, třeba
`#title[Jiný nadpis]`, přepíše to zobrazené metadata jen pro tento výpis.
Volání s metadaty nechte na začátku souboru, před veškerým obsahem, aby
platilo pro celý dokument.

## Jak vypadá chyba

Typst kontroluje dokument při každém překladu a zastaví se u první věci, se
kterou si neporadí. Tady je dokument, který sahá po proměnné, která nikdy
nebyla definována:

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
Ahoj, #jmeno_navstevnika!
```

Hláška — „unknown variable `jmeno_navstevnika`" — pojmenuje přesný problém
a řádek, kde k němu došlo. V živém editoru na tomto webu se chyby zobrazují
stejně: jako „Řádek *N*: hláška" pod náhledem, přičemž náhled dál ukazuje
*poslední verzi, která se přeložila*, místo aby úplně zmizel. Je to záměr —
můžete klidně psát dál, aniž byste ztratili rozkoukání, a starý náhled
obvykle stačí k tomu, abyste poznali, jestli vaše poslední úprava byla ta,
co věc rozbila.

## Vyzkoušejte si to

1. V editoru výše smažte řádek `#title()`. Všimněte si, že metadata
   titulku zůstanou nastavená, ale na stránce přestane být vidět.
2. Změňte `fill: luma(220)` na `fill: luma(80)` a sledujte, jak obdélník
   ztmavne; pak zkuste `luma(300)` a přečtěte si chybu — hodnoty `luma`
   musí zůstat mezi 0 a 255.
3. Pod první odstavec přidejte druhý, který v jedné větě zkombinuje
   `*tučně*`, `_kurzívu_` a nějakou funkci se `#` (zkuste
   `#underline[text]`).

## Ověřte si, že to chápete

```quiz
Jaký je rozdíl mezi `*tučně*` a `#text(weight: "bold")[tučně]`?
- [ ] Žádný rozdíl neexistuje, Typst je zpracovává úplně stejně
- [x] `*tučně*` je markupová zkratka; `#text(...)` je totéž vypsané jako volání funkce
- [ ] `#text(...)` funguje jen uvnitř nadpisů
> Markup je zkratka pro běžná volání funkcí. `*tučně*` a `#text(weight: "bold")[tučně]` vytvoří stejný tučný text.
```

```quiz
Živý náhled na tomto webu ukazuje včerejší verzi vaší úpravy a pod ním se objeví chyba „Řádek 4: unknown variable `barva`". Co to znamená?
- [ ] Celý dokument se nepodařilo zpracovat a nic se nedá opravit
- [x] Řádek 4 používá název, který Typst nezná; vše do posledního úspěšného překladu zůstává zobrazené
- [ ] Chyba nesouvisí s vaším kódem a dá se ignorovat
> Editor si drží poslední fungující náhled a hlásí první chybný řádek, takže si můžete porovnat, co se od posledního fungujícího stavu změnilo.
```

## Co si zapamatovat

- Markup (`*tučně*`, `=`, prázdný řádek pro nový odstavec) pokrývá běžné
  případy; vše ostatní je volání funkce začínající `#`.
- `#set document(title: ...)` uloží metadata; `#title()` je to, co titulek
  skutečně vytiskne na stránku.
- Chyba Typstu pojmenuje problém i řádek, kde nastal; živý editor na tomto
  webu si mezitím drží váš poslední fungující náhled.
