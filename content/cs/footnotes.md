---
title: Poznámky pod čarou
description: Přidejte poznámku pod čarou příkazem #footnote[..], odkažte se na ni podruhé bez duplikace a upravte vzhled oddělující čáry.
section: typst-tips
order: 5
related: [number-equations, line-spacing, appendix]
---

Napište `#footnote[..]` hned za slovo nebo větu, ke které patří. Typst ji očísluje, vloží značku a vytiskne poznámku dole na stránce automaticky:

```typ example
#set text(lang: "cs")
Voda vaří při 100 °C na hladině moře.#footnote[Při standardním atmosférickém tlaku 101,325 kPa.]

Text pokračuje za odkazem na poznámku.
```

Pokud je poznámka dlouhá, Typst část přesune na další stránku místo přetečení — nic z toho neřešíte ručně.

## Odkaz na stejnou poznámku podruhé

Pokud se chcete podruhé odkázat na už definovanou poznámku (bez duplikace textu a bez zvýšení čísla), označte první poznámku štítkem a ten pak předejte druhému volání `#footnote(..)`:

```typ example
#set text(lang: "cs")
Výsledek byl potvrzen dvakrát.#footnote[Viz příloha se surovými daty.] <note>
Později se na něj odkazujeme znovu#footnote(<note>).
```

Obě značky vytisknou stejné číslo a obě ukazují na jeden záznam dole.

## Úprava oddělující čáry

Tenká čára nad poznámkami je `separator` u `footnote.entry`; přepíšete ji jako jakýkoliv jiný tah:

```typ example
#set text(lang: "cs")
#set footnote.entry(separator: line(length: 30%, stroke: 0.5pt))

Voda vaří při 100 °C na hladině moře.#footnote[Při standardním atmosférickém tlaku 101,325 kPa.]
```

## Časté problémy

- Poznámka volaná uvnitř nadpisu nebo uvnitř obsahu skenovaného `#outline()` se může chovat divně — poznámky nechte v běžných odstavcích textu.
- Číslování poznámek se restartuje po kapitolách, jen pokud výslovně vynulujete `counter(footnote)`; ve výchozím stavu běží číslování plynule celým dokumentem.
- Pro číslovaná tvrzení, která potřebují citaci místo vedlejší poznámky, použijte [seznam literatury](/bibliography) — poznámky pod čarou a citace slouží k něčemu jinému.
