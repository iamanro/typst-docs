---
title: Otočení stránky na šířku
description: Otočte jednu stránku na šířku kvůli široké tabulce nebo obrázku, nebo nastavte na šířku celý dokument.
section: typst-tips
order: 9
related: [two-columns, page-numbers, appendix]
---

Přidejte `flipped: true` do `#set page(..)`. Prohodí šířku a výšku, takže se stránka otočí o 90 stupňů, aniž byste sami přepočítávali rozměry:

```typ example
#set text(lang: "cs")
= Část na výšku
Normální stránka.
#pagebreak()
#set page(flipped: true)
= Široká tabulka
Tahle stránka je otočená na šířku, hodí se pro širokou tabulku.
#pagebreak()
#set page(flipped: false)
Zpátky na výšku.
```

`flipped` mění orientaci jen od místa, kde ho nastavíte, takže jedna široká tabulka nebo obrázek může mít vlastní stránku na šířku uprostřed jinak klasického dokumentu na výšku — otočte před ní, vraťte zpátky za ní.

## Celý dokument na šířku

Pokud má být na šířku celá práce, nastavte `flipped: true` jednou na začátku spolu s formátem papíru:

```typ example
#set page(paper: "a4", flipped: true, margin: 2cm)
#set text(lang: "cs")
= Široký obrázek
Celý tento dokument je na šířku, formát A4.
```

`paper: "a4"` (nebo `"us-letter"` apod.) zvolí standardní rozměry; `flipped: true` je pak prohodí na šířku.

## Časté problémy

- `flipped` prohazuje to, co je aktuálně nastavené jako `width`/`height` nebo `paper` — nastavte formát papíru nejdřív, nebo oboje zároveň, abyste otočili rozměr, který čekáte.
- Čísla stránek a okraje se přenesou beze změny; stránka na šířku si zachová stejné hodnoty `margin`, což na mnohem širší stránce může vypadat nevyváženě — podle potřeby upravte `margin` spolu s `flipped`.
- Kombinace `flipped: true` s více [sloupci](/two-columns) funguje, ale na jedné široké stránce na šířku většinou sloupce vůbec nepotřebujete.
