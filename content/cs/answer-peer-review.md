---
title: Odpovězte na recenzi
description: Jak číst nevybíravou recenzi bez paniky, jak strukturovat odpověď recenzentům a jak ji vysázet v Typstu.
section: research-writing
order: 5
related: [collaborate-with-coauthors, structure-a-paper, figures-that-communicate]
---

Recenze s deseti výtkami k vašemu článku obvykle neznamená deset důvodů k zamítnutí — většina recenzentů, kteří si dají práci s podrobnými komentáři, se snaží článku pomoct k přijetí. Čtěte ji tak i v případě, že je tón příkrý. Odpověď recenzentům je místo, kde redaktorovi ukážete, že jste kritiku brali vážně — ne místo, kde obhajujete, že jste měli od začátku pravdu.

## Nejdřív čtěte, pak reagujte

Přečtěte si celou recenzi jednou, aniž byste na cokoli reagovali — ideálně s odstupem jednoho dne, pokud máte čas. První reakce na kritiku málokdy patří do odpovědi recenzentům. Při druhém čtení roztřiďte komentáře do tří skupin:

- **Jasné opravy** — chybějící citace, nejasný obrázek, překlep ve vzorci. Prostě je opravte, nepolemizujte.
- **Nedorozumění** — recenzent pochopil něco jinak, než jste zamýšleli. To většinou znamená, že text byl nejednoznačný, i když konkrétní námitka recenzenta je mylná. Upravte text tak, aby ho příští čtenář nemohl pochopit stejně špatně, a upřesnění popište v odpovědi.
- **Skutečné neshody** — recenzent chce experiment, který považujete za zbytečný, nebo zpochybňuje tvrzení, o kterém jste stále přesvědčeni. Tady potřebujete v odpovědi reálný, podložený argument, ne „nesouhlasíme“. Pokud požadovaný experiment jde udělat levně, bývá rychlejší ho prostě provést, než se dohadovat, proč by nebyl potřeba.

## Strukturujte odpověď

Vypořádejte se s každým bodem v pořadí, v jakém ho recenzent uvedl, i s těmi, u kterých nic neměníte. Nezodpovězený komentář recenzent ve druhém kole čte jako „tohle ignorovali“. U každého bodu: citujte nebo parafrázujte komentář, napište, co jste změnili (nebo proč ne), a odkažte přesně na místo v přepracovaném článku.

```typ example
#set text(lang: "cs")
#let komentar(n, telo) = block(
  fill: luma(245), inset: 8pt, radius: 4pt,
)[*Komentář recenzenta #n:* #telo]
#let odpoved(telo) = block(inset: (left: 8pt))[*Odpověď:* #telo]

#komentar(1)[Úvod dostatečně nevysvětluje, proč je problém
  důležitý i mimo laboratorní prostředí.]
#odpoved[Na str. 2 jsme doplnili dvě věty s odkazem na
  nasazené systémy, kterých se problém týká (kapitola 1).]

#komentar(2)[Obrázek 3 není dostatečně popsaný.]
#odpoved[Přepsali jsme popisek a doplnili jednotky os
  (kapitola 4.1).]
```

Dvě takto znovupoužitelné funkce udrží každý komentář a odpověď vizuálně jednotné, aniž byste formátování přepisovali pokaždé znovu, a usnadní přečíslování, pokud se pořadí recenzentových komentářů ve druhém kole změní — stačí upravit argument, ne strukturu bloku.

## Sledujte nevyřešené body v průběhu psaní

Dokud ještě procházíte dlouhý seznam komentářů, jednoduchá značka udrží otevřené body viditelné i v konceptu, na kterém pracujete několik dní:

```typ example
#set text(lang: "cs")
#let todo(telo) = text(fill: red, weight: "bold")[TODO: #telo]

Ablaci jsme přepočítali s požadovanou základní metodou.
#todo[Ještě potřebujeme čísla o době běhu od Petra, než
  bude odstavec hotový.]
```

Před odevzdáním revize vyhledejte v souboru „TODO“ — otevřená poznámka v odpovědi recenzentům je pro redaktora mnohem nápadnější, než kdy byla pro vás při psaní.

## Udržte profesionální tón, ne podlézavý

Nemusíte souhlasit s každým bodem, abyste zůstali zdvořilí. „Oceňujeme připomínku recenzenta, nicméně s respektem nesouhlasíme, a to z následujícího důvodu: …“ je kompletní, profesionální věta — použijte ji u skutečných neshod, místo abyste buď ustoupili ve změně, o které si myslíte, že článku uškodí, nebo byli stroze odmítaví. Tyhle dopisy čtou i redaktoři a posuzují podle nich, jestli jste se kritikou zabývali vážně, ne jestli jste souhlasili se vším.
