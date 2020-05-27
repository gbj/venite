import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable, BehaviorSubject, Subscription, combineLatest, of } from 'rxjs';
import { map, mergeMap, switchMap, tap, filter, share } from 'rxjs/operators';

import { PreferencesService } from '../../preferences/preferences.service';

import { Liturgy, Preference, ClientPreferences } from '@venite/ldf';

interface TreeData {
  preferences: [string, Preference][];
  preference_tree: { [category: string]: Preference[]; };
  categories: string[];
}
interface FormData {
  form: FormGroup;
  preference_tree: { [category: string]: Preference[]; };
  categories: string[];
}

@Component({
  selector: 'venite-liturgy-preference-menu',
  templateUrl: './liturgy-preference-menu.component.html',
  styleUrls: ['./liturgy-preference-menu.component.scss'],
})
export class LiturgyPreferenceMenuComponent implements OnInit, OnChanges, OnDestroy {
  // preferences for a given liturgy
  @Input() liturgy : Liturgy;
  @Output() clientPreferencesChange : EventEmitter<ClientPreferences> = new EventEmitter();

  // stash subscriptions and clean up when we leave
  subscription : Subscription;

  // starts with input, updated on changes
  preferences : BehaviorSubject<{ [x: string]: Preference}> = new BehaviorSubject({});

  // intermediate step to building the formData
  tree : Observable<TreeData>;
  // defines display for and controls the form itself
  formData : Observable<FormData>;
  // watches the form for changes
  clientPreferences : Observable<ClientPreferences>;

  constructor(
    private preferencesService : PreferencesService,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    // `tree` provides `categories` and `preference_tree`
    this.tree = this.buildTree();

    // set up form data and client preferences
    this.formData = this.buildFormData(this.tree, this.liturgy);

    // send initial value from input Liturgy into preferences Subject
    this.preferences.next(this.liturgy?.metadata?.preferences);
  }

  // when `preferences` input changes, we need to reload the whole preferences menu,
  // because it means that a new liturgy has been selected
  ngOnChanges(changes : SimpleChanges) {
    this.preferences.next(changes.liturgy.currentValue?.metadata?.preferences);

    // since liturgy has changed, preference queries need to be refreshed
    this.formData = this.buildFormData(this.tree, changes.liturgy.currentValue);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buildTree() : Observable<TreeData> {
    return this.preferences.pipe(
      // don't use null values of preferences
      filter(preferences => !!preferences),

      // transform into key-value pairs
      map(currentValue => Object.entries(currentValue)),

      // transform preferences into categories
      map(preferences => ({
        preferences,
        categories: preferences.map(([key, pref]) => pref.category || 'Preferences')
          .reduce((uniques, item) => uniques.includes(item) ? uniques : [...uniques, item], [])
      })),
      // build preference_tree
      // { "Supplemental Devotions": [...], "Preferences": [...], etc. }
      map(({ preferences, categories }) => ({
        preferences,
        categories,
        preference_tree: categories.reduce((obj, category) => (
          {
            ... obj,
            [category]: preferences.filter(([key, pref]) => pref.category == category || (!pref.category && category == 'Preferences'))
          }
        ), {})
      })),
      // sort categories from shortest to longest
      map(({ preferences, categories, preference_tree}) => ({
        preferences,
        categories: categories.sort((a, b) => preference_tree[a].length - preference_tree[b].length),
        preference_tree
      }))
    );
  }

  buildFormData(tree : Observable<TreeData>, liturgy : Liturgy) : Observable<FormData> {
    return combineLatest(tree, this.preferencesService.getPreferencesForLiturgy(liturgy)).pipe(
      map(([{ preferences, preference_tree, categories}, storedPreferences]) => ({
        categories,
        preference_tree,
        // build form defaults
        // final form should be { [key: string]: string[]; }
        form: this.fb.group(preferences.reduce((obj, [key, pref]) => ({
          ... obj,
          [key]: storedPreferences.find(pref => pref.key == key && pref.liturgy == liturgy.slug && pref.language == liturgy.language && pref.version == liturgy.version)?.value
            || storedPreferences.find(pref => pref.key == key && pref.language == liturgy.language && pref.version == liturgy.version)?.value
            || new Preference(pref).getDefaultPref()
        }), {}))
      })),
      // emit the initial value
      tap(({ categories, preference_tree, form}) => this.clientPreferencesChange.emit(form.value))
    )
  }

  // fired by a form control
  update(form : FormGroup, key : string, value : string) {
    form.controls[key].setValue(value);
    this.clientPreferencesChange.emit(form.value);
  }
}
