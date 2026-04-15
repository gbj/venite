# commonprayer — agent guide

**Deno** static-site generator for the Episcopal Church's authorized liturgies (Daily Office, Eucharist, Calendar, Collects, Psalter, Pastoral Offices, Marriage). Hosted on Firebase. Not an npm package — no `package.json`.

## Layout

- `src/ssg.ts` — build entry point.
- `src/ssg/` — build machinery: pages, CSS, scripts, TOC, dev server.
- `src/pages/` — JSX page components (one dir per top-level route).
- `src/components/` — reusable JSX.
- `src/liturgy/` — JSON liturgical content: `psalter/bcp1979/psalm-*.json`, `office/`, `eucharistic-prayers/`, `opening-sentences/`, `invitatory-antiphons/`, `canticle/`, `pastoral-offices/`, `marriage/`.
- `src/scripts/` — client-side TS bundles.
- `src/styles/` — CSS.
- `src/assets/calendar/lff2018.json` — Lesser Feasts & Fasts calendar.
- `src/services/compile-service.ts` — **LDF compilation lives here**, not in `@venite/ldf`. Resolves `lookup`, applies `condition`, inserts seasonal antiphons.
- `utils/` — one-off scripts (`build-canticles.ts`, `properPrefaces.ts`, `collect-order/`), not part of the build.
- `www/` — build output (git-ignored).
- `run.sh` — run script (see below).

## Tech

- **Deno** runtime (not Node). JSX via `vhtml` (zero-runtime), not React/Preact.
- LDF consumed via `https://cdn.skypack.dev/@venite/ldf` (pinned via Deno URL imports).
- Firebase Hosting (`firebase.json` → `hosting.public: "www"`).

## Commands

```sh
./run.sh              # full build → www/
./run.sh dev          # watch + WebSocket hot reload (localhost:8000)
./run.sh pages-only   # skip assets/scripts
firebase deploy       # push www/ to Firebase Hosting
```

`run.sh` wraps: `deno run -c tsconfig.deno.json --allow-run --allow-read --allow-write --allow-net --unstable src/ssg.ts`.

## Gotchas

- **Two tsconfigs.** `tsconfig.deno.json` is the truth (includes `deno.window`, `deno.unstable`). `tsconfig.json` exists only so editors show DOM types; don't use it for builds.
- Don't commit `www/` — it's build output.
- Liturgy JSON files are hand-edited canonical data. Changes to these are content changes, not code changes.
- `src/liturgy/` is the canonical source; `app/src/offline/` holds a separately maintained bundled copy. A content fix usually needs to land in **both** places (or be regenerated into the app).
- Compile logic (lookups, antiphon insertion) is here, **not in `@venite/ldf`**. Update both when a new doc type needs resolution.
- No tests. Build success = contract.
