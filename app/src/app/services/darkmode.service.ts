import { Injectable } from '@angular/core';
import { PreferencesService } from '../preferences/preferences.service';
import { PlatformService } from './platform.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, from, fromEventPattern, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  public prefersDark : Observable<boolean>;

  constructor(
    private preferences : PreferencesService,
    private alert: AlertController,
    private platform : PlatformService,
    private translate : TranslateService
  ) {
    if(!this.platform.is('server')) {
      const preference$ : Observable<string> = this.preferences.get('darkmode').pipe(
        map(storedPreferences => storedPreferences?.length > 0 ? storedPreferences[0].value : 'auto')
      );

      const query = window.matchMedia('(prefers-color-scheme: dark)');
      const mediaQuery$ = fromEventPattern<MediaQueryListEvent>(
        query.addListener.bind(query),
        query.removeListener.bind(query)
      );

      this.prefersDark = combineLatest(
        preference$.pipe(startWith('auto')),
        mediaQuery$
      ).pipe(
        tap(([preference, mediaQuery]) => console.log('darkmode pref = ', preference)),
        // give an explanatory alert if we're not going to change the setting
        tap(([preference, mediaQuery]) => {
          if(preference == 'dark' && !mediaQuery.matches || preference == 'light' && mediaQuery.matches) {
            this.notifyAlert(!!mediaQuery.matches);
          }
        }),
        // preferences 'dark' or 'light' override the device setting
        map(([preference, mediaQuery]) => {
          if(preference == 'dark') {
            return true;
          } else if(preference == 'light') {
            return false;
          } else {
            return mediaQuery.matches;
          }
        })
      )
    }
  }

  async notifyAlert(deviceDark : boolean) {
    const alert = await this.alert.create({
      header: 'Dark Mode',
      message: `It looks like your device switched to ${deviceDark ? 'Dark Mode' : 'Light Mode'}. If you want the app to respond, go to Settings and set the Display Mode to “Auto.”`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
