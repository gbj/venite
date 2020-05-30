import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayPageRoutingModule } from './pray-routing.module';

import { PrayPage } from './pray.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayPageRoutingModule
  ],
  declarations: [PrayPage]
})
export class PrayPageModule {}
