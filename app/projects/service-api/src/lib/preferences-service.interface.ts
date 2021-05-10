import { StoredPreference } from "./stored-preference";
import { Observable } from "rxjs";
import { LiturgicalDocument, DisplaySettings } from "@venite/ldf";

export interface PreferencesServiceInterface {
  get: (key: string) => Observable<StoredPreference>;

  set: (
    key: string,
    value: string,
    uid: string,
    liturgy?: LiturgicalDocument
  ) => void;

  getPreferencesForLiturgy: (
    liturgy: LiturgicalDocument
  ) => Observable<StoredPreference[]>;

  displaySettings: () => Observable<DisplaySettings>;
}
