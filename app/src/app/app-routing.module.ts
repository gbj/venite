import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./login.guard";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "church",
    loadChildren: () =>
      import("./organization/organization.module").then(
        (m) => m.OrganizationPageModule
      ),
  },
  {
    path: "reminders",
    loadChildren: () =>
      import("@venite/ng-reminders").then((m) => m.RemindersPageModule),
  },
  {
    path: "pray",
    loadChildren: () =>
      import("./pray/pray.module").then((m) => m.PrayPageModule),
  },
  {
    path: "bulletin",
    loadChildren: () =>
      import("./pray/pray.module").then((m) => m.PrayPageModule),
  },
  {
    path: "tutorials",
    loadChildren: () =>
      import("./tutorials/tutorials.module").then((m) => m.TutorialsPageModule),
  },
  {
    path: "bulletins",
    loadChildren: () =>
      import("./bulletins/bulletins.module").then((m) => m.BulletinsPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "templates",
    loadChildren: () =>
      import("./bulletins/bulletins.module").then((m) => m.BulletinsPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "template",
    loadChildren: () =>
      import("./template/template.module").then((m) => m.TemplatePageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "about",
    loadChildren: () =>
      import("./about/about.module").then((m) => m.AboutPageModule),
  },
  {
    path: "psalter",
    loadChildren: () =>
      import("./psalter/psalter.module").then((m) => m.PsalterPageModule),
  },
  {
    path: "daily-readings",
    loadChildren: () =>
      import("./daily-readings/daily-readings.module").then(
        (m) => m.DailyReadingsPageModule
      ),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule),
  },
  {
    path: "favorites",
    loadChildren: () =>
      import("./favorites/favorites.module").then((m) => m.FavoritesPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "issues",
    loadChildren: () =>
      import("./issues/issues.module").then((m) => m.IssuesPageModule),
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
