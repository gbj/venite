import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrganizationPage } from "./organization.page";

const routes: Routes = [
  {
    path: ":orgId",
    component: OrganizationPage,
  },
  {
    path: ":orgId/latest",
    component: OrganizationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationPageRoutingModule {}
