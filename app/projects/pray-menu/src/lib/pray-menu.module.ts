import { NgModule, ModuleWithProviders, Provider, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PrayMenuConfig } from './pray-menu-config';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrayMenuComponent } from './pray-menu.component';
import { DateComponent } from './date/date.component';
import { LiturgicalDayNameComponent } from './liturgical-day-name/liturgical-day-name.component';
import { LiturgyMenuComponent } from './liturgy-menu/liturgy-menu.component';
import { LiturgyPreferenceMenuComponent } from './liturgy-preference-menu/liturgy-preference-menu.component';
import { ProperLiturgyMenuComponent } from './proper-liturgy-menu/proper-liturgy-menu.component';

interface PrayMenuRootConfig {
  providers: Provider[];
  config: PrayMenuConfig;
}

@NgModule({
  declarations: [
    PrayMenuComponent,
    DateComponent,
    LiturgicalDayNameComponent,
    LiturgyMenuComponent,
    LiturgyPreferenceMenuComponent,
    ProperLiturgyMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    PrayMenuComponent,
    LiturgyPreferenceMenuComponent,
    DateComponent,
    LiturgicalDayNameComponent,
    ProperLiturgyMenuComponent
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
