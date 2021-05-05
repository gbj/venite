import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { MeditatePageRoutingModule } from "./meditate-routing.module";

import { MeditatePage } from "./meditate.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MeditatePageRoutingModule,
    TranslateModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [MeditatePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MeditatePageModule {}
