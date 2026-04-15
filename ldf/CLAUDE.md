# @venite/ldf — agent guide

Core TypeScript classes for the Liturgical Document Format. **Pure data-model package.** No rendering, no I/O, no compilation of `lookup`s. Downstream packages (`components`, `html`, `docx`, `commonprayer`) layer behavior on top.

## Layout

- `src/index.ts` — barrel export. **Anything new must be re-exported here.**
- `src/liturgical-document.ts` — abstract root `LiturgicalDocument`. Defines the `type` discriminator const `TYPES` (line ~18), plus `Lookup`, `Value`, `DisplayFormat` unions.
- `src/utils/specific-class.ts` — hydrates plain JSON into typed subclasses by switching on `type`. **Every new doc type must be added here.**
- Doc subclasses: `text.ts`, `psalm.ts`, `heading.ts`, `rubric.ts`, `refrain.ts`, `responsive-prayer.ts`, `meditation.ts`, `image.ts`, `parallel.ts`, `option.ts`, `bible-reading/bible-reading.ts`.
- `src/liturgy/` — `Liturgy` container + `Preference`, `ClientPreferences`.
- `src/calendar/liturgical-day.ts` — day/season context passed into `.include()`.
- `src/condition.ts` — `Condition.include(day, prefs)` evaluates inclusion rules.
- `src/bible-reference/` — citation parsing, book names/abbreviations.
- `src/canticle-table/`, `src/citation/`, `src/sharing/`, `src/editing/`, `src/display-settings.ts` — peripheral helpers.
- `src/utils/` — `docs-to-liturgy.ts`, `docs-to-option.ts`, `find-collect.ts`, `sort-psalms.ts`, `unwrap-options.ts`, `version-to-string.ts`.
- `tests/*.test.ts` — jest, not colocated. Fixtures are inline.

## Class hierarchy

`LiturgicalDocument` (abstract) → discriminated union by `type` field:
`'liturgy' | 'heading' | 'option' | 'refrain' | 'rubric' | 'text' | 'responsive' | 'bible-reading' | 'psalm' | 'meditation' | 'image' | 'parallel'`

All subclasses use `Object.assign(this, data)` via the base constructor. **No validation.**

## Adding a new document type

1. Create `src/<type>.ts` extending `LiturgicalDocument`; set `type: '<type>'` as a literal.
2. Add `'<type>'` to the `TYPES` const in `src/liturgical-document.ts`.
3. Add a `case` in `src/utils/specific-class.ts` switch.
4. Re-export from `src/index.ts`.
5. Add a test in `tests/<type>.test.ts`.
6. If it renders, touch `components/`, `html/`, `docx/`.
7. If it requires `lookup` resolution or conditional insertion, add logic in **`commonprayer/src/services/compile-service.ts`** — compilation does not live in this package.

## Compile / lookup

**LDF stores `lookup`; it does not resolve it.** Resolution (seasonal antiphons, lectionary lookups, `@include` expansion) lives in `commonprayer/src/services/compile-service.ts`. When adding a field that requires server-side resolution, update that file too.

## Scripts

- `npm run build` — `format` + `build:esm` (`dist/`) + `build:cjs` (`dist/cjs/`) + typedoc.
- `npm test` — jest (ts-jest, node env).
- `npm run lint` — tslint.
- `npm run format` — prettier (120 col, single quote, trailing-all).
- `prepare` runs `build` automatically on install/link.

Dual ESM+CJS output. `main` → ESM. **Rebuild after edits if downstream packages consume `dist/`.**

## Gotchas

- **TypeScript 3.8.3.** No top-level await. Keep it that way.
- `strictPropertyInitialization: false` — most fields are optional/undefined-by-default. Null-check aggressively.
- `specific-class.ts` imports every subclass → circular-import risk. New subclasses: import `LiturgicalDocument` only; don't import from utils.
- tslint extends `tslint:recommended` + `prettier`. Respect both.
- Constructor takes `Partial<Self>`. Don't add runtime validation unless you also add it to every sibling.
- `condition.ts` evaluates `mode: 'and' | 'or'` over child conditions — nested precedence matters.
