# @venite/bible-api — agent guide

Fetches Bible text from public sources and returns LDF `BibleReading` objects.

## Sources

One scraper per version: `src/esv.ts`, `src/nrsv.ts`, `src/ceb.ts`, `src/kjv.ts`, `src/you-version.ts`, `src/bible-gateway.ts`. Dispatcher: `src/get-bible-text.ts` (`getBibleText(citation, version)`).

## Layout

- `index.ts` — re-exports.
- `src/` — per-version scrapers + dispatcher.
- `tests/` — jest suite.

## Commands

- `npm run build` — `tsc`.
- `npm test` — jest.

## Consumers

- `app/functions/` (Firebase Cloud Function endpoints).

## Gotchas

- Scraping is brittle. When a source's HTML changes, the failing test is the canary — **fix the scraper, don't delete the test.**
- Depends on `@venite/ldf`. Output must round-trip through `specificClass()`.
- No retry/backoff. Don't hammer upstream in loops.
- KJV currently comes via Oremus (see recent commit history).
