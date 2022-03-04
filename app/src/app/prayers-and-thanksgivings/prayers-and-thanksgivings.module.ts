import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PrayersAndThanksgivingsPageRoutingModule } from "./prayers-and-thanksgivings-routing.module";

import { PrayersAndThanksgivingsPage } from "./prayers-and-thanksgivings.page";
import { TranslateModule } from "@ngx-translate/core";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../shared/shared.module";
import { PtPopupComponent } from "./pt-popup/pt-popup.component";
import { PrayPageModule } from "../pray/pray.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    PrayersAndThanksgivingsPageRoutingModule,
    AuthModule,
    SharedModule,
    PrayPageModule,
  ],
  declarations: [PrayersAndThanksgivingsPage, PtPopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrayersAndThanksgivingsPageModule {}
