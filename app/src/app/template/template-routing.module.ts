import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TemplatePage } from "./template.page";

const routes: Routes = [
  {
    path: ":docId",
    component: TemplatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatePageRoutingModule {}
