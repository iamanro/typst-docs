---
title: Chyby v Typstu
description: Jak číst diagnostiku Typst kompilátoru a jak opravit chybové a varovné hlášky, na které výzkumníci narážejí nejčastěji.
---

Typst se zastaví u první věci, které nerozumí, a vypíše diagnostiku se třemi částmi: **zprávou** (co je špatně), **umístěním** (`soubor.typ:řádek:sloupec`) a stříškou ukazující přesně na text, který chybu vyvolal. Například:

```
error: unknown variable `x`
  ┌─ main.typ:4:1
  │
4 │ #x
  │  ^
```

Tohle řekne soubor, řádek, sloupec i konkrétní místo, kde se Typst zasekl — obvykle to stačí k nalezení chyby bez dalšího pátrání.

## Opravte nejdřív první chybu

Typst nejdřív přeloží celý dokument a pak teprve vypíše všechny diagnostiky, takže jich často uvidíte víc najednou. Začněte **první** z nich. Jedna chyba — chybějící `#let`, neuzavřená závorka, překlep v argumentu funkce — často rozbije všechno, co po ní následuje, takže další hlášky bývají jen ozvěnou té první. Opravte ji, přeložte znovu a seznam se obvykle zkrátí nebo úplně zmizí.

Existují dva druhy diagnostik:

- **Chyby** zastaví kompilátor; dokument nevytvoří žádný výstup, dokud je neopravíte.
- **Varování** (v CLI a webové aplikaci žlutě) dokument i tak přeloží, ale upozorňují na něco, co asi nebylo záměrem — neznámé písmo nebo rozvržení, které se nedokázalo ustálit na konečné podobě.

Následující stránky citují přesnou zprávu, kterou Typst 0.15.1 vypisuje u běžných chyb, vysvětlují, co znamená, a ukazují opravu.
