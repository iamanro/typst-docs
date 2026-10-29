---
title: Použití jiného písma
description: Přepněte písmo příkazem #set text(font: ..), zjistěte nainstalovaná písma pomocí typst fonts a nasměrujte Typst na vlastní soubory s písmy.
section: typst-tips
order: 8
related: [heading-numbering, two-columns, error-unknown-font-family]
---

Nastavte `font` v `#set text(..)` na název rodiny písma, přesně jak ho Typst hlásí, když se ho zeptáte, jaká písma vidí. Zkompilované příklady na této stránce se drží tří písem dodávaných s tímto webem (Libertinus Serif, New Computer Modern Math, DejaVu Sans Mono); na vlastním počítači můžete použít jakékoliv nainstalované písmo.

```typ example
#set text(lang: "cs")
#set text(font: "Libertinus Serif", size: 11pt)
Tento text používá písmo Libertinus Serif.

#set text(font: "DejaVu Sans Mono")
`kód()` a identifikátory vypadají lépe v neproporcionálním písmu jako DejaVu Sans Mono.

#set text(font: "Libertinus Serif")
Matematika ve výchozím stavu používá písmo New Computer Modern Math: $ integral_0^1 x^2 dif x = 1/3 $
```

Matematika používá samostatné „matematické písmo" (zde New Computer Modern Math), které poskytuje speciální varianty znaků potřebné pro vzorce; nenastavuje se stejně jako text — vybere se automaticky z dostupných písem, nebo ho explicitně zvolíte uvnitř `#show math.equation`.

## Zjištění písem na vašem počítači

Typst vidí jen písma, která najde — nainstalovaná v systému a ta, na která ho nasměrujete. Aktuální seznam zjistíte příkazem:

```bash
typst fonts
```

Pokud rodina, kterou chcete (třeba univerzitní firemní písmo nebo „Noto Serif" kvůli širší podpoře jazyků), v seznamu chybí, buď ji nainstalujte do systému, nebo Typstu řekněte, kde soubory najít.

## Použití písma, které Typst ještě nevidí

Soubory s písmem (`.ttf`/`.otf`) dejte do složky a při kompilaci ji předejte přes `--font-path`:

```bash
typst compile --font-path fonts/ paper.typ paper.pdf
```

```typ
#set text(font: "Noto Serif")
= Moje práce
Tento dokument teď používá písmo ze složky fonts/, ne systémové písmo.
```

`--font-path` lze zopakovat víckrát nebo nasměrovat na celý strom složek; Typst ho prohledá stejně jako systémové složky s písmy. Ve webovém editoru místo toho použijte panel pro nahrání písem — nastavení patří projektu, ne příkazové řádce.

## Záložní řetězce

`font` přijímá i pole, které se zkouší v pořadí, dokud se nenajde potřebný znak — hodí se, když jednomu písmu chybí nějaký znak nebo symbol:

```typ example
#set text(lang: "cs")
#set text(font: ("Libertinus Serif", "DejaVu Sans Mono"))
Tento odstavec uvádí záložní řetězec: Typst použije první písmo, které má potřebné znaky.
```

## Časté problémy

- Překlepnutý nebo neexistující název rodiny nezpůsobí chybu — Typst tiše přejde na náhradní písmo a místo toho vypíše varování „unknown font family"; viz [oprava chyby „unknown font family"](/error-unknown-font-family), pokud kvůli tomu padá build.
- Názvy písem se porovnávají podle rodiny, ne podle názvu souboru — zkontrolujte název, který hlásí `typst fonts`, ne jméno souboru s písmem.
- `--font-path` musí být uvedený při každé kompilaci; mezi jednotlivými spuštěními se nepamatuje, takže ho buildovací skripty potřebují pokaždé znovu.
