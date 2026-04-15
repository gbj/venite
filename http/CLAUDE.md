# @venite/http — agent guide

Tiny Node HTTPS + HTML-parse util. Used by other scrapers.

## Surface (`index.ts`)

- `httpsGet(url, headers) => Promise<string>` — raw body.
- `requestHTML(url) => Promise<HTMLElement>` — body parsed via `node-html-parser`.
- Re-exports `HTMLElement` from `node-html-parser`.

## Layout

- Just `index.ts`. No `src/`, no `tests/`.

## Commands

- `npm run build` — `tsc`.

## Consumers

- `@venite/hymnal-api` directly; `@venite/bible-api` via similar helpers.

## Gotchas

- **HTTPS only.** No HTTP, no redirects. Don't add either without also adding tests.
- No timeout, no retries. Callers own backoff.
