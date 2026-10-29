---
title: Oprava chyby „unexpected argument: fil"
description: Předali jste pojmenovaný argument, který funkce nepřijímá — téměř vždy překlep v jeho jméně.
section: typst-errors
related: [error-expected-type, error-unknown-variable, markup-and-code]
---

```typ error
#set page(width: 10cm, height: auto, margin: 8mm)
#rect(fil: blue)
```

## Co to znamená

Typstovy funkce přijímají pevnou, zdokumentovanou sadu pojmenovaných argumentů. `rect()` má `fill`, ne `fil`; předání jakéhokoliv jména, které nerozpozná, okamžitě selže ještě předtím, než se funkce vůbec spustí, protože Typst nemůže hádat, jestli jste mysleli `fill`, `file`, nebo něco úplně jiného. Hláška jmenuje přesně argument, který odmítl.

## Časté příčiny

**Překlep ve jméně argumentu.** Oprava je prostě správné znění:

```typ example
#rect(fill: blue)
```

**Použití jména argumentu z jiné funkce.** `text()` má `size`, `image()` má `width` a `height`, `rect()` má `width`, `height`, `fill`, `stroke`, `radius` — jejich záměna (třeba předání `stroke` funkci, která jen sází `image`) vyvolá stejnou chybu. Ověřte si referenci dané funkce, ne podobnou, kterou si pamatujete.

**Přejmenovaný nebo odstraněný argument po aktualizaci Typstu.** Občas se jméno argumentu mezi verzemi změní; changelog verze, na kterou jste přešli, to uvede. `typst --version` potvrdí, který kompilátor volání vlastně odmítá.

## Zkontrolujte si porozumění

```quiz
`#image("x.png", smooth: true)` selže s hláškou „unexpected argument: smooth". Co zkontrolovat nejdřív?
- [x] Jestli `image()` vůbec takový argument má
- [ ] Jestli je obrázek poškozený
- [ ] Jestli má dokument pravidlo `#set page`
> „Unexpected argument" znamená, že Typst to jméno vůbec nezná. Reference funkce `image` ukáže to správné: `scaling: "smooth"`.
```
