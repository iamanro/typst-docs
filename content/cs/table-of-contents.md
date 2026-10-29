---
title: Přidání obsahu
description: Vygenerujte obsah z nadpisů jediným příkazem a pak upravte jeho titulek, hloubku i to, které nadpisy se v něm objeví.
section: typst-tips
order: 1
related: [heading-numbering, page-numbers, appendix]
---

Stačí jednou zavolat `#outline()` kdekoliv v dokumentu. Projde všechny [nadpisy](/heading-numbering) a vypíše je i s číslem stránky — žádná ruční údržba, žádné přečíslovávání.

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.")

#outline()

= Úvod
= Metody
== Sběr dat
== Analýza
= Výsledky
```

Typst vloží obsah tam, kam `#outline()` umístíte — obvykle hned za titulní stránku — a při každém přepočítání ho udržuje aktuální.

## Omezení hloubky

Dlouhá práce nepotřebuje v obsahu úplně každý podnadpis. Parametrem `depth` obsah zastavíte na dané úrovni [nadpisu](/heading-numbering):

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.")
#outline(depth: 2)

= Úvod
== Pozadí
=== Předchozí práce
= Metody
```

V obsahu se objeví jen `=` a `==`; `===` je vynechán, i když je v textu dál číslovaný.

## Přejmenování a skrytí položek

- Titulek nad seznamem změníte pomocí `#outline(title: "Obsah")`, nebo ho úplně vypnete přes `title: none`, pokud si nadpis píšete sami.
- Konkrétní oddíl z obsahu vynecháte tak, že ho napíšete jako `#heading(outlined: false)[Poděkování]` místo `= Poděkování`. Pořád se vytiskne a zůstává součástí číslování, jen chybí v obsahu.

## Časté problémy

- Prázdný obsah většinou znamená, že v dokumentu ještě nejsou žádné nadpisy, nebo mají všechny `outlined: false`.
- `#outline()` zachytí každý nadpis v dokumentu, i ten napsaný uvnitř popisku `#figure` nebo v poznámce pod čarou — pokud ho tam nechcete mít uvedený, nepoužívejte tam `=`.
- Pokud potřebujete samostatný seznam obrázků nebo tabulek, zavolejte `#outline(target: figure)` — funguje stejně, jen místo nadpisů vypisuje obrázky. Celý postup je v [obrázcích a odkazech](/tutorial/figures-and-references).
