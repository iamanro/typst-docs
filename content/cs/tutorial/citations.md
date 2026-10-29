---
title: Citace a bibliografie
description: Načtení bibliografie, citování pomocí @klíč nebo #cite a změna citačního stylu jedním nastavením.
section: tutorial
order: 5
related: [tutorial/figures-and-references, bibliography, cite-responsibly]
---

Citace v Typstu pocházejí z bibliografického souboru ve formátu BibLaTeX
nebo Hayagriva — tedy ve stejném formátu `.bib`, jaký většina referenčních
manažerů umí exportovat. Načtete ho jednou pomocí `#bibliography(...)`,
citujete podle klíče kdekoli v textu a Typst sám sestaví seznam literatury
a naformátuje každou citaci v textu tak, aby odpovídala stylu — a to
důsledně, aniž byste na jedno nebo druhé sahali ručně.

## Načtení bibliografie

Běžně by `bibliography("reference.bib")` ukazoval na soubor ležící vedle
vašeho dokumentu. Protože příklady na této stránce jsou jednotlivé
soubory bez čehokoli vedle sebe, načítají stejný zdroj BibLaTeX jako
bajty vložené přímo do kódu: `#bibliography(bytes("..."))`. Syntaxe
BibLaTeX je v obou případech stejná — liší se jen to, odkud se bere, takže
všechno níže platí stejně i pro skutečný soubor `.bib` ve vašem projektu.

## Citování pomocí `@klíč`

Jakmile je bibliografie načtená, `@` následované klíčem BibLaTeX —
textem hned za otevírací složenou závorkou záznamu, třeba `connell1972` v
`@article{connell1972, ...}` — vloží na tom místě naformátovanou citaci.
Chová se jako odkaz na obrázek: Typst záznam vyhledá, vloží správnou
podobu citace v textu podle zvoleného stylu a na konec automaticky přidá
celý záznam do seznamu literatury. Zkratku „a kol." ani číslo v závorce
nikdy nepíšete sami.

## Explicitní funkce `#cite`

`@klíč` je zkratka za `#cite(<klíč>)`. Sáhněte po explicitní funkci, když
potřebujete možnosti, které zkratka nenabízí — nejčastěji číslo stránky
nebo kapitoly u konkrétní citace:
`#cite(<connell1972>, supplement: [s. 4])` cituje stejný záznam, ale na
správné místo pro daný styl přidá „s. 4".

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)
#set text(lang: "cs")

Slaniska slouží jako přirozené laboratoře pro studium rychlých změn
prostředí @connell1972, a jejich biodiverzita je podrobně zmapována od
#cite(<stephenson1949>, supplement: [s. 15-20]).

#bibliography(bytes(
  "@article{connell1972,
    author = {Connell, Joseph H.},
    title = {Community Interactions on Marine Rocky Intertidal Shores},
    journal = {Annual Review of Ecology and Systematics},
    year = {1972},
  }
  @book{stephenson1949,
    author = {Stephenson, T. A. and Stephenson, Anne},
    title = {The Universal Features of Zonation Between Tide-Marks on Rocky Coasts},
    publisher = {Journal of Ecology},
    year = {1949},
  }"
), style: "ieee")
```

**Co byste měli vidět:** odstavec se dvěma citacemi ve stylu IEEE
(čísla v hranatých závorkách), druhou s rozsahem stránek, a pod odstavcem
číslovaný seznam literatury nadepsaný „Bibliografie" díky
`#set text(lang: "cs")`, s oběma zdroji vypsanými celé.

## Změna stylu

`style: "ieee"` ve výše uvedeném příkladu je jediná věc, která rozhoduje o
tom, jak citace a seznam literatury vypadají. Změňte ho na `"apa"` a každá
citace v dokumentu se přeformátuje z `[1]` na `(Connell, 1972)`, a seznam
literatury se tomu přizpůsobí — žádné hledání a nahrazování, protože styl
ovlivňuje jen to, jak jsou záznamy *zobrazené*, nikdy data, ze kterých
citujete.

## Vyzkoušejte si to

1. Změňte `style: "ieee"` na `style: "apa"` a sledujte, jak se obě citace
   i seznam literatury přepnou z čísel na formu autor–rok.
2. K první citaci `@connell1972` přidejte `supplement: [s. 4]` tak, že ji
   přepíšete na `#cite(<connell1972>, supplement: [s. 4])`.
3. Přidejte do řetězce bajtů třetí záznam BibLaTeX s novým klíčem, pak ho
   někde v odstavci ocitujte pomocí `@` a ověřte, že se objeví v seznamu
   literatury bez jakéhokoli dalšího nastavení.

## Ověřte si, že to chápete

```quiz
Co změní `style: "apa"` oproti `style: "ieee"` u citovaného dokumentu?
- [x] Jen to, jak jsou citace a seznam literatury naformátované a zobrazené
- [ ] Které záznamy bibliografie se zahrnou
- [ ] Syntaxi BibLaTeX, kterou musíte pro každý záznam použít
> Styl ovlivňuje jen zobrazení — podobu citace v textu a vzhled seznamu literatury. Samotná data a klíče bibliografie zůstávají stejné.
```

```quiz
Potřebujete citovat stejný zdroj dvakrát, jednou obecně a jednou s konkrétním číslem stránky. Jak na to nejlépe?
- [ ] Přidat dva samostatné záznamy BibLaTeX se stejnými údaji
- [x] Použít `@klíč` pro obecnou citaci a `#cite(<klíč>, supplement: [s. N])` pro tu s číslem stránky
- [ ] Napsat číslo stránky přímo do pole roku v záznamu BibLaTeX
> `#cite` je plná funkce za zkratkou `@klíč`; `supplement` je způsob, jak k jedné konkrétní citaci připojit stránku nebo podobný detail.
```

## Co si zapamatovat

- `#bibliography(...)` načte zdroj ve formátu BibLaTeX nebo Hayagriva —
  běžně cestu k souboru, `bytes("...")` tehdy, když zdroj musí být přímo
  v kódu.
- `@klíč` cituje záznam podle jeho klíče BibLaTeX; `#cite(<klíč>,
  supplement: [...])` je totéž s možností přidat číslo stránky nebo
  podobný detail.
- `style: "..."` na `#bibliography` jedním místem řídí formátování
  všech citací i celého seznamu literatury.
