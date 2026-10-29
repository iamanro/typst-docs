---
title: Oprava hlášky „unknown font family"
description: Varování, ne chyba — Typst dokument i tak přeložil, ale písmo zadané přes #set text(font: ...) není nainstalované ani vložené.
section: typst-errors
related: [fonts, error-expected-type]
---

Spuštění Typstu 0.15.1 na tomto dokumentu:

```typ
#set page(width: 10cm, height: auto, margin: 8mm)
#set text(font: "Helvetica Neue")
Hello world
```

vypíše toto varování a přesto přeloží dokument, s náhradním písmem:

```
warning: unknown font family: helvetica neue
  ┌─ main.typ:2:16
  │
2 │ #set text(font: "Helvetica Neue")
  │                 ^^^^^^^^^^^^^^^^
```

Je to **varování**, ne chyba: Typst pořád vytvoří výstup, jen ne s písmem, které jste chtěli, takže je snadné si ho nevšimnout, dokud někdo neotevře PDF a písmo nebude vypadat, jak má.

## Co to znamená

`font:` bere přesně jméno rodiny písma, jak je uvedené v jeho vlastních metadatech — ne jméno souboru, ne jméno, které ukazuje výběr písem v operačním systému, a ne nutně jméno ze stránky, odkud jste písmo stáhli. Pokud Typstovo hledání písem (systémová písma, vložená písma a vše předané přes `--font-path`) žádnou rodinu toho jména nenajde, varuje a dosadí náhradní.

## Časté příčiny

**Písmo prostě není nainstalované** tam, kde se dokument překládá. Písmo dostupné na vašem notebooku není automaticky dostupné na CI serveru, kolegově počítači nebo při sestavování tohoto webu — ověřte, jaká písma skutečně poskytuje dané sestavovací prostředí.

**Zobrazované jméno se liší od jména rodiny.** Mnoho písem se v uživatelském rozhraní jmenuje „Rodina Light" nebo „Rodina Condensed Bold", zatímco samotná rodina je jen „Rodina", s řezem a stylem nastavenými zvlášť přes `weight:` a `style:`. Použijte jméno rodiny a řez upravte zvlášť:

```typ
#set text(font: "Libertinus Serif", weight: "bold")
Hello world
```

**Překlep nebo špatná velikost písmen ve jméně.** Typst porovnává bez ohledu na velikost písmen (varování výše ukazuje jméno malými písmeny), ale zbytek pravopisu musí sedět přesně, včetně mezer.

## Co si zapamatovat

- „Unknown font family" je varování: dokument se přeloží i tak, jen se špatným písmem.
- Použijte jméno rodiny písma, ne zobrazovaný popisek ani jméno souboru.
- Ověřte, jaká písma jsou dostupná tam, kde se dokument doopravdy překládá, ne jen u vás na počítači.
