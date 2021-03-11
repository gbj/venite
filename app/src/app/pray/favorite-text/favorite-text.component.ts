import { Component, OnInit, Input } from "@angular/core";

import { Favorite } from "src/app/favorites/favorite";
import {
  FavoritesService,
  IdAndFavorite,
} from "src/app/favorites/favorites.service";

@Component({
  selector: "venite-favorite-text",
  templateUrl: "./favorite-text.component.html",
  styleUrls: ["./favorite-text.component.scss"],
})
export class FavoriteTextComponent implements OnInit {
  @Input() favorited: IdAndFavorite;
  textUpdated: string;

  constructor(private favoriteService: FavoritesService) {}

  ngOnInit() {
    console.log("opening with ", this.favorited);
  }

  async updateFavoriteText(event) {
    this.textUpdated = "saving";
    const f = this.favorited;
    f.data.note = event.detail.value;
    await this.favoriteService.update(f.id, f.data);
    this.textUpdated = "saved";
  }
}
