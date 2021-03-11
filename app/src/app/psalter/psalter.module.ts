import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PsalterPageRoutingModule } from "./psalter-routing.module";

import { PsalterPage } from "./psalter.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsalterPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [PsalterPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PsalterPageModule {}
