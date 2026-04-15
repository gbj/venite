# @venite/html — agent guide

LDF → plain HTML string renderer. Zero framework dependency.

## Surface

- Entry: `index.ts` → `ldfToHTML(doc, config: LDFToHTMLConfig) => string`.
- Per-doc-type helpers in `src/` (12 files: `bible-reading.ts`, `psalm.ts`, `heading.ts`, `rubric.ts`, …).
- Optional stylesheet: `src/style.css`.

## Layout

- `src/` — rendering fns + CSS.
- No tests.

## Commands

- `npm run build` — `tsc --target es6`.
- No `test`, no `lint`.

## Consumers

- `commonprayer/` via `https://cdn.skypack.dev/@venite/html`.

## Gotchas

- Config's `lookupLinks` callback is required when docs contain `lookup` refs. Caller resolves hrefs.
- String concatenation, no escaping helpers. **HTML-escape all user-contributed text before interpolating.**
- New LDF type → add a matching `src/<type>.ts` and dispatch from the top-level switch.
