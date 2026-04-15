# @venite/components — agent guide

Stencil 2 web-component library rendering and editing `@venite/ldf` documents. Tag prefix is **`ldf-`**. 37 components in `src/components/`. Consumed by `@venite/angular` proxies and `app/`.

## Layout

- `src/components/<tag>/<tag>.tsx` — component class.
- `src/components/<tag>/<tag>.scss` — scoped styles. 35/37 use `scoped: true`.
- `src/components/<tag>/<tag>.i18n.<lang>.json` — translations (copied to `dist/` by `copy-json.sh`).
- `src/components/<tag>/<tag>.e2e.ts` — optional Puppeteer test.
- `src/components/<tag>/readme.md` — auto-generated docs. **Don't edit by hand.**
- `src/global/global.scss` — CSS custom-property tokens (`--ldf-*`).
- `src/index.ts` — public exports (re-export new public components here).
- `stencil.config.ts` — outputs: `dist/esm`, `dist/cjs`, `dist/collection`, `dist/types`, `dist/ldf-components.js` (unpkg), **and regenerates `../angular/src/directives/proxies.ts`.**

## Key components

- `ldf-editor` — root editing surface; owns cursors/users, emits `editorDocShouldChange`.
- `ldf-liturgical-document` — recursive dispatcher; picks the right child component by `type`.
- `ldf-editable-text` — textarea/input wrapper. Core editing surface. Diffs via `diff-match-patch` (`handle-input.ts`), emits `ldfDocShouldChange`.
- `ldf-psalm`, `ldf-bible-reading`, `ldf-option`, `ldf-liturgy`, `ldf-editor-cursors`.

## Editing pattern

1. Leaf editable emits `ldfDocShouldChange` (`CustomEvent`, `bubbles: true`).
2. Event payload is an LDF `Change`: JSON-Pointer `path` + `op` array (`set` / `edit` / `insertAt` / `deleteAt`).
3. `ldf-editor` aggregates changes and emits `editorDocShouldChange` to the host.
4. Text diffs are converted to `edit` ops with skipCounter/insert/delete markers (`editable-text/handle-input.ts`).
5. `handleInput()` is **debounced 1250 ms** — don't expect immediate emission.

Cursors: `Cursor { path, index, detail }` piped via `@Prop() cursors`. Caret coords calculated with `textarea-caret` against `textarea.selectionStart`. Shadow-DOM piercing uses `query-selector-shadow-dom`.

## Adding a component

1. `npm run generate` → prompts for tag (use `ldf-*`).
2. Implement in `.tsx`: import `{ Component, Prop, State, Event, EventEmitter, h }` from `@stencil/core`.
3. Use `@Event({ bubbles: true })` for tree-propagating changes.
4. Add scoped styles in `.scss`. Consume global tokens from `global.scss`.
5. Re-export from `src/index.ts` if public.
6. `npm run build` regenerates `readme.md` and Angular proxies.

## Styling

- Tokens in `src/global/global.scss`: `--ldf-background-color`, `--ldf-font-face`, `--ldf-title-*`, `--ldf-response-*`, …
- Dark mode: `.dark` class flips tokens.
- Ionic Core 6.2.5 UI primitives (`ion-button`, `ion-select`, `ion-checkbox`) available throughout.

## Scripts

- `npm start` — `stencil build --dev --watch --serve` (dev server).
- `npm run build` — `stencil build --docs` + `./copy-json.sh`.
- `npm test` / `npm run test.watch` — jest via `@stencil/core/testing/jest-preprocessor`.

## Gotchas

- **TypeScript 3.8.3, jsxFactory `h`**, experimentalDecorators.
- `.i18n.*.json` files are only picked up via `copy-json.sh`; skipping the script breaks translations in `dist/collection/`.
- Shadow-DOM boundaries → use `query-selector-shadow-dom` for cross-shadow queries.
- After any public API change, rebuild so the Angular output target regenerates `../angular/src/directives/proxies.ts`. That file is auto-generated — do not hand-edit.
- Debounce in `editable-text` (1250 ms) means unit tests and e2e checks must wait or flush timers.
- JSON-Pointer paths are array-index based; off-by-one bugs here are the most common cause of desync.
