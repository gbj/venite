import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FavoriteDetailComponent } from "./favorite-detail/favorite-detail.component";

import { FavoritesPage } from "./favorites.page";

const routes: Routes = [
  {
    path: "",
    component: FavoritesPage,
  },
  {
    path: ":id",
    component: FavoriteDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesPageRoutingModule {}
