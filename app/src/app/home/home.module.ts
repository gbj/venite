import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";

// Libraries
import { TranslateModule } from "@ngx-translate/core";

// Venite Modules
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../shared/shared.module";
import { PrayMenuModule } from "@venite/ng-pray-menu";

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    TranslateModule,
    PrayMenuModule,
    SharedModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
