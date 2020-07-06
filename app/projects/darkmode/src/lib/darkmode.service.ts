import { Injectable, Inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, from, fromEventPattern, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { PlatformServiceInterface, PreferencesServiceInterface, PREFERENCES_SERVICE, PLATFORM_SERVICE } from 'service-api';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  public prefersDark : Observable<boolean>;

  constructor(
    @Inject(PREFERENCES_SERVICE) private preferences : PreferencesServiceInterface,
    private alert: AlertController,
    @Inject(PLATFORM_SERVICE) private platform : PlatformServiceInterface,
    private translate : TranslateService
  ) {
    if(!this.platform.is('server')) {
      const preference$ : Observable<string> = this.preferences.get('darkmode').pipe(
        map(storedPreference => storedPreference ? storedPreference.value : 'auto')
      );

      const query = window.matchMedia('(prefers-color-scheme: dark)');
      const mediaQuery$ = fromEventPattern<MediaQueryListEvent>(
        query.addListener.bind(query),
        query.removeListener.bind(query)
      );

      this.prefersDark = combineLatest(
        preference$.pipe(startWith('auto')),
        mediaQuery$.pipe(startWith(undefined))
      ).pipe(
        tap(([preference, mediaQuery]) => console.log('darkmode pref = ', preference)),
        // give an explanatory alert if we're not going to change the setting
        tap(([preference, mediaQuery]) => {
          if(preference == 'dark' && !mediaQuery?.matches || preference == 'light' && mediaQuery?.matches) {
            this.notifyAlert(!!mediaQuery?.matches);
          }
        }),
        // preferences 'dark' or 'light' override the device setting
        map(([preference, mediaQuery]) => {
          if(preference == 'dark') {
            return true;
          } else if(preference == 'light') {
            return false;
          } else {
            return !!mediaQuery?.matches; // undefined => false, not true
          }
        })
      )
    }
  }

  // TODO translate
  async notifyAlert(deviceDark : boolean) {
    const alert = await this.alert.create({
      header: 'Dark Mode',
      message: `It looks like your device is in ${deviceDark ? 'Dark Mode' : 'Light Mode'}. If you want the app to respond, go to Settings and set the Display Mode to “Auto.”`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
