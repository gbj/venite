import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PrayersAndThanksgivingsPageRoutingModule } from "./prayers-and-thanksgivings-routing.module";

import { PrayersAndThanksgivingsPage } from "./prayers-and-thanksgivings.page";
import { TranslateModule } from "@ngx-translate/core";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PrayersAndThanksgivingsPageRoutingModule,
    AuthModule,
    SharedModule,
  ],
  declarations: [PrayersAndThanksgivingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrayersAndThanksgivingsPageModule {}
