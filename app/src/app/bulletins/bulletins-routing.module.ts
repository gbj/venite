import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BulletinsPage } from "./bulletins.page";

const routes: Routes = [
  {
    path: "",
    component: BulletinsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BulletinsPageRoutingModule {}
