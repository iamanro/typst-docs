---
title: Obrázky, které mluví samy za sebe
description: Co dělá obrázek čitelným na první pohled, jak napsat popisek, který opravdu pomáhá, a příklad v Typstu, podle kterého se ověřit.
section: research-writing
order: 3
related: [figures-and-images, cite-responsibly, appendix]
---

Čtenář, který pochopí vaši kapitolu Výsledky, aniž by četl její text, má dobré obrázky. To je měřítko: obrázek má nést zjištění a popisek má obsahovat dost kontextu, aby fungoval, i když ho někdo vyjme z článku jako samostatný screenshot.

## Jeden obrázek, jedna myšlenka

Každý obrázek by měl učinit zřejmým jedno tvrzení. Pokud máte pokušení „kvůli úspoře místa“ nacpat do jednoho grafu tři srovnání najednou, obvykle tím schováváte skutečné zjištění za dvě další, o která nikdo nestál. Rozdělte to na dva obrázky, nebo druhé srovnání přesuňte do příloh. Čtenář si zapamatuje tu jednu věc, kterou mu obrázek ukázal — ne čtvrtý řádek v šestiřádkové legendě.

Zkontrolujte čitelnost popisků v reálné velikosti tisku, ne ve velikosti, v jaké dokument upravujete. Graf, který vypadá dobře na celou obrazovku, může být na šířku jednoho sloupce nečitelný. Pokud obrázek vkládáte funkcí [`figure`](/figures-and-images) v Typstu, zkontrolujte ho v šířce stránky, kterou skutečně používá cílová šablona, ne v širším rozvržení konceptu.

## Popisek musí odvádět skutečnou práci

Popisek není nadpis. Měl by obrázku umožnit fungovat samostatně:

- **Co je vynesené** — osy, jednotky, co znamená čára nebo barva, pokud to není z obrázku zřejmé.
- **Jak vznikl**, jednou větou, pokud je to pro interpretaci důležité („zprůměrováno přes 20 běhů“, „n = 340“).
- **Hlavní zjištění**, srozumitelným jazykem, zvlášť u obrázků s velkým množstvím detailů. Věta „chybovost prudce klesá nad 10 vzorky na třídu“ je na konci popisku užitečnější, než aby to čtenář musel sám odvodit z křivky.

```typ example
#set text(lang: "cs")
#figure(
  rect(width: 4cm, height: 2.5cm, fill: luma(240), stroke: 0.5pt)[
    #place(bottom + left, dx: 0.3cm, dy: -0.3cm)[Y]
    #place(bottom + right, dx: -0.3cm, dy: -0.3cm)[X]
  ],
  caption: [
    Přesnost (Y) v závislosti na velikosti trénovací sady (X),
    zprůměrováno přes 20 běhů. Přesnost se ustaluje nad 10 000 příklady.
  ],
) <obr-schema>

Jak ukazuje @obr-schema, přínos dalších dat rychle klesá.
```

Typst čísluje obrázky a propojuje odkazy automaticky přes `#figure` a `@` — „Obrázek 3“ nikdy nepíšete ručně, takže přeuspořádaný nebo smazaný obrázek nemůže nechat za sebou zastaralé číslo. O jednu věc méně při finální kontrole — nenahrazuje to ale napsání výstižného popisku.

## Myslete na černobílý tisk a barvoslepost

Nezanedbatelná část čtenářů tiskne černobíle, nebo nerozliší červenou od zelené. Klíčový rozdíl proto kódujte i tvarem, vzorkem nebo polohou, ne jen barvou — čárkované versus plné čáry, plné versus prázdné značky — aby obrázek přežil špatný tisk i pohled čtenáře s deuteranopií. Pokud se musíte spolehnout jen na barvu, zvolte paletu navrženou právě pro tento účel a v popisku napište, co která barva znamená, protože černobílý tisk legendu znehodnotí.

## Konzistence napříč článkem

V každém obrázku používejte stejné jednotky, přesnost desetinných míst i konvence os — pokud Obrázek 2 vynáší přesnost v procentech a Obrázek 5 jako zlomek, čtenář se musí zastavit a dohledávat, které je které. Stejně tak terminologie: pokud v Metodách nazýváte něco „podmínka A“, nepřejmenovávejte to v obrázku na „základní linii“. Tyhle drobné nesrovnalosti recenzenti odhalí jako první, protože naznačují, že obrázky vznikaly v různou dobu bez finálního sjednocení — viz [odpovídání na recenzi](/answer-peer-review), jak recenzenti obrázky čtou.
