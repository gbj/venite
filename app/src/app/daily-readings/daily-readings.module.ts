import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DailyReadingsPageRoutingModule } from "./daily-readings-routing.module";

import { DailyReadingsPage } from "./daily-readings.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyReadingsPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [DailyReadingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DailyReadingsPageModule {}
