# @venite/hymnal-api — agent guide

Scrapes Hymnary.org for hymn metadata (indices, text, scores).

## Surface (`index.ts`, 52 lines)

- `buildHymnaryIndices(hymnal, pages)` — paged index crawl.
- `buildIndex(urls)` — per-URL index builder.
- `indexFromPage()` — parse a single index page.
- `loadText()`, `loadScore()` — hymn detail fetchers.
- Returns `Hymn[]` type.

## Layout

- `index.ts` only.
- No `src/`, no `tests/`.

## Commands

- `npm run build` — `tsc`.

## Consumers

- `app/functions/`.

## Gotchas

- CSS-selector scraping — breaks when Hymnary.org changes markup. No automated tests guard against that.
- There's a known buggy ternary around `imageUrl` near line 49 — verify output before relying on it.
- Depends on `@venite/http`. No other internal deps.
