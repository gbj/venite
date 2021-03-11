import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController, AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Favorite } from "../favorite";
import { FavoritesService, IdAndFavorite } from "../favorites.service";

@Component({
  selector: "venite-favorite-detail",
  templateUrl: "./favorite-detail.component.html",
  styleUrls: ["./favorite-detail.component.scss"],
})
export class FavoriteDetailComponent implements OnInit {
  obj$: Observable<IdAndFavorite>;

  constructor(
    private route: ActivatedRoute,
    private service: FavoritesService,
    private alert: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obj$ = this.route.params.pipe(
      switchMap((params) => this.service.read(params.id)),
      map((dto) => ({
        ...dto,
        data: {
          ...dto.data,
          tags: dto.data?.note ? dto.data.note.match(/\#[^\s]*/g) : [],
        },
      }))
    );
  }

  async delete(id: string, obj: Favorite) {
    const alert = await this.alert.create({
      header: "Confirm Deletion",
      message: `Do you want to delete ‘${this.deleteQuestionLabel(obj)}’?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Delete",
          role: "submit",
          cssClass: "danger",
          handler: async () => {
            await this.service.delete(id);
            this.router.navigate(["/", "favorites"]);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteQuestionLabel(obj: Favorite) {
    return obj.text.length > 30 ? `${obj.text.slice(0, 30)}...` : obj.text;
  }

  updateFavoriteText(obj: IdAndFavorite, event: CustomEvent) {
    obj.data.note = event.detail.value;
    this.service.update(obj.id, obj.data);
  }
}
