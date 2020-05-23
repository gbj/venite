import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { LiturgyMenuComponent } from './liturgy-menu/liturgy-menu.component';
import { MenuComponent } from './menu/menu.component';
import { DateComponent } from './date/date.component';

@NgModule({
  declarations: [
    DateComponent,
    LiturgyMenuComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    LiturgyMenuComponent,
    DateComponent,
    MenuComponent
  ]
})
export class SharedModule { }
