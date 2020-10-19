import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PrayPageRoutingModule } from './pray-routing.module';

import { PrayPage } from './pray.page';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AuthModule,
    PrayPageRoutingModule
  ],
  declarations: [PrayPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrayPageModule {}
