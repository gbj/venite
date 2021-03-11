import { Component, OnInit, Input } from "@angular/core";
import { Location } from "@angular/common";
import { ToastController, PopoverController } from "@ionic/angular";

import { FavoriteTextComponent } from "../favorite-text/favorite-text.component";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { AuthService } from "src/app/auth/auth.service";
import { Favorite } from "src/app/favorites/favorite";
import { SelectedTextEvent, SelectionService } from "../selection.service";
import { FavoritesService } from "src/app/favorites/favorites.service";

@Component({
  selector: "venite-mark-favorite",
  templateUrl: "./mark-favorite.component.html",
  styleUrls: ["./mark-favorite.component.scss"],
  animations: [
    trigger("heart", [
      state(
        "unliked",
        style({
          opacity: "1",
        })
      ),
      state(
        "liked",
        style({
          fill: "red",
          opacity: "1",
        })
      ),
      transition("unliked <=> liked", [
        animate(150, style({ fill: "red", transform: "scale(1.5)" })),
        animate(150, style({ fill: "red", transform: "scale(1)" })),
        animate(150, style({ fill: "red", transform: "scale(1.25)" })),
        animate(150, style({ fill: "red", transform: "scale(1)" })),
      ]),
    ]),
  ],
})
export class MarkFavoriteComponent {
  @Input() selection: SelectedTextEvent;
  @Input() favoriteMarked: boolean = false;
  favorited: { id: string; favorited: Favorite };
  textUpdated: string;

  constructor(
    private popover: PopoverController,
    public auth: AuthService,
    public favoriteService: FavoritesService,
    private location: Location,
    private selections: SelectionService
  ) {}

  ngOnInit() {}

  // favorites
  toggleFavorite(selection: SelectedTextEvent) {
    if (!this.favoriteMarked) {
      this.favorite(selection);
    } else {
      this.unfavorite(selection);
    }
  }

  async favorite(selection: SelectedTextEvent) {
    const user = this.auth.currentUser()?.uid;

    const favorited = {
      user,
      url: decodeURI(this.location.path()),
      fragment: selection.fragment || null,
      citation: selection.citation,
      text: selection.text,
      note: null,
      tags: [],
    };

    selection.els.forEach((el) => {
      const span = el.shadowRoot.querySelector("span");
      span.classList.remove("selected");
      span.classList.add("liked");
    });

    this.favoriteMarked = true;

    try {
      const id = await this.favoriteService.create(favorited);
      this.favorited = { id, favorited };

      const popover = await this.popover.create({
        component: FavoriteTextComponent,
        componentProps: {
          favorited: {
            id: this.favorited.id,
            data: this.favorited.favorited,
          },
        },
        translucent: true,
      });

      await popover.present();

      this.selections.clear();
    } catch {
      this.favoriteMarked = false;
    }
  }

  async unfavorite(selection: SelectedTextEvent) {
    let f = this.favorited;
    await this.favoriteService.delete(f.id);
    this.favoriteMarked = false;
  }

  signIn() {
    const authButton = document.querySelector(
      "venite-auth-menu-button ion-button"
    );
    //@ts-ignore
    authButton.click();
  }
}
