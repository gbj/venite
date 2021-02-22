import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { MenuComponent } from './menu/menu.component';
import { LiturgySelectComponent } from './liturgy-select/liturgy-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrayMenuModule } from '@venite/ng-pray-menu';

@NgModule({
  declarations: [
    MenuComponent,
    LiturgySelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    PrayMenuModule
  ],
  exports: [
    LiturgySelectComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  public static forRoot(args : PrayMenuRootConfig) : ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ... args.providers,
        { provide: 'config', useValue: args.config }
      ]
    };
  }
}


interface PrayMenuRootConfig {
  providers: Provider[];
  config: PrayMenuConfig;
}

export interface PrayMenuConfig {
  defaultLanguage: string;
  defaultVersion: string;
  defaultKalendar: string;
  versionOptions: { value: string; label: string; }[];
  prayersAndThanksgivings?: {
    preset: boolean;
    component: any;
  },
  hasBulletinMode: boolean;
  serverReturnsDate: boolean;
}