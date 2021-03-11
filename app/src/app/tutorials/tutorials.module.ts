import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TutorialsPageRoutingModule } from "./tutorials-routing.module";

import { TutorialsPage } from "./tutorials.page";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialsPageRoutingModule,
    AuthModule,
  ],
  declarations: [TutorialsPage],
})
export class TutorialsPageModule {}
