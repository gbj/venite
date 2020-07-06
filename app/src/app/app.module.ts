import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Community Modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

// Venite Modules
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { RemindersPageModule } from 'reminders';
import { BibleService } from './services/bible.service';
import { PlatformService } from './services/platform.service';
import { BIBLE_SERVICE, PLATFORM_SERVICE, LOCAL_STORAGE, PREFERENCES_SERVICE } from 'service-api';
import { LocalStorageService } from 'localstorage';
import { PreferencesService } from './preferences/preferences.service';
import { DarkmodeModule } from 'darkmode';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        },
        defaultLanguage: 'en'
    }),
    AuthModule,
    SharedModule,
    RemindersPageModule.forRoot({
      providers: [
        BibleService,
        PlatformService,
        LocalStorageService
      ]
    }),
    DarkmodeModule.forRoot({
      providers: [
        PreferencesService
      ]
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenTrackingService,
    UserTrackingService,
    { provide: BIBLE_SERVICE, useClass: BibleService },
    { provide: PLATFORM_SERVICE, useClass: PlatformService },
    { provide: LOCAL_STORAGE, useClass: LocalStorageService },
    { provide: PREFERENCES_SERVICE, useClass: PreferencesService },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
