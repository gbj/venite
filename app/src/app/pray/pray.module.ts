import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayPageRoutingModule } from './pray-routing.module';

import { PrayPage } from './pray.page';

import { TranslateModule } from '@ngx-translate/core';

import { AuthModule } from '../auth/auth.module';
import { DisplaySettingsComponent } from './display-settings/display-settings.component';

@NgModule({
  imports: [
    AuthModule,
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
export class PrayPageModule {}
