import { Injectable, Inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { Observable, of, from, merge, Subject, combineLatest } from "rxjs";
import {
  switchMap,
  map,
  tap,
  filter,
  shareReplay,
  startWith,
  first,
  catchError,
} from "rxjs/operators";

import {
  AuthServiceInterface,
  AUTH_SERVICE,
  StoredPreference,
} from "@venite/ng-service-api";

import {
  DisplaySettings,
  LiturgicalDocument,
  versionToString,
} from "@venite/ldf";
import { isOnline } from "../editor/ldf-editor/is-online";
import { LiturgyTimeRanges } from "@venite/ng-service-api";
import { LocalStorageService } from "../services/local-storage.service";

type OldPreferences = {
  defaultLanguage?: string;
  defaultVersion?: string;
  displaySettings?: DisplaySettings;
  preferences?: {
    [language: string]: {
      [version: string]: {
        [slug: string]: Record<string, string>;
      };
    };
  };
};

type PreferencesDoc = {
  uid: string;
  prefs: Record<string, StoredPreference>;
};

@Injectable({
  providedIn: "root",
})
export class PreferencesService {
  private _oldVenitePreferences: Promise<OldPreferences>;

  private _updated: {
    [key: string]: Subject<StoredPreference>;
  } = {};

  private _displaySettings: Observable<DisplaySettings> | undefined;

  private _preferences: Observable<PreferencesDoc>;

  constructor(
    private readonly afs: AngularFirestore,
    @Inject(AUTH_SERVICE) private readonly auth: AuthServiceInterface,
    private readonly storage: LocalStorageService
  ) {
    this._oldVenitePreferences = this.loadOldPreferences();
  }

  private async loadOldPreferences() {
    console.log("loadOldPreferences");
    const oldPrefs = this.storage.get("preferences");
    if (oldPrefs) {
      return oldPrefs.then((prefs) => JSON.parse(prefs || "{}"));
    } else {
      return undefined;
    }
  }

  private async getOldPref(
    key: string,
    liturgy: LiturgicalDocument = undefined
  ): Promise<StoredPreference> {
    console.log("getOldPref");
    const old = (await this._oldVenitePreferences) || {};
    if (key === "language") {
      return { key: "language", value: old?.defaultLanguage };
    } else if (key === "version") {
      return { key: "version", value: old?.defaultVersion };
    } else {
      if (liturgy) {
        const value = ((((old || {})[liturgy.language] || {})[
          versionToString(liturgy.version)
        ] || {})[liturgy.slug?.replace("-", "_")] || {})[key];
        return { key, value };
      } else {
        return { key, value: (old?.displaySettings || {})[key] };
      }
    }
  }

  private async getOldPrefsForLiturgy(
    liturgy: LiturgicalDocument
  ): Promise<StoredPreference[]> {
    console.log("getOldPrefsForLiturgy");
    const old = await this._oldVenitePreferences,
      language = liturgy.language,
      version = versionToString(liturgy.version),
      slug = liturgy.slug?.replace("-", "_");
    const p = (((old?.preferences || {})[language] || {})[
      versionToString(version)
    ] || {})[slug];
    if (p) {
      return Object.entries(p).map(([key, value]) => ({
        key,
        value,
        language,
        version,
        liturgy: slug,
      }));
    } else {
      return [];
    }
  }

  // Generates a key to be used in local storage
  private localStorageKey(
    key: string,
    liturgy: LiturgicalDocument = undefined
  ): string {
    return liturgy
      ? `preference-${liturgy.slug}-${liturgy.language}-${liturgy.version}-${key}`
      : `preference-${key}`;
  }

  // Sets a single preference
  set(
    key: string,
    value: string,
    uid: string = undefined,
    liturgy: LiturgicalDocument = undefined
  ) {
    const prefDoc: StoredPreference = { key, value };
    if (liturgy) {
      prefDoc.liturgy = liturgy.slug;
      prefDoc.language = liturgy.language || "en";
      prefDoc.version = versionToString(liturgy.version) || "Rite-II";
    }

    this.storage.set(this.localStorageKey(key, liturgy), prefDoc);

    if (uid) {
      prefDoc.uid = uid;

      const ref = liturgy
        ? `${liturgy.slug}-${liturgy.language}-${liturgy.version}-${key}`
        : key;
      /*const doc = this.afs.doc<StoredPreference>(`Preference/${ref}`);
      doc.set(prefDoc);*/
      this.afs
        .doc<PreferencesDoc>(`Preferences/${uid}`)
        .update({ [`prefs.${ref}`]: prefDoc });
    }

    if (!this._updated[key]) {
      this._updated[key] = new Subject();
    }
    this._updated[key].next(prefDoc);
  }

  preferences(): Observable<PreferencesDoc | null> {
    return this.auth.user.pipe(
      map((user) => user?.uid),
      switchMap((uid) => {
        // if logged in, use Firestore
        if (uid) {
          if (!this._preferences) {
            this._preferences = this.afs
              .collection<PreferencesDoc>("Preferences", (ref) =>
                ref.where("uid", "==", uid)
              )
              .valueChanges()
              .pipe(
                tap((p) =>
                  console.log(
                    "(PreferencesService) Preferences document is ",
                    p
                  )
                ),
                switchMap(async (p) => {
                  if (p.length === 0) {
                    console.log(
                      "(PreferencesService) No Preferences document found. Creating it."
                    );

                    const prefs = (
                      await this.afs
                        .collection<StoredPreference>("Preference", (ref) =>
                          ref.where("uid", "==", uid)
                        )
                        .valueChanges()
                        .pipe(first())
                        .toPromise()
                    ).reduce((acc, curr) => {
                      const ref = curr.liturgy
                        ? `${curr.liturgy}-${curr.language || "en"}-${
                            curr.version || "Rite-II"
                          }-${curr.key}`
                        : curr.key;
                      return { ...acc, [ref]: curr };
                    }, {});

                    await this.afs
                      .doc<PreferencesDoc>(`Preferences/${uid}`)
                      .set({ uid, prefs });
                    console.log(
                      "(PreferencesService) Preferences document added as ",
                      prefs
                    );

                    return [{ uid, prefs }];
                  } else {
                    return p;
                  }
                }),
                map((p) => p[0]),
                shareReplay()
              );
            return this._preferences;
          }
        } else {
          return of(null);
        }
      })
    );
  }

  // Gets a single preference by key
  getStored(key: string): Observable<StoredPreference> {
    return this.auth.user.pipe(
      map((user) => [user?.uid, key]),
      tap(([uid, key]) =>
        console.log("(PreferencesService) getStored query", uid, key)
      ),
      switchMap(([uid, key]) => {
        // if logged in, use Firestore
        if (uid) {
          return this.preferences().pipe(map((prefs) => prefs?.prefs[key]));
        } else {
          return from(this.storage.get(this.localStorageKey(key)));
        }
      }),
      tap((value) =>
        console.log("(PreferencesService) getStored found", value)
      ),
      shareReplay(),
      catchError((e) => {
        console.log("getStored error", e);
        return of({});
      })
    );
  }

  getUpdated(key: string): Observable<StoredPreference> {
    if (!this._updated[key]) {
      this._updated[key] = new Subject();
    }
    return this._updated[key];
  }

  get(key: string): Observable<StoredPreference> {
    const oldPref$ = this.getOldPref(key);

    const newPref$ = merge(
      from(this.storage.get(this.localStorageKey(key))), // value initially stored in local storage
      this.getUpdated(key), // local value updated recently by user
      // observable of Firebase stored preference, only if online
      isOnline().pipe(
        filter((online) => online),
        switchMap(() => this.getStored(key))
      )
    ).pipe(shareReplay());

    return combineLatest([oldPref$, newPref$]).pipe(
      map(([oldPref, newPref]) => (newPref ? newPref : oldPref)),
      filter((value) => value !== undefined),
      shareReplay()
    );
  }

  getPreferencesForLiturgy(
    liturgy: LiturgicalDocument
  ): Observable<StoredPreference[]> {
    if (!liturgy) {
      return of([]);
    } else {
      const oldPrefs$ = from(this.getOldPrefsForLiturgy(liturgy)),
        newPrefs$ = this.auth.user.pipe(
          map((user) => [user?.uid, liturgy]),
          switchMap(([uid, liturgy]) => {
            const { language, version, slug } = liturgy as LiturgicalDocument;
            const remotePrefs$ = uid
              ? this.preferences().pipe(
                  tap((p) => console.log("preferences$", p)),
                  map((p) =>
                    Object.values(p.prefs).filter(
                      (pref) =>
                        pref.language === language ||
                        ("en" && pref.version === version) ||
                        ("Rite-II" && pref.liturgy === liturgy)
                    )
                  ),
                  tap((p) =>
                    console.log("getting preferences for", liturgy, "from", p)
                  )
                )
              : of(undefined);
            // Firestore preferences
            /*const remotePrefs$ = uid
              ? this.afs
                  .collection<StoredPreference>("Preference", (ref) =>
                    ref
                      .where("uid", "==", uid)
                      .where(
                        "language",
                        "==",
                        (liturgy as LiturgicalDocument).language || "en"
                      )
                      .where(
                        "version",
                        "==",
                        (liturgy as LiturgicalDocument).version || "Rite-II"
                      )
                      .where(
                        "liturgy",
                        "==",
                        typeof liturgy === "string" ? liturgy : liturgy.slug
                      )
                  )
                  .valueChanges()
              : of(undefined);*/

            // Local Storage preferences
            // don't have the ability for a query as with Firestore
            // instead, return all keys that match the local storage key pattern
            const exampleKey = this.localStorageKey(
                "%%%",
                liturgy as LiturgicalDocument
              ),
              baseKey = exampleKey.replace("%%%", ""),
              // storage returns a Promise, but we're not in an async function
              // because we need to return an observable; so transform it into an observable
              allKeys = from(this.storage.keys());
            const localPrefs$ = allKeys.pipe(
              // select only keys for this liturgy
              map((keys) => keys.filter((key) => key.includes(baseKey))),
              // map in the value for each key
              switchMap((keys) =>
                from(Promise.all(keys.map((key) => this.storage.get(key))))
              )
            );

            // merge the two
            return merge(
              localPrefs$,
              remotePrefs$.pipe(tap((p) => console.log("remotePrefs$", p)))
            ).pipe(
              filter((set) => Boolean(set)),
              shareReplay()
            );
          })
        );
      return combineLatest([oldPrefs$, newPrefs$]).pipe(
        tap(([oldPrefs, newPrefs]) => console.log("newPrefs = ", newPrefs)),
        map(([oldPrefs, newPrefs]) =>
          newPrefs?.length > 0 ? newPrefs : oldPrefs
        )
      );
    }
  }

  displaySettings(): Observable<DisplaySettings> {
    if (this._displaySettings) {
      return this._displaySettings;
    } else {
      this._displaySettings = combineLatest([
        this.grabPreference("dropcaps"),
        this.grabPreference("response"),
        this.grabPreference("repeatAntiphon"),
        this.grabPreference("fontscale"),
        this.grabPreference("font"),
        this.grabPreference("voiceChoice"),
        this.grabPreference("voiceRate"),
        this.grabPreference("voiceBackground"),
        this.grabPreference("voiceBackgroundVolume"),
        this.grabPreference("psalmVerses"),
        this.grabPreference("bibleVerses"),
        this.grabPreference("meditationBell"),
        this.grabPreference("darkmode"),
        this.grabPreference("bolded"),
        this.grabPreference("psalmPause"),
      ]).pipe(
        map((settings) => new DisplaySettings(...settings)),
        shareReplay()
      );
      return this._displaySettings;
    }
  }

  grabPreference(key: string): Observable<any> {
    return this.get(key).pipe(map((keyvalue) => keyvalue?.value));
  }

  liturgyTimeRanges(): Observable<LiturgyTimeRanges> {
    return this.get("liturgy-times").pipe(
      first(),
      map((data) =>
        data?.value
          ? JSON.parse(data?.value)
          : {
              morning: {
                start: { hour: 3, minute: 0 },
                end: { hour: 11, minute: 0 },
              },
              noon: {
                start: { hour: 11, minute: 0 },
                end: { hour: 14, minute: 0 },
              },
              evening: {
                start: { hour: 14, minute: 0 },
                end: { hour: 20, minute: 0 },
              },
              compline: {
                start: { hour: 20, minute: 0 },
                end: { hour: 3, minute: 0 },
              },
            }
      ),
      tap((ranges) => console.log("liturgyTimeRanges = ", ranges))
    );
  }
}
