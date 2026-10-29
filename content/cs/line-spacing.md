---
title: Změna řádkování a mezer mezi odstavci
description: Nastavte dvojité nebo naopak kompaktní řádkování pomocí #set par(leading, spacing) a přidejte jednorázovou mezeru příkazem #v().
section: typst-tips
order: 4
related: [two-columns, footnotes, page-numbers]
---

Mezera mezi řádky uvnitř odstavce se nastavuje jako `leading`; mezera mezi odstavci jako `spacing`. Obojí patří do `#set par(..)`:

```typ example
#set text(lang: "cs")
#set par(leading: 1.4em, spacing: 2em)

První odstavec s větší mezerou mezi řádky, než je obvyklé.

Druhý odstavec, oddělený od prvního větší svislou mezerou.
```

`leading` se měří v jednotkách `em`, relativně k aktuální velikosti písma, takže se automaticky škáluje s velikostí textu — zvyšte ho pro „dvojité řádkování“, které recenzenti často vyžadují, nebo snižte, abyste se vešli na méně stránek:

```typ example
#set text(lang: "cs")
#set par(leading: 0.65em)

První řádek hustě sázeného odstavce.
Hned za ním druhý řádek.
Třetí řádek pořád blízko.
```

## Jednorázová mezera

Pro jednu konkrétní mezeru navíc — třeba před citátem nebo za titulkem — neměňte globální nastavení, ale vložte na dané místo `#v(2em)`:

```typ example
První odstavec.

#v(2em)

Druhý odstavec s mezerou navíc nahoře.
```

`#v()` přijímá jakoukoliv délku (`1em`, `12pt`, `1cm`); přidá prostor jen na tom jednom místě a jinde `leading`/`spacing` nechá beze změny.

## Časté problémy

- `leading` a `spacing` nastavené v `#set par(..)` platí všude od daného místa v dokumentu dál — požadované „dvojité řádkování“ nastavte jednou, hned na začátku.
- Nadpisy a jiné bloky mají vlastní `#set block(spacing: ..)` a automaticky se neřídí `spacing` odstavců; pokud mezery kolem nadpisů vypadají špatně, zkontrolujte mezery bloku u `heading`, ne u `par`.
- Příliš malé `leading` (pod zhruba `0.5em`) způsobí, že se dotahy písmen mezi řádky překrývají — vyzkoušejte hodnotu na cílové velikosti písma, než ji natrvalo nastavíte.
