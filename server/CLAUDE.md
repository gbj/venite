# server — agent guide

NestJS 7 WebSocket server for real-time multi-user OT editing of LDF documents. Private (not published). Minimal HTTP surface (health-check only).

## Layout

- `src/main.ts` — `NestFactory.create`, listens on :3000.
- `src/app.module.ts` — imports `EditorModule`.
- `src/app.controller.ts` — health-check `GET /`.
- `src/editor/editor.module.ts` — provides `EditorGateway`.
- `src/editor/editor.gateway.ts` — `@WebSocketGateway()`. Events below.
- `src/editor/document-manager.ts` — OT merge logic (the actual brains).
- `src/app.controller.spec.ts`, `test/app.e2e-spec.ts` — jest + jest-e2e.

## WebSocket events (`editor.gateway.ts`)

| Event | Direction | Purpose |
|---|---|---|
| `join` | client→server | User joins a doc; server emits `joined` with current state. |
| `leave` | client→server | Remove user from manager. |
| `refreshDoc` | client→server | Re-send current doc state. |
| `cursorMoved` | client→server→clients | Broadcast caret position. |
| `sentChange` | client→server | Queue an OT change; server transforms, applies, broadcasts. |

## OT merge

- Library: `ot-json0`.
- `document-manager.applyNextChange()` pops the pending queue:
  - If client revision < server revision, call `json0.type.transform()` to rebase.
  - `json0.type.apply()` merges the op.
- Changes carry a nested `path` + an op object; `Change.fullyPathedOp()` joins them.
- Revision log + pending queue are **in-memory only — no persistence, no cleanup.** Long-lived processes will leak.

## Run / build

- `npm start` — `nest start`.
- `npm run start:dev` — `tsc-watch` + `node -r esm dist/main.js`.
- `npm run start:debug` — `nest start --debug --watch`.
- `npm run build` / `start:prod` — `nest build` → `node -r esm dist/main`.
- `npm test` / `test:e2e`.

## Gotchas

- **NestJS 7** (legacy). Many newer decorators / DI patterns don't apply.
- **esm wrapper** required in prod and dev (`-r esm`) because `ot-json0` ships ESM-only.
- `@venite/ldf` is pinned to `^0.2.0` in `package.json` — **two major versions behind the rest of the repo.** Assume the API surface here is stale; don't import new `ldf` classes without bumping and testing.
- Docs are **hardcoded** in `editor.gateway.ts:12-103`. No DB. Production deploys almost certainly patched this; verify current state before changing.
- No auth on the gateway. Don't expose publicly without adding one.
