import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { DateComponent } from './date/date.component';
import { LiturgicalDayNameComponent } from './liturgical-day-name/liturgical-day-name.component';
import { LiturgyMenuComponent } from './liturgy-menu/liturgy-menu.component';
import { LiturgyPreferenceMenuComponent } from './liturgy-preference-menu/liturgy-preference-menu.component';
import { MenuComponent } from './menu/menu.component';
import { ProperLiturgyMenuComponent } from './proper-liturgy-menu/proper-liturgy-menu.component';

@NgModule({
  declarations: [
    DateComponent,
    LiturgicalDayNameComponent,
    LiturgyMenuComponent,
    LiturgyPreferenceMenuComponent,
    MenuComponent,
    ProperLiturgyMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    DateComponent,
    LiturgicalDayNameComponent,
    LiturgyMenuComponent,
    LiturgyPreferenceMenuComponent,
    MenuComponent,
    ProperLiturgyMenuComponent
  ]
})
export class SharedModule { }
