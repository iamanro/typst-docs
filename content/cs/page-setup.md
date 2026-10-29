---
title: Nastavte stránku
description: Formát papíru, okraje, číslování, záhlaví a zápatí, sloupce — vše nastavené jedním set pravidlem.
section: learn-typst
order: 4
related: [set-rules, tables, figures-and-images]
---

Rozvržení stránky je jen další [set pravidlo](/set-rules), na prvku `page`. Vše od formátu papíru po opakující se
záhlaví jde přes `#set page(...)`, obvykle jednou blízko začátku dokumentu. (Příklady na této stránce se vykreslují
malé, takže uvidíte spíš efekt okrajů a záhlaví než celý list A4 — ve skutečném dokumentu byste typicky zvolili i
`paper: "a4"` nebo `"us-letter"`.)

## Okraje

```typ example
#set page(margin: 1cm)

Text s okraji 1cm na všech stranách.
```

Okraje lze místo jednotně nastavit po stranách, s `x`/`y` pro obě osy nebo `left`/`right`/`top`/`bottom` pro úplnou
kontrolu:

```typ example
#set page(margin: (x: 1.5cm, top: 2cm, bottom: 1cm))

Širší boční okraje, víc místa nahoře.
```

## Formát papíru

`paper: "a4"`, `"us-letter"`, `"a5"` a mnoho dalších přednastavených formátů je zabudováno — úplný seznam je v
[referenci Typstu](https://typst.app/docs/reference/). Pro vlastní rozměr nastavte přímo `width` a `height` místo
`paper`.

```typ
#set page(paper: "a4")
#set page(width: 21cm, height: 29.7cm)   // odpovídá a4
```

## Číslování stránek

`numbering` bere vzorový řetězec, stejný druh, jaký se používá u nadpisů a obrázků: `"1"` pro obyčejná čísla,
`"1 / 1"` pro „strana / celkem“, `"i"` pro malé římské číslice.

```typ example
#set page(numbering: "1 z 1")

Číslo stránky se objeví automaticky dole.
```

## Záhlaví a zápatí

`header` a `footer` berou obsah, vložený na každou stránku. Použijte `context`, pokud obsah potřebuje znát něco
závislého na stránce, jako je aktuální číslo stránky přes `counter(page).display()`.

```typ example
#set page(
  header: [_Pracovní verze — nešířit_],
  footer: context [Strana #counter(page).display()],
)

Text těla; záhlaví a zápatí se opakují na každé stránce.
```

## Sloupce

`columns: 2` rozdělí tělo stránky na sloupce vedle sebe, užitečné pro konferenční příspěvky. Obsah plyne do
prvního sloupce a automaticky pokračuje do dalšího.

```typ example
#set page(columns: 2)
#set par(justify: true)

Krátký vícesloupcový text plyne automaticky z jednoho sloupce do druhého, jakmile se první zaplní, stejně jako
by to fungovalo v časopise se dvěma sloupci.
```

## Na šířku a jednorázové stránky

`flipped: true` prohodí šířku a výšku pro orientaci na šířku. Protože `page` je set pravidlo, můžete ho v polovině
dokumentu znovu nastavit — hodí se to pro jedinou širokou tabulku v jinak klasickém dokumentu na výšku — a platí
jen od toho místa dál.

```typ
#set page(flipped: true)

Sem patří široká tabulka nebo obrázek.

#set page(flipped: false)

Zpátky na výšku pro zbytek dokumentu.
```

## Zkuste si to sami

1. Nastavte asymetrické okraje (širší vlevo než vpravo) a ověřte efekt v příkladu.
2. Přidejte zápatí, které ukazuje „Strana N“ pomocí `counter(page).display()` uvnitř `context`.
3. Vyzkoušejte `columns: 2` s pár větami textu a podívejte se, kde padne zalomení sloupce.

## Ověřte si porozumění

```quiz
Jak docílíte, aby zápatí zobrazovalo aktuální číslo stránky?
- [ ] `#set page(footer: "číslo stránky")`
- [x] `footer: context [Strana #counter(page).display()]`
- [ ] Typst přidává čísla stránek automaticky, zápatí nelze přizpůsobit
> `context` umožní obsahu zápatí dotázat se na stavy závislé na stránce, jako je počítadlo stránek v místě, kde je umístěno.
```

```quiz
Co dělá `#set page(flipped: true)`?
- [ ] Zrcadlově otočí text vodorovně
- [x] Prohodí šířku a výšku pro orientaci na šířku
- [ ] Okamžitě přeskočí na další stránku
> `flipped` vymění šířku a výšku stránky, což je způsob, jak dosáhnout orientace na šířku.
```

## Co si zapamatovat

- Rozvržení stránky se nastavuje pomocí `#set page(...)`, obvykle jednou blízko začátku dokumentu.
- `margin` přijímá jedinou délku, nebo `(x:, y:)` / klíče po stranách pro asymetrické okraje.
- `numbering` používá stejné vzorové řetězce jako nadpisy a obrázky; `header`/`footer` berou obsah, s `context`
  pro hodnoty závislé na stránce jako `counter(page)`.
- `columns: n` rozdělí stránku na sloupce vedle sebe, které se automaticky plní.
- `#set page(...)` lze v polovině dokumentu zadat znovu a změnit rozvržení pro zbytek — třeba sekci na šířku.
