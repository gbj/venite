# @venite/adapter — agent guide

Converts legacy Venite v1 JSON → current LDF.

## Scope

- Entry: `index.ts` re-exports from `src/venite1.ts`. Public fn: `venite1toLDF()`.
- Handles v1 psalm / collect / reading / prayer only. No other format.
- No consumers inside the repo right now — used on an ad-hoc basis for imports.

## Layout

- `src/` — `venite1.ts` plus helpers.
- `tests/venite1.test.ts` — jest, fixture-based.

## Commands

- `npm run build` — `tsc`.
- `npm test` — jest.

## Gotchas

- Depends on `@venite/ldf`; bump ldf here when adding conversions for new doc types.
- Silent failure on unknown v1 shapes — add a defensive case, don't drop data.
