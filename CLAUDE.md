# venite — agent guide

Monorepo for the Liturgical Document Format (LDF) and the Venite.app ecosystem.
**Not a workspace/lerna repo.** Each top-level dir is an independent npm package with its own `package.json`, `tsconfig.json`, tests, and lint config. No root `package.json`. No CI config.

## Packages

| Dir | Name | Purpose | Pub? |
|---|---|---|---|
| `ldf/` | `@venite/ldf` | Core TS classes for the Liturgical Document Format | npm |
| `components/` | `@venite/components` | Stencil 2 web components that render/edit LDF | npm |
| `angular/` | `@venite/angular` | Auto-generated Angular proxies for `components` | npm |
| `adapter/` | `@venite/adapter` | Converts legacy Venite v1 JSON → LDF | npm |
| `docx/` | `@venite/docx` | LDF → DOCX exporter | npm |
| `html/` | `@venite/html` | LDF → HTML string renderer | npm |
| `http/` | `@venite/http` | Tiny HTTPS+HTML-parser util | npm |
| `bible-api/` | `@venite/bible-api` | Scrapes Bible text from public sources | npm |
| `hymnal-api/` | `@venite/hymnal-api` | Scrapes Hymnary.org | npm |
| `app/` | `Venite` | Main Ionic/Angular/Capacitor app (private) | no |
| `server/` | `server` | NestJS OT collab WebSocket server (private) | no |
| `commonprayer/` | — | Deno SSG for the Book of Common Prayer | no |
| `liturgy_backups/` | — | JSON data backups, no code | no |

Each package has its own `CLAUDE.md`. **Start there before editing.**

## Dependency graph (build order)

```
ldf
 ├── adapter, docx, html, bible-api, components
 │                                    └── angular
 ├── server (pinned ^0.2.0, stale)
http
 └── hymnal-api
app (private) ─ consumes all published packages + `projects/` libs
commonprayer  ─ consumes @venite/ldf, @venite/html via skypack CDN
```

Correct order when rebuilding from scratch:
`ldf` → `http` → (`adapter`, `docx`, `html`, `bible-api`, `hymnal-api`, `components`) → `angular` → `app`.

## Cross-cutting rules

- **No root build.** To rebuild a package, `cd <pkg> && npm run build`. To propagate a change to `app`, bump the consumer's `package.json` or `npm link`.
- **TypeScript versions differ per package** (3.8.3 / 3.9.3 / 4.3.5). Do not "upgrade" a package's TS without a reason — pinned on purpose.
- **Linter is `tslint`, not eslint.** Run `npm run lint` where it exists before committing.
- **Formatter is prettier (when configured).** `ldf`, `server`: 120 col, trailing commas, single quotes. Other packages: unformatted; do not reformat files you did not otherwise change.
- **Tests:** jest for `ldf`, `components`, `server`, `adapter`, `bible-api`. Karma/jasmine for `app`. No tests for `angular`, `html`, `http`, `hymnal-api`, `docx` (manual fixtures only).
- **No commits of `dist/`, `node_modules`, `www/`, `.firebase/`** — see `.gitignore`.

## Task routing

- Format/schema change (new doc type, new field): start in `ldf/`, then update `components/`, `html/`, `docx/` renderers.
- UI rendering/editing change: `components/` (Stencil) → rebuild → `angular/` proxies regenerate automatically via Stencil output target → `app/` picks up on next install.
- New app screen/feature: `app/src/app/…` (see `app/CLAUDE.md`).
- Real-time collab/OT: `server/` + `components/ldf-editor`.
- Prayer book content (text/data): `commonprayer/src/liturgy/` or `liturgy_backups/`.
- Importing a legacy JSON doc: `adapter/`.
- Bible/hymn data fetchers: `bible-api/`, `hymnal-api/`.

## Gotchas that bite everyone

- `server/package.json` pins `@venite/ldf: ^0.2.0` but current ldf is `0.21.x`. The server uses an ancient LDF API. Do not assume symmetry.
- `app/` mixes Cordova (`@ionic-native/*`) with Capacitor plugins. Check which plugin family a feature already uses before adding another.
- `angular/src/directives/proxies.ts` is **auto-generated** from `components/`. Never hand-edit.
- `commonprayer/` runs on **Deno**, not Node. Two tsconfigs: `tsconfig.deno.json` (build) vs `tsconfig.json` (editor only).
- Firestore rules live in `app/firestore.rules`, not at root. Root `appflow.config.json` is Ionic Deploy config for `app/` only.

## Branches & commits

- `master` is the main branch.
- Dev work on `claude/*` branches. Push with `git push -u origin <branch>`.
- Commits here are ad-hoc (not Conventional Commits). Match surrounding style; keep messages short.
