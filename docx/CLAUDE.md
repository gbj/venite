# @venite/docx — agent guide

LDF → DOCX exporter. Wraps the `docx` npm library.

## Surface

- Entry: `index.ts` → `src/ldf-to-docx.ts`. Public: `ldfToDocx(inDoc, displaySettings) => Promise<Document>`.
- Per-doc-type helpers: `bible-reading-to-docx.ts`, `heading-to-docx.ts`, `psalm-to-docx.ts`, …
- Styling mapper: `src/styles-from-ldf.ts`.

## Layout

- `src/` — per-type helpers.
- `tests/` — JSON fixtures + `manual-test.ts`. **No automated tests.**

## Commands

- `npm run build` — `tsc`.
- No `test` script — run `manual-test.ts` directly with `ts-node` + a fixture.

## Consumers

- `app/functions/` (server-side DOCX generation).

## Gotchas

- Async all the way down (`Promise<Document>`).
- Uses `html-entities` + `isomorphic-fetch` — avoid adding Node-only APIs if this is ever run in a browser bundle.
- When a new LDF doc type is added, add a sibling `*-to-docx.ts` helper and wire it into `ldf-to-docx.ts`.
