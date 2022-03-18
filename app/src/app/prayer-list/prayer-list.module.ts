import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PrayerListPageRoutingModule } from "./prayer-list-routing.module";

import { PrayerListPage } from "./prayer-list.page";
import { TranslateModule } from "@ngx-translate/core";
import { PrayerListService } from "./prayer-list.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayerListPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [PrayerListPage],
})
export class PrayerListPageModule {}
