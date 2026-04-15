# @venite/angular — agent guide

Thin Angular wrapper around `@venite/components`. **Almost entirely auto-generated.**

## Layout

- `src/directives/proxies.ts` — **auto-generated** by the Stencil `@stencil/angular-output-target` during `components/` build. ~3000 lines. **Never hand-edit.**
- `src/directives/utils.ts` — small runtime glue.
- No tests.

## To change something

1. Edit the Stencil component in `../components/src/components/...`.
2. `cd ../components && npm run build`. Stencil writes into `../angular/src/directives/proxies.ts`.
3. `cd ../angular && npm run build` (just `tsc`).

## Commands

- `npm run build` — `tsc`.
- No `test`, no `lint`.

## Gotchas

- Version numbers follow `@venite/components`. Bump together.
- Consumers (`app/`) pin by range in `package.json`; `npm link ../angular` when testing locally.
