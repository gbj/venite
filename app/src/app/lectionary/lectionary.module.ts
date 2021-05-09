import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LectionaryPageRoutingModule } from "./lectionary-routing.module";

import { LectionaryPage } from "./lectionary.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectionaryPageRoutingModule,
    TranslateModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [LectionaryPage],
})
export class LectionaryPageModule {}
