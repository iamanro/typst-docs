---
title: Strukturujte článek
description: Schéma IMRaD, které očekává většina časopisů, jak ho zrcadlit v nadpisech Typstu a kdy je v pořádku se od něj odchýlit.
section: research-writing
order: 1
related: [write-an-abstract, heading-numbering, templates]
---

Většina empirických článků sdílí kostru: **Úvod, Metody, Výsledky, Diskuze** — anglicky IMRaD. Recenzenti i čtenáři ji očekávají, takže odchylka bez dobrého důvodu článek jen ztíží ke čtení, originálnější ho neudělá. Nejdřív se naučte tvar, teprve pak ho ohýbejte.

## K čemu slouží jednotlivé části

- **Úvod** odpovídá na otázky „proč by mě to mělo zajímat?“ a „co dosud chybí?“. Zakončete ho jednou až dvěma větami, které říkají, co článek přesně přináší — čtenář, který přestane číst po úvodu, by měl znát váš přínos.
- **Metody** jsou recept, ne vyprávění. Někdo z oboru by podle této části měl dokázat práci zopakovat. Pište v pořadí, v jakém se věci skutečně odehrály, ne v pořadí, v jakém vás napadly.
- **Výsledky** referují, co jste zjistili, bez interpretace — ta patří do další části. Hlavní váhu nesou obrázky a tabulky; text má čtenáře provést jimi, ne opakovat jejich čísla.
- **Diskuze** je místo pro argumentaci: co výsledky znamenají, jak souvisí s dosavadní literaturou, jaké jsou limity a co má následovat. Kratší článek může Výsledky a Diskuzi spojit, ale i uvnitř jedné části rozlišujte zjištění od interpretace.

Některé obory pořadí mění (ve fyzice bývají metody napřed, krátké sdělení slučuje výsledky s diskuzí) nebo přidávají části (Related Work v informatice, Teorie v části společenských věd). Než si zvolíte strukturu, projděte si dva až tři nedávné články z cílového časopisu nebo konference — zvyklosti se liší víc, než naznačují učebnice.

## Zrcadlete strukturu v nadpisech

Nadpisy článku by měly přímo odpovídat tomuto tvaru — čtenář procházející obsah by měl vidět argumentaci. Mechaniku popisují tipy [číslování nadpisů](/heading-numbering) a [obsah dokumentu](/table-of-contents); tady jde hlavně o to udržet hierarchii plochou. Dvě úrovně (`=`, `==`) stačí na většinu článků; třetí úroveň bývá signál, že se část snaží udělat příliš mnoho a měla by se rozdělit.

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.1")

= Úvod
= Metody
== Účastníci
== Postup
= Výsledky
= Diskuze
```

Při psaní si dočasně dejte na začátek dokumentu `#outline()`. Změní seznam nadpisů na živý obsah, takže je na první pohled vidět nevyvážený článek — třeba dvoustránková Metoda vedle odstavce Diskuze. Před odevzdáním ho smažte nebo zakomentujte, pokud ho časopis výslovně nechce.

```typ example
#set text(lang: "cs")
#set heading(numbering: "1.1")
#outline()

= Úvod
= Metody
= Výsledky
= Diskuze
```

## Pořadí psaní, ne pořadí čtení

Nikdo nepíše IMRaD odshora dolů. Osvědčené pořadí:

1. **Metody** jako první, dokud jsou detaily čerstvé a máte o jejich významu nejméně vyhraněné názory.
2. **Výsledky**, postavené kolem obrázků a tabulek, které už máte.
3. **Úvod** naposledy (nebo aspoň přepsaný naposledy) — motivovat článek pořádně jde, až víte, co vlastně zjistil.
4. **Diskuze** a **abstrakt** (viz [napište abstrakt](/write-an-abstract)) přicházejí na řadu až po všem ostatním, protože obojí shrnuje už hotovou práci.

Psaní v tomto pořadí navíc po celou dobu udrží `#outline()` užitečný: i nehotový Úvod dostane nadpis hned na začátku, takže kostra dokumentu je vidět od prvního dne a prózu doplňujete do struktury, která je zhruba správná už předem.

## Šablona pomůže, tvar ale nenahradí

Pokud časopis nebo konference nabízí šablonu v Typstu, použijte ji — už v sobě má zakódované očekávané názvy částí, číslování i sazbu stránky (viz [šablony](/templates)). Šablona mění, jak struktura vypadá, nemění ale, co do které části patří. Výše popsaná pravidla platí i uvnitř cizích `#show` pravidel.
