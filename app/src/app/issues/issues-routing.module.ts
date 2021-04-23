import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IssueManagerGuard } from "./issue-manager.guard";

import { IssuesPage } from "./issues.page";

const routes: Routes = [
  {
    path: "",
    component: IssuesPage,
    canActivate: [IssueManagerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuesPageRoutingModule {}
