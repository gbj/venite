import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LectionaryPage } from "./lectionary.page";

const routes: Routes = [
  {
    path: "",
    component: LectionaryPage,
  },
  {
    path: ":ymd",
    component: LectionaryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectionaryPageRoutingModule {}
