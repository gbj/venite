import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { LiturgicalDocument, Responsive } from "@venite/ldf";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Hymn } from "./hymn";
import { HymnService } from "./hymn.service";

@Component({
  selector: "venite-hymn-selector",
  templateUrl: "./hymn-selector.component.html",
  styleUrls: ["./hymn-selector.component.scss"],
})
export class HymnSelectorComponent implements OnInit {
  @Output() hymnSelected: EventEmitter<LiturgicalDocument> = new EventEmitter();

  search$: BehaviorSubject<string> = new BehaviorSubject("");
  hymns$: Observable<Hymn[]>;

  constructor(
    private hymnService: HymnService,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.hymns$ = this.search$.pipe(
      switchMap((search) => (search ? this.hymnService.search(search) : of([])))
    );
  }

  filter(search: string) {
    this.search$.next(search);
  }

  async chooseHymn(hymn: Hymn, mode: "title" | "text" | "scan" | "responsive") {
    let value: string[] = [];

    if (mode === "title") {
      this.hymnSelected.next(
        new LiturgicalDocument({
          type: "text",
          style: "text",
          label: hymn.title,
          citation: hymn.tune,
          source: {
            api: "venite",
            source: hymn.source,
            citation: hymn.number,
          },
          value,
        })
      );
    } else if (mode === "text") {
      if (hymn.textUrl) {
        const loading = await this.loading.create({
          backdropDismiss: true,
          message: "Loading Hymn Text...",
        });
        await loading.present();

        try {
          const resp = await fetch(
            `https://us-central1-venite-2.cloudfunctions.net/hymnText?url=${hymn.textUrl}`
          );
          const text: string[] = await resp.json();
          if (Array.isArray(text)) {
            value = text;
          } else {
            console.warn("(chooseHymn) invalid hymn-text response: ", text);
          }
        } catch (e) {
          console.warn("(chooseHymn) error while loading hymn text ", e);
        }

        await loading.dismiss();
      }

      this.hymnSelected.next(
        new LiturgicalDocument({
          type: "text",
          style: "text",
          label: hymn.title,
          citation: hymn.tune,
          source: {
            api: "venite",
            source: hymn.source,
            citation: hymn.number,
          },
          value,
        })
      );
    } else if (mode === "scan") {
      if (hymn.textUrl) {
        const loading = await this.loading.create({
          backdropDismiss: true,
          message: "Loading Page Scans...",
        });
        await loading.present();

        try {
          const resp = await fetch(
            `https://us-central1-venite-2.cloudfunctions.net/hymnImages?url=${hymn.textUrl}`
          );
          const text: string[] = await resp.json();
          if (Array.isArray(text)) {
            value = text;
          } else {
            console.warn("(chooseHymn) invalid hymn-image response: ", text);
          }
        } catch (e) {
          console.warn("(chooseHymn) error while loading hymn images ", e);
        }

        await loading.dismiss();
      }

      this.hymnSelected.next(
        new LiturgicalDocument({
          type: "image",
          style: "normal",
          label: hymn.title,
          citation: hymn.tune,
          source: {
            api: "venite",
            source: hymn.source,
            citation: hymn.number,
          },
          value,
        })
      );
    } else if (mode === "responsive") {
      if (hymn.textUrl) {
        const loading = await this.loading.create({
          backdropDismiss: true,
          message: "Loading Page Scans...",
        });
        await loading.present();

        try {
          const resp = await fetch(
            `https://us-central1-venite-2.cloudfunctions.net/hymnImages?url=${hymn.textUrl}`
          );
          const text: string[] = await resp.json();
          if (Array.isArray(text)) {
            value = text;
          } else {
            console.warn("(chooseHymn) invalid hymn-image response: ", text);
          }
        } catch (e) {
          console.warn("(chooseHymn) error while loading hymn images ", e);
        }

        await loading.dismiss();
      }

      let textValue: string[] = [];
      if (hymn.textUrl) {
        const loading = await this.loading.create({
          backdropDismiss: true,
          message: "Loading Hymn Text...",
        });
        await loading.present();

        try {
          const resp = await fetch(
            `https://us-central1-venite-2.cloudfunctions.net/hymnText?url=${hymn.textUrl}`
          );
          const text: string[] = await resp.json();
          if (Array.isArray(text)) {
            textValue = text;
          } else {
            console.warn("(chooseHymn) invalid hymn-text response: ", text);
          }
        } catch (e) {
          console.warn("(chooseHymn) error while loading hymn text ", e);
        }

        await loading.dismiss();
      }

      this.hymnSelected.next(
        new LiturgicalDocument({
          type: "liturgy",
          value: [
            new LiturgicalDocument({
              type: "image",
              style: "normal",
              label: hymn.title,
              citation: hymn.tune,
              source: {
                api: "venite",
                source: hymn.source,
                citation: hymn.number,
              },
              value,
              responsive: Responsive.SmallHidden,
            }),
            new LiturgicalDocument({
              type: "text",
              style: "text",
              label: hymn.title,
              citation: hymn.tune,
              source: {
                api: "venite",
                source: hymn.source,
                citation: hymn.number,
              },
              value: textValue,
              responsive: Responsive.SmallOnly,
            }),
          ],
        })
      );
    }
  }
}
