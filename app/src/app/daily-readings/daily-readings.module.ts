import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DailyReadingsPageRoutingModule } from "./daily-readings-routing.module";

import { DailyReadingsPage } from "./daily-readings.page";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyReadingsPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [DailyReadingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DailyReadingsPageModule {}
