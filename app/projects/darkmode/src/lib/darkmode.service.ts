import { Injectable, Inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, from, fromEventPattern, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { PlatformServiceInterface, PreferencesServiceInterface, PREFERENCES_SERVICE, PLATFORM_SERVICE } from '@venite/ng-service-api';

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

  async notifyAlert(deviceDark : boolean) {
    const alert = await this.alert.create({
      header: this.translate.instant('darkmode.darkmode'),
      message: this.translate.instant('darkmode.needsAuto', { deviceMode : deviceDark ? this.translate.instant('darkmode.dark-mode') : this.translate.instant('darkmode.light-mode') }),
      buttons: ['OK']
    });

    await alert.present();
  }
}
