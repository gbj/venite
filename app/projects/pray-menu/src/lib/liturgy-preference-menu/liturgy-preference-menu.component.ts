import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  Inject,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Observable, BehaviorSubject, combineLatest, Subscription } from "rxjs";
import { map, tap, filter, startWith } from "rxjs/operators";

import {
  Liturgy,
  Preference,
  ClientPreferences,
  preferencesToCategories,
  categoriesToPreferenceTree,
} from "@venite/ldf";
import {
  PreferencesServiceInterface,
  PREFERENCES_SERVICE,
} from "@venite/ng-service-api";
import { AUTH_SERVICE } from "@venite/ng-service-api";
import { AuthServiceInterface } from "@venite/ng-service-api";

interface TreeData {
  preferences: [string, Preference][];
  preference_tree: { [category: string]: Preference[] };
  categories: string[];
}
interface FormData {
  form: FormGroup;
  preference_tree: { [category: string]: Preference[] };
  categories: string[];
}

@Component({
  selector: "venite-liturgy-preference-menu",
  templateUrl: "./liturgy-preference-menu.component.html",
  styleUrls: ["./liturgy-preference-menu.component.scss"],
})
export class LiturgyPreferenceMenuComponent implements OnInit, OnChanges {
  // preferences for a given liturgy
  @Input() liturgy: Liturgy;
  @Output()
  clientPreferencesChange: EventEmitter<ClientPreferences> = new EventEmitter();
  @Output() preferencesLoaded: EventEmitter<boolean> = new EventEmitter();

  uid$: Observable<string>;

  // starts with input, updated on changes
  preferences: BehaviorSubject<{
    [x: string]: Preference;
  }> = new BehaviorSubject({});

  // intermediate step to building the formData
  tree: Observable<TreeData>;
  // defines display for and controls the form itself
  formData: Observable<FormData>;
  // watches the form for changes
  clientPreferences: Observable<ClientPreferences>;

  advancedSettingsShown: boolean = false;

  subscription: Subscription;

  constructor(
    @Inject(PREFERENCES_SERVICE)
    private preferencesService: PreferencesServiceInterface,
    private fb: FormBuilder,
    @Inject(AUTH_SERVICE) private auth: AuthServiceInterface
  ) {}

  ngOnInit() {
    this.preferencesLoaded.emit(false);

    // `tree` provides `categories` and `preference_tree`
    this.tree = this.buildTree();

    // set up form data and client preferences
    this.formData = this.buildFormData(this.tree, this.liturgy);

    // send initial value from input Liturgy into preferences Subject
    this.preferences.next(this.liturgy?.metadata?.preferences);

    this.subscription = this.formData.subscribe((data) => {
      console.log("formData = ", data);
      this.preferencesLoaded.emit(Boolean(data));
    });
  }

  // when `preferences` input changes, we need to reload the whole preferences menu,
  // because it means that a new liturgy has been selected
  ngOnChanges(changes: SimpleChanges) {
    this.preferencesLoaded.emit(false);

    this.preferences.next(changes.liturgy.currentValue?.metadata?.preferences);

    // since liturgy has changed, preferences may need to be refreshed
    const oldPreferences = changes.liturgy.previousValue?.metadata?.preferences,
      newPreferences = changes.liturgy.currentValue?.metadata?.preferences;

    if (!oldPreferences || !deepEqual(oldPreferences, newPreferences)) {
      this.formData = this.buildFormData(
        this.tree,
        changes.liturgy.currentValue
      );

      // emit "preferencesLoaded" event
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.formData.subscribe((data) => {
        console.log("formData = ", data);
        this.preferencesLoaded.emit(Boolean(data));
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleAdvancedSettingsShown() {
    this.advancedSettingsShown = !this.advancedSettingsShown;
  }

  buildTree(): Observable<TreeData> {
    return this.preferences.pipe(
      startWith({}),
      // don't use null values of preferences
      filter((preferences) => !!preferences),

      // transform preferences into categories
      map((preferences) => ({
        preferences,
        categories: preferencesToCategories(preferences),
      })),
      // build preference_tree
      // { "Supplemental Devotions": [...], "Preferences": [...], etc. }
      map(({ preferences, categories }) => ({
        preferences,
        categories,
        preference_tree: categoriesToPreferenceTree(categories, preferences),
      })),
      // sort categories from shortest to longest
      map(({ preferences, categories, preference_tree }) => ({
        preferences: Object.entries(preferences),
        categories: categories.sort(
          (a, b) => preference_tree[a].length - preference_tree[b].length
        ),
        preference_tree,
      }))
    );
  }

  buildFormData(
    tree: Observable<TreeData>,
    liturgy: Liturgy
  ): Observable<FormData> {
    return combineLatest(
      tree,
      this.preferencesService.getPreferencesForLiturgy(liturgy)
    ).pipe(
      map(
        ([
          { preferences, preference_tree, categories },
          storedPreferences,
        ]) => ({
          categories,
          preference_tree,
          // build form defaults
          // final form should be { [key: string]: string[]; }
          form: this.fb.group(
            preferences.reduce(
              (obj, [key, pref]) => ({
                ...obj,
                [key]:
                  storedPreferences.find(
                    (pref) =>
                      pref.key == key &&
                      pref.liturgy == liturgy.slug &&
                      pref.language == liturgy.language &&
                      pref.version == liturgy.version
                  )?.value ||
                  storedPreferences.find(
                    (pref) =>
                      pref.key == key &&
                      pref.language == liturgy.language &&
                      pref.version == liturgy.version
                  )?.value ||
                  new Preference(pref).getDefaultPref(),
              }),
              {}
            )
          ),
        })
      ),
      // emit the initial value
      tap(({ form }) => this.clientPreferencesChange.emit(form.value))
    );
  }

  // fired by a form control
  update(form: FormGroup, key: string, value: string) {
    form.controls[key].setValue(value);
    this.clientPreferencesChange.emit(form.value);
    const user = this.auth.currentUser();
    this.preferencesService.set(key, value, user?.uid, this.liturgy);
  }
}

const deepEqual = (v1, v2) => {
  if (v1 == v2) return true;

  if (
    v1 == null ||
    v2 == null ||
    typeof v1 != "object" ||
    typeof v2 != "object"
  )
    return false;

  let v1keys = Object.keys(v1);
  let v2keys = Object.keys(v2);

  if (v1keys.length != v2keys.length) return false;

  for (let key of v1keys) {
    if (!v2keys.includes(key) || !deepEqual(v1[key], v2[key])) return false;
  }
  return true;
};
