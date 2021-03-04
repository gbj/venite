import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { MenuComponent } from './menu/menu.component';
import { PrayMenuModule } from '@venite/ng-pray-menu';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PrayMenuModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}