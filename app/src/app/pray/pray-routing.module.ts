import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClassicBulletinRedirectComponent } from "./classic-bulletin-redirect/classic-bulletin-redirect.component";

import { PrayPage } from "./pray.page";

const routes: Routes = [
  { path: "b/:docId", component: PrayPage },
  { path: "bulletin/:bulletinId", component: ClassicBulletinRedirectComponent },
  { path: ":orgId/:slug", component: PrayPage },
  {
    path: ":language/:version/:kalendar/:y/:m/:d/:liturgy/:vigil/:prefs/:observance/:newSlug/:newLabel",
    component: PrayPage,
  },
  {
    path: ":language/:version/:kalendar/:y/:m/:d/:liturgy/:vigil/:prefs/:observance",
    component: PrayPage,
  },
  {
    path: ":language/:version/:kalendar/:y/:m/:d/:liturgy/:vigil/:prefs",
    component: PrayPage,
  },
  {
    path: ":language/:version/:kalendar/:y/:m/:d/:liturgy/:prefs",
    component: PrayPage,
  },
  {
    path: ":language/:version/:kalendar/:y/:m/:d/:liturgy",
    component: PrayPage,
  },
  {
    path: "",
    component: PrayPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayPageRoutingModule {}
