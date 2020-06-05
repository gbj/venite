import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayPageRoutingModule } from './pray-routing.module';

import { PrayPage } from './pray.page';

import { TranslateModule } from '@ngx-translate/core';

import { AuthModule } from '../auth/auth.module';

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
    PrayPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrayPageModule {}
