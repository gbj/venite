import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { combineLatest, Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Favorite } from "./favorite";
import { FavoritesService, IdAndFavorite } from "./favorites.service";

@Component({
  selector: "venite-favorites",
  templateUrl: "./favorites.page.html",
  styleUrls: ["./favorites.page.scss"],
})
export class FavoritesPage implements OnInit {
  objects$: Observable<IdAndFavorite[]>;

  search: FormControl = new FormControl(window?.location?.hash || "");

  constructor(
    public auth: AuthService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.search.setValue(window?.location?.hash || "");

    this.objects$ = combineLatest([
      this.favoritesService.readAll(),
      this.search.valueChanges.pipe(startWith(this.search.value)),
    ]).pipe(
      map(([favorites, search]) =>
        favorites
          .filter(
            (favorite) =>
              favorite.data.text
                ?.toLowerCase()
                ?.includes(search.toLowerCase()) ||
              favorite.data.note?.toLowerCase()?.includes(search.toLowerCase())
          )
          .sort((a, b) =>
            a.data?.date_created?.toDate() < b.data?.date_created?.toDate()
              ? 1
              : -1
          )
      )
    );
  }
}
