import { Component, OnInit } from '@angular/core';
import { DisplaySettings } from 'projects/pray/node_modules/@venite/ldf/dist';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PreferencesService } from '../preferences/preferences.service';

@Component({
  selector: 'venite-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settings$ : Observable<DisplaySettings>;

  constructor(
    private preferencesService : PreferencesService
  ) { }

  ngOnInit() {
      // Grab display settings from preferences
      this.settings$ = combineLatest([
        this.grabPreference('dropcaps'),
        this.grabPreference('response'),
        this.grabPreference('repeatAntiphon'),
        this.grabPreference('fontscale'),
        this.grabPreference('font'),
        this.grabPreference('voiceChoice'),
        this.grabPreference('voiceRate'),
        this.grabPreference('voiceBackground'),
        this.grabPreference('voiceBackgroundVolume'),
        this.grabPreference('psalmVerses'),
        this.grabPreference('bibleVerses'),
        this.grabPreference('meditationBell'),
        this.grabPreference('darkmode'),
        this.grabPreference('bolded'),
        this.grabPreference('psalmPause')
      ]).pipe(
        map(settings => new DisplaySettings( ... settings))
      );
  }

  grabPreference(key : string) : Observable<any> {
    return this.preferencesService.get(key).pipe(startWith(undefined)).pipe(
      map(keyvalue => keyvalue?.value)
    );
  }

}
