import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Liturgy, Preference, ClientPreferences } from '@venite/ldf';

@Component({
  selector: 'venite-liturgy-preference-menu',
  templateUrl: './liturgy-preference-menu.component.html',
  styleUrls: ['./liturgy-preference-menu.component.scss'],
})
export class LiturgyPreferenceMenuComponent implements OnInit, OnChanges {
  @Input() preferences : { [x: string]: Preference};
  @Output() clientPreferencesChange : EventEmitter<ClientPreferences> = new EventEmitter();

  categories : string[];
  preference_tree : { [category: string]: Preference[]; };

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes : SimpleChanges) {
    const { currentValue } = changes.preferences;
    
    if(currentValue) {
      const preferences : [string, Preference][] = Object.entries(currentValue);
      // unique array of preference categories, sorted alpha
      this.categories = preferences.map(([key, pref]) => pref.category || 'Preferences')
        .reduce((uniques, item) => uniques.includes(item) ? uniques : [...uniques, item], []);

      // build preference tree
      this.preference_tree = this.categories.reduce((obj, category) => (
        {
          ... obj,
          [category]: preferences.filter(([key, pref]) => pref.category == category || (!pref.category && category == 'Preferences'))
        }
      ), {});
    }
  }
}
