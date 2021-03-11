import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SettingsPageRoutingModule } from "./settings-routing.module";

import { SettingsPage } from "./settings.page";
import { PrayPageModule } from "@venite/ng-pray";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    PrayPageModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
