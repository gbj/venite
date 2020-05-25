import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalStorageService } from './localstorage.service';
import { PreferencesService } from './preferences.service';

@NgModule({
  declarations: [
    LocalStorageService,
    PreferencesService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocalStorageService,
    PreferencesService
  ]
})
export class PreferencesModule { }
