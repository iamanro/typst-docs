---
title: Spolupracujte se spoluautory
description: Jak zabránit tomu, aby se článek psaný víc lidmi rozpadl na vzájemně si odporující kopie — verzování, viditelné poznámky a rozdělení vlastnictví.
section: research-writing
order: 6
related: [answer-peer-review, templates, structure-a-paper]
---

Soubory Typstu jsou obyčejný text, takže na spolupráci na článku fungují stejné nástroje, jaké se používají pro spolupráci na kódu — to je oproti binárním formátům skutečná výhoda, ale jen pokud je se spoluautory opravdu používáte, místo abyste si posílali `.typ` soubory e-mailem s iniciálami v názvu.

## Používejte verzovací systém, ne „clanek_v3_final_FINAL.typ“

Projekt dejte do Gitu (na GitHubu, GitLabu, nebo na obdobě vaší instituce) hned od prvního konceptu, ne až ve chvíli, kdy je zmatek na světě. Protože zdroje Typstu jsou obyčejný text, diffy jsou čitelné — spoluautor přesně vidí, které věty se v daném commitu změnily, podobně jako u kódu, místo aby porovnával dva celé dokumenty očima. Díky tomu navíc:

- Nikdo nepřepíše cizí úpravy tím, že uloží sdílený soubor v nevhodnou chvíli.
- Každá verze je dohledatelná — vždy se lze vrátit k tomu, co abstrakt říkal před minulotýdenním přepisem.
- Každý spoluautor může pracovat na své části v samostatné větvi a pak ji sloučit, místo aby se u jednoho souboru střídali.

Pokud si spoluautoři s Gitem netroufají, slabší, ale funkční náhrada je sdílená složka (Dropbox, úložiště instituce) s jedním člověkem zodpovědným za slučování změn — důležité je mít jednu dohodnutou aktuální verzi, ne konkrétní nástroj.

## Udělejte otevřené otázky viditelné přímo v dokumentu

Otázka napsaná do chatu se ztratí; otázka napsaná do dokumentu ji uvidí každý, kdo ho příště otevře. Jednoduchá pomocná funkce `todo`, definovaná jednou na začátku souboru, změní každou otevřenou otázku na něco, co se ve vysázeném PDF zobrazí červeně a nedá se při čtení přehlédnout:

```typ example
#set text(lang: "cs")
#let todo(telo) = text(fill: red, weight: "bold")[TODO: #telo]

Kapitola o metodě je hotová.

#todo[Potřebujeme číslo schválení etické komise — zeptat se Petry.]

Výsledky jsou nahozené, statistika ještě potřebuje druhé kolo.
#todo[Dá se velikost vzorku obhájit analýzou síly testu?]
```

Před odevzdáním v souboru vyhledejte „TODO“ (nebo si na to přidejte kontrolu, pokud se článek sestavuje automaticky), ať se žádné nedostane až do finálního PDF — opomenuté červené TODO v odevzdaném rukopisu je pro redaktora špatný první dojem.

## Dohodněte se, kdo vlastní kterou část

I při dobrých nástrojích způsobují tření dva lidé upravující stejný odstavec ve stejnou chvíli. Rozdělte si zhruba vlastnictví jednotlivých částí hned na začátku — kdo sbíral data, píše Metody, kdo dělal analýzu, píše Výsledky — a úpravy mimo vlastní část dělejte formou komentáře nebo `todo`, ne tichým přepsáním, pokud jste se nedohodli jinak. Čím víc autorů, tím víc na tom záleží — dvouautorský článek si dovolí volnější zvyky než šestiautorský.

## Rozhodnutí o formátování držte na jednom místě

Pokud si jeden spoluautor lokálně změní citační styl nebo okraje stránky, aby „viděl, jak to vypadá“, a zapomene to vrátit, další osoba, která dokument sestaví, dostane matoucí diff, který s obsahem nemá nic společného. Pravidla `#set` a `#show` — a vlastní funkce jako `todo` výše — držte v jasně označeném bloku na začátku souboru, nebo v samostatném souboru načteném přes `#import`, aby šly formátovací změny snadno odlišit a vrátit zvlášť od skutečných úprav textu. Pokud časopis nebo konference nabízí [šablonu](/templates), přijměte ji co nejdřív — vyhnete se tak pozdnímu přeformátovávání téměř hotového článku.
