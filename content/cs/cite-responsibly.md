---
title: Citujte zodpovědně
description: Co citace čtenáři slibuje, kterým citačním prohřeškům se vyhnout a jak vás bibliografie v Typstu udrží v mezích.
section: research-writing
order: 4
related: [bibliography, tutorial/citations, structure-a-paper]
---

Citace je slib: „pokud si ten zdroj ověříte, najdete v něm to, co tvrdím.“ Porušené sliby — špatně přiřazená tvrzení, citace, která tvrzení ve skutečnosti nepodporuje, nebo odkaz na zrušený článek jako na platný — jsou nejrychlejší způsob, jak ztratit důvěru recenzenta, a přitom se jim s trochou disciplíny dá předejít.

## Citujte tvrzení, ne pocit

Každá citace by měla podpírat konkrétní, ověřitelné tvrzení ve vaší větě, ne jen mávat směrem k „související práci v této oblasti“. Když napíšete „hluboké učení proměnilo zpracování jazyka [12]“, zeptejte se, co přesně má [12] dokládat — přehledový článek, konkrétní výsledek, historické prvenství? Vágní citace („studie ukazují, že…“) jsou signál, že samotné tvrzení není dost přesné — zostřete větu, dokud není jasné, co přesně má zdroj potvrzovat.

Časté problémy, které stojí za kontrolu před odevzdáním:

- **Citování sekundárního zdroje pro primární tvrzení.** Pokud jste fakt převzali z přehledového článku, ověřte si jeho vlastní citaci a odkažte raději na originál, je-li dostupný — přehledy občas to, co citují, zkreslí.
- **Citování něčeho, co jste nečetli**, převzatého ze seznamu literatury někoho jiného. Takhle se citační chyby šíří celým oborem; minimálně si přečtěte abstrakt a ověřte, že podporuje přesně vaše tvrzení.
- **Přehnané sebecitování.** Pár relevantních odkazů na vlastní práci je normální; seznam literatury složený ze 40 % z vlastní laboratoře recenzenti i redaktoři zaregistrují a někdy se na něj přímo zeptají.
- **Citování zrušeného nebo staženého článku**, aniž by to bylo zmíněno — obvykle neúmyslně, protože citační manažery retrakce ne vždy upozorní. Stojí za ruční ověření u každého článku, který je pro vaši argumentaci klíčový, zvlášť pokud je starší několika let.

## Bibliografii sestavte jednou, citujte ji všude

Funkce `bibliography()` v Typstu čte soubor `.bib` (nebo Hayagriva `.yml`) a ze stejného zdroje sází jak citace v textu, tak seznam literatury, ve stylu, který požaduje cílový časopis — překlep ve jméně autora tak stačí opravit na jediném místě.

```typ example
#set text(lang: "cs")
#bibliography(bytes("@article{doe2024,
  author = {Doe, Jane},
  title = {A Study of Things},
  journal = {Journal of Examples},
  year = {2024},
}"), style: "ieee")

Jak uvádí @doe2024, tento přístup funguje.
```

Tento malý příklad má bibliografii vloženou přímo pomocí `bytes(...)`; ve skutečném článku ji necháte ve vlastním souboru `.bib` a předáte místo toho cestu k němu — celý postup, včetně přepnutí citačního stylu bez přepisování jediné reference, popisuje [lekce o bibliografii](/bibliography) a [krok s citacemi v tutoriálu](/tutorial/citations).

Protože se seznam literatury generuje, a nepíše ručně, citační klíč, který ve vašem `.bib` souboru neexistuje, sestavení dokumentu nahlas shodí, místo aby do PDF potichu vytiskl „[?]“ — viz [oprava chybějícího odkazu](/error-label-does-not-exist), pokud se to stane u odkazu na obrázek nebo rovnici místo citace.

## Poznámka pro český kontext

Pokud píšete pro českou instituci nebo časopis, který stále vyžaduje citace podle **ČSN ISO 690**, ověřte nejdřív, jestli Hayagriva nabízí odpovídající styl, než budete formátovat ručně; pokud ne, styly IEEE nebo APA dodávané s Typstem jsou pro koncept dost blízké a přesný formát si můžete vyžádat jako korekturu až před finálním odevzdáním, místo abyste se s definicí stylu přetahovali kvůli jedné bakalářské nebo diplomové práci.
