import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { LiturgicalDayNameComponent } from './liturgical-day-name/liturgical-day-name.component';
import { LiturgyMenuComponent } from './liturgy-menu/liturgy-menu.component';
import { LiturgyPreferenceMenuComponent } from './liturgy-preference-menu/liturgy-preference-menu.component';
import { MenuComponent } from './menu/menu.component';
import { DateComponent } from './date/date.component';

@NgModule({
  declarations: [
    DateComponent,
    LiturgicalDayNameComponent,
    LiturgyMenuComponent,
    LiturgyPreferenceMenuComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    LiturgicalDayNameComponent,
    LiturgyMenuComponent,
    LiturgyPreferenceMenuComponent,
    DateComponent,
    MenuComponent
  ]
})
export class SharedModule { }
