# app — agent guide

Venite main app. Ionic 6 + Angular 12.2 + Capacitor 7 (iOS/Android) + Firebase (Firestore + Auth) + RxJS 6.5. Private (not published).

## Stack quirks

- **Mixes Cordova and Capacitor plugins.** Media = `@ionic-native/media` (Cordova); TTS / MediaSession / Preferences / Filesystem = Capacitor. Check which family a feature already uses before adding.
- **tslint, not eslint.** RxJS 6.5 (pipeable operators imported individually).
- `ng-packagr` sub-libraries live in `projects/` — locally linked by version in `package.json`.

## Layout

- `src/app/` — pages and services (root of AngularApp).
  - `src/app/app.module.ts` — root providers, Firebase init.
  - `src/app/app-routing.module.ts` — 20+ lazy-loaded routes; `LoginGuard` on `bulletins`, `templates`, `template`, `favorites`, `issues`, `prayer-list`.
  - `src/app/services/` — core cross-cutting services (see list below).
  - Pages: `about/`, `auth/`, `bulletins/`, `daily-readings/`, `editor/`, `favorites/`, `home/`, `issues/`, `lectionary/`, `meditate/`, `organization/`, `pray/`, `prayer-list/`, `psalter/`, `preferences/`, `settings/`, `templates/`, `tutorials/`. Each has its own `*.module.ts` + `*-routing.module.ts`.
- `projects/` — Angular libraries (ng-packagr), published to npm as `@venite/ng-*`:
  - `ng-pray`, `ng-pray-menu`, `ng-reminders`, `ng-darkmode`, `ng-platform`, `ng-service-api`, `ng-localstorage`.
  - Each has `ng-package.json` and `public-api.ts`. Build into root `dist/`.
  - `ng-service-api` declares DI tokens (`BIBLE_SERVICE`, etc.); app binds implementations in `app.module.ts`.
- `src/offline/` — **bundled offline LDF data** shipped with the app. Subdirs:
  - `liturgy/*.ldf.json` — full precompiled services (Rite I/II, EOW, Daily Devotions, es-LOC/es-Rite-II, compline/morning/evening/noonday, litany, supplication, angelus, eucharist).
  - `psalter/psalms.json`, `category/{en,es}-*.json`, `lectionary/{bcp1662,bcp1979_*,rclsunday*}.json`, `bible/nrsv_structure.json`, `kalendar.json`, `canticle_table.json`, `colors.json`, `versions.json`, `weeks.json`, `by_slug.json`.
  - These are **downstream artifacts** of `commonprayer/src/liturgy/` compilation, not canonical sources. When a canonical change lands in `commonprayer/`, the matching offline file here must be regenerated. The files are huge; treat diffs as data, not code.
- `functions/` — Firebase Cloud Functions. Independent package (`functions/package.json`, `functions/tsconfig.json`, `functions/tslint.json`); single `functions/src/index.ts`. Uses `@venite/bible-api` and `@venite/hymnal-api` server-side.
- `firestore.rules`, `firestore.indexes.json`, `storage.rules` — security.
- `src/environments/environment.ts` — Firebase client config (apiKey is public).
- `capacitor.config.json` — CapacitorFirebaseAuth providers (Google/Twitter/Apple).
- `android/`, `ios/` — native projects (don't hand-edit files tracked by `cap sync`).
- `media-session/` — helper for media session integration.
- `e2e/` — Protractor (deprecated but still present).

## Core services (`src/app/services/*` + page-local)

`AuthService` (auth/), `DocumentService`, `CalendarService`, `LectionaryService`, `PrayService` (pray/), `BibleService`, `PreferencesService` (preferences/), `OrganizationService` (organization/), `SpeechService`, `MediaSessionService`, `LocalStorageService`, `FavoritesService` (favorites/), `IssueService` (issues/), `DownloadService`, `UploadService`, `CanticleTableService`, `OsisBibleService`.

All `@Injectable({ providedIn: 'root' })`. State is RxJS streams over Firestore `valueChanges()` / `snapshotChanges()`.

## How to add a page

```
ng generate module pages/<name> --routing
ng generate component pages/<name>/<name> --module=pages/<name>/<name>
```

Then:
1. Add route to `src/app/app-routing.module.ts`:
   `{ path: "<name>", loadChildren: () => import("./pages/<name>/<name>.module").then(m => m.<Name>Module) }`
2. In `<name>.module.ts` import `IonicModule`, `SharedModule`, `TranslateModule` as appropriate.
3. Add `LoginGuard` to the route if user-scoped.

## How to add a service

```
ng generate service services/<name>
```

Default to `providedIn: 'root'`. For module-scoped: drop `providedIn` and add to the module's `providers`. If cross-library, add an injection token to `projects/ng-service-api` and bind in `app.module.ts`.

## Build / run

- `npm start` — `ng serve` (localhost:4200).
- `npm run build` — `ng build --prod && ionic deploy manifest` → `www/`.
- `npx cap sync` — push `www/` into native projects.
- `npm test` — Karma + Jasmine.
- `npm run e2e` — Protractor.
- `npm run lint` — tslint.

## Firebase

- Project alias `venite-2` (see `.firebaserc`).
- Rules helpers: `userOwnsOrg()`, `userInOrg()`, `hasReadAccess()`, `hasWriteAccess()`.
- `DocumentService` owns all Firestore queries for `/Document/{docId}`.
- Cloud Functions in `functions/src/index.ts` use `@venite/bible-api` and `@venite/hymnal-api`.

## Gotchas

- Angular 12 + Ionic 6 + Capacitor 7 is a fragile combo. Don't upgrade a single piece in isolation.
- `firestore.rules` is permissive on `/Document/*` — do not assume field-level access checks.
- `proxies.ts` in `@venite/angular` is generated from `components/`. If a UI control is missing, build `components/` first.
- Native plugin changes require `npx cap sync` + rebuild of the iOS/Android project.
- `projects/*` libraries must be rebuilt (`ng build <name>`) before consumer code sees changes locally.
- Karma config uses Chrome; headless mode must be configured explicitly for CI.
- E2E uses Protractor which is EOL; treat as legacy, don't extend without discussion.
