import { NgModule, ModuleWithProviders, Provider, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LiturgySelectComponent } from './liturgy-select/liturgy-select.component';
import { PrayMenuConfig } from './pray-menu-config';
import { LiturgyPreferenceMenuComponent } from './liturgy-preference-menu/liturgy-preference-menu.component';

interface PrayMenuRootConfig {
  providers: Provider[];
  config: PrayMenuConfig;
}

@NgModule({
  declarations: [
    LiturgySelectComponent,
    LiturgyPreferenceMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    LiturgySelectComponent,
    LiturgyPreferenceMenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrayMenuModule {
  public static forRoot(args : PrayMenuRootConfig) : ModuleWithProviders<PrayMenuModule> {
    return {
      ngModule: PrayMenuModule,
      providers: [
        ... args.providers,
        { provide: 'config', useValue: args.config }
      ]
    };
  }
}
