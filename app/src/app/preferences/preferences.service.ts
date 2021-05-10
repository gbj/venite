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
} from "rxjs/operators";

import {
  AuthServiceInterface,
  AUTH_SERVICE,
  StoredPreference,
} from "@venite/ng-service-api";
import { LocalStorageService } from "@venite/ng-localstorage";

import {
  DisplaySettings,
  LiturgicalDocument,
  versionToString,
} from "@venite/ldf";
import { isOnline } from "../editor/ldf-editor/is-online";

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

@Injectable({
  providedIn: "root",
})
export class PreferencesService {
  private _oldVenitePreferences: Promise<OldPreferences>;

  private _updated: {
    [key: string]: Subject<StoredPreference>;
  } = {};

  private _displaySettings: Observable<DisplaySettings> | undefined;

  constructor(
    private readonly afs: AngularFirestore,
    @Inject(AUTH_SERVICE) private readonly auth: AuthServiceInterface,
    private readonly storage: LocalStorageService
  ) {
    this._oldVenitePreferences = this.loadOldPreferences();
  }

  private async loadOldPreferences() {
    const oldPrefs = await this.storage.get("preferences");
    if (oldPrefs) {
      try {
        this._oldVenitePreferences = JSON.parse(oldPrefs);
      } catch (e) {
        console.warn(e);
      }
    }
    return oldPrefs;
  }

  private async getOldPref(
    key: string,
    liturgy: LiturgicalDocument = undefined
  ): Promise<StoredPreference> {
    const old = await this._oldVenitePreferences;
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
    const old = await this._oldVenitePreferences,
      language = liturgy.language,
      version = versionToString(liturgy.version),
      slug = liturgy.slug.replace("-", "_");
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
        ? `${liturgy.slug}-${liturgy.language}-${liturgy.version}-${key}-${uid}`
        : `${key}-${uid}`;
      const doc = this.afs.doc<StoredPreference>(`Preference/${ref}`);
      doc.set(prefDoc);
    }

    if (!this._updated[key]) {
      this._updated[key] = new Subject();
    }
    this._updated[key].next(prefDoc);
  }

  // Gets a single preference by key
  getStored(key: string): Observable<StoredPreference> {
    return this.auth.user.pipe(
      map((user) => [user?.uid, key]),
      switchMap(([uid, key]) => {
        // if logged in, use Firestore
        if (uid) {
          return this.afs
            .collection<StoredPreference>("Preference", (ref) =>
              ref.where("uid", "==", uid).where("key", "==", key)
            )
            .valueChanges()
            .pipe(
              // take only the first thing returned if multiple for query
              map((values) => values[0])
            );
        } else {
          return from(this.storage.get(this.localStorageKey(key))).pipe(
            tap((data) => console.log("getStored", data))
          );
        }
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

  /** Returns all preferences of **any** liturgy saved by the user, but with this one's language and version
   * This allows for smart matching—if I don't have a default Bible translation set for English Rite II Evening Prayer,
   * see if I have one for English Rite II Morning Prayer  */
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
            // if logged in, use Firestore
            if (uid) {
              return this.afs
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
                )
                .valueChanges();
            }
            // if not, use local storage
            else {
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
              return allKeys.pipe(
                // select only keys for this liturgy
                map((keys) => keys.filter((key) => key.includes(baseKey))),
                // map in the value for each key
                switchMap((keys) =>
                  from(Promise.all(keys.map((key) => this.storage.get(key))))
                )
              );
            }
          })
        );
      return combineLatest([oldPrefs$, newPrefs$]).pipe(
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
}
