---
title: Psaní matematiky
description: Matematika v textu versus v bloku, symboly a zlomky, zarovnání výpočtu pomocí &, a číslování rovnic.
section: tutorial
order: 3
related: [tutorial/text-and-structure, tutorial/figures-and-references, number-equations]
---

Typst má vlastní matematický režim, který se vstupuje dolarovými znaky.
Nic se nemusí načítat a žádný preambuli nastavovat — `$...$` prostě funguje
a vypadá podobně jako to, co byste napsali ručně.

## Matematika v textu versus v bloku

`$x^2$` bez mezer kolem dolarových znaků zůstane **v textu**, na stejném
řádku jako okolní text, ve stejné velikosti: obsah je $A = pi r^2$. Přidáte
mezeru hned za úvodní `$` a hned před koncové `$` — `$ x^2 $` — a rovnice
se stane **blokem**: dostane vlastní vystředěný řádek s větším prostorem,
což se hodí pro cokoli delšího než pár symbolů.

## Symboly a zlomky

Řecká písmena a operátory se píšou jako jméno: `alpha`, `beta`, `pi`,
`sum`, `integral`, `times`, `->` se všechny vysází jako své symboly bez
jakéhokoli escapování. Zlomek je prostě `/`: `(1 + sqrt(5)) / 2` se
vysází jako skutečný zlomek nad sebou, ne jako lomítko — Typst tvar
rozpozná a podle toho ho vysází. Horní a dolní indexy používají `^` a `_`,
stejně jako ve většině matematického zápisu, a `sqrt(...)` obalí hodnotu
odmocninou.

## Zarovnání výpočtu pomocí `&`

Víceřádkový výpočet je jedno z mála míst, kde blok matematiky potřebuje
pomoc výslovně: bez ní Typst nemá jak poznat, které části každého řádku
mají být zarovnané pod sebou. Napište `&` přímo před část, kterou chcete
zarovnat, a řádky oddělte `\`, stejně jako u tvrdého zalomení v textu.

```typ lab
#set page(width: 10cm, height: auto, margin: 8mm)
#set text(lang: "cs")
#set math.equation(numbering: "(1)")

Obsah kruhu je $A = pi r^2$, kde $r$ je poloměr.

$ A &= pi r^2 \
    &= pi (2"cm")^2 \
    &= 4 pi thin "cm"^2 $ <eq:obsah>

Viz @eq:obsah pro rozpis výpočtu. Zlatý řez je
$ phi = (1 + sqrt(5)) / 2 approx 1.618. $
```

**Co byste měli vidět:** větu s malým vzorcem v textu, číslovaný
třířádkový výpočet, ve kterém se každé `=` zarovná do stejného sloupce, a
pod ním nečíslovanou blokovou rovnici pro zlatý řez.

## Číslování rovnic

Blokové rovnice se standardně nečíslují — většina krátkých rovnic se
později neodkazuje. Číslování zapnete globálně příkazem
`#set math.equation(numbering: "(1)")` umístěným jednou poblíž začátku
dokumentu; každá bloková rovnice po něm dostane průběžné číslo ve stylu,
který zadáte, a `"(1)"` můžete kdykoli vyměnit za `"1."` nebo `"[1]"`, aniž
byste museli měnit cokoli jiného. Dejte rovnici popisek jako `<eq:obsah>`
hned za ní a `@eq:obsah` kdekoli jinde v dokumentu se změní na klikatelné
„(1)", které vždy odpovídá skutečnému číslu — i kdybyste později přidali
rovnice dřív a všechno se posunulo.

## Vyzkoušejte si to

1. Odstraňte mezeru uvnitř `$ phi = ... $` na obou stranách (`$phi = ...$`)
   a sledujte, jak se z vlastního vystředěného bloku změní na text v
   odstavci.
2. Změňte formát číslování na `"1."` a sledujte, jak se číslo výpočtu i
   odkaz na něj ve větě nad ním aktualizují společně.
3. Přidejte do výpočtu čtvrtý řádek, `&= pi dot 4 thin "cm"^2`, začínající
   `&`, aby zůstal zarovnaný s ostatními.

## Ověřte si, že to chápete

```quiz
Proč se `$ x^2 $` (s mezerami uvnitř dolarových znaků) vysází jinak než `$x^2$` (bez mezer)?
- [ ] Jsou stejné, mezery se ignorují
- [x] Mezery přepnou rovnici z textové na vlastní vystředěný blok
- [ ] Mezery uvnitř matematiky vždy způsobí chybu
> Mezera hned za `$` a hned před koncovým `$` řekne Typstu, aby rovnici vysázel jako blok místo v textu.
```

```quiz
Co dělá `&` ve víceřádkové rovnici?
- [ ] Vloží znak ampersand
- [x] Označí místo v každém řádku, které se má zarovnat svisle s ostatními řádky
- [ ] Začne novou rovnici
> `&` je zarovnávací bod; Typst srovná všechno před prvním `&` v každém řádku pod sebe, a totéž pro to, co následuje.
```

## Co si zapamatovat

- `$x$` bez mezer okolo je v textu; `$ x $` s mezerami na obou stranách je
  vystředěný blok.
- Symboly se píšou jako jméno (`alpha`, `sum`, `->`); `/` vytvoří
  skutečný zlomek.
- `&` zarovnává víceřádkové výpočty; `\` řádky odděluje.
- `#set math.equation(numbering: "(1)")` očísluje každou blokovou rovnici
  po sobě a popisek s `@popisek` drží odkazy pořád aktuální.
