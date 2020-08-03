import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayPageRoutingModule } from './pray-routing.module';

import { PrayPage } from './pray.page';

import { TranslateModule } from '@ngx-translate/core';

import { DisplaySettingsComponent } from './display-settings/display-settings.component';
import { DisplaySettingsConfig } from './display-settings/display-settings-config';

interface PrayRootConfig {
  providers: Provider[];
  displaySettings: DisplaySettingsConfig;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    PrayPage,
    DisplaySettingsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrayPageModule {
  public static forRoot(args : PrayRootConfig) : ModuleWithProviders<PrayPageModule> {
    return {
      ngModule: PrayPageModule,
      providers: [
        ... args.providers,
        { provide: 'displaySettingsConfig', useValue: args.displaySettings }
      ]
    };
  }
}
