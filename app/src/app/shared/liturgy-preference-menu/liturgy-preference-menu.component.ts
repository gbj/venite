import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Liturgy, Preference, ClientPreferences } from '@venite/ldf';

@Component({
  selector: 'venite-liturgy-preference-menu',
  templateUrl: './liturgy-preference-menu.component.html',
  styleUrls: ['./liturgy-preference-menu.component.scss'],
})
export class LiturgyPreferenceMenuComponent implements OnInit {
  @Input() preferences : { [x: string]: Preference};
  @Output() clientPreferencesChange : EventEmitter<ClientPreferences> = new EventEmitter();

  categories : string[];
  preference_tree : { [category: string]: Preference[]; };

  constructor() { }

  ngOnInit() {
    if(this.preferences) {
      const preferences : Preference[] = Object.values(this.preferences);
      // unique array of preference categories, sorted alpha
      this.categories = preferences.map(x => x.category || 'Preferences')
        .reduce((uniques, item) => uniques.includes(item) ? uniques : [...uniques, item], []);

      // build preference tree
      this.preference_tree = this.categories.reduce((obj, category) => (
        {
          ... obj,
          [category]: preferences.filter(pref => pref.category == category || (!pref.category && category == 'Preferences'))
        }
      ), {});
    }
  }
}
