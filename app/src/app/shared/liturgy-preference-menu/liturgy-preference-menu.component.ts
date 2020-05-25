import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { PreferencesService } from '../../preferences/preferences.service';

import { Liturgy, Preference, ClientPreferences } from '@venite/ldf';

@Component({
  selector: 'venite-liturgy-preference-menu',
  templateUrl: './liturgy-preference-menu.component.html',
  styleUrls: ['./liturgy-preference-menu.component.scss'],
})
export class LiturgyPreferenceMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() preferences : { [x: string]: Preference};
  @Output() clientPreferencesChange : EventEmitter<ClientPreferences> = new EventEmitter();

  workingPrefs : { [x: string]: Preference };

  categories : string[];
  preference_tree : { [category: string]: Preference[]; };
  form : FormGroup;
  form$ : Subscription;

  constructor(
    private preferencesService : PreferencesService,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    // TODO: need to load saved preferences
  }

  ngOnChanges(changes : SimpleChanges) {
    const { currentValue } = { ... changes.preferences};

    if(currentValue) {
      const preferences : [string, Preference][] = Object.entries(currentValue);
      // unique array of preference categories, sorted alpha
      this.categories = preferences.map(([key, pref]) => pref.category || 'Preferences')
        .reduce((uniques, item) => uniques.includes(item) ? uniques : [...uniques, item], []);

      // build preference tree for formatting
      this.preference_tree = this.categories.reduce((obj, category) => (
        {
          ... obj,
          [category]: preferences.filter(([key, pref]) => pref.category == category || (!pref.category && category == 'Preferences'))
        }
      ), {});

      // build FormGroup for model
      const formDefaults : { [key: string]: string[]; } = {};
      preferences.forEach(([key, pref]) => formDefaults[key] = new Array(new Preference(pref).getDefaultPref()));
      this.form = this.fb.group(formDefaults);
      this.form$ = this.form.valueChanges.subscribe(data => this.clientPreferencesChange.next(data))

      // emit default values as starting state
      const initialState : ClientPreferences = {}
      preferences.forEach(([key, pref]) =>
        initialState[key] = new Preference(pref).getDefaultPref()
      );
      this.clientPreferencesChange.next(initialState);
    }
  }

  ngOnDestroy() {
    this.form$.unsubscribe();
  }

  change(key : string, value : string) {
    this.form.controls[key].setValue(value);
  }
}
