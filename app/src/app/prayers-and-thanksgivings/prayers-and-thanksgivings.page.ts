import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PopoverController } from "@ionic/angular";
import {
  DisplaySettings,
  LiturgicalDocument,
  Liturgy,
  ResponsivePrayer,
  Text,
} from "@venite/ldf";
import {
  DocumentServiceInterface,
  DOCUMENT_SERVICE,
  PreferencesServiceInterface,
  PREFERENCES_SERVICE,
} from "@venite/ng-service-api";
import { combineLatest, Observable, Subscription } from "rxjs";
import { filter, map, startWith, tap } from "rxjs/operators";
import { PtPopupComponent } from "./pt-popup/pt-popup.component";

@Component({
  selector: "venite-prayers-and-thanksgivings",
  templateUrl: "./prayers-and-thanksgivings.page.html",
  styleUrls: ["./prayers-and-thanksgivings.page.scss"],
})
export class PrayersAndThanksgivingsPage implements OnInit, OnDestroy {
  pAndTs$: Observable<LiturgicalDocument[]>;
  settingsSub: Subscription;
  tree$: Observable<[any, any][][]>;
  search: FormControl = new FormControl("");

  constructor(
    @Inject(DOCUMENT_SERVICE) private documents: DocumentServiceInterface,
    @Inject(PREFERENCES_SERVICE)
    private preferences: PreferencesServiceInterface,
    private popover: PopoverController
  ) {}

  ngOnInit() {
    this.pAndTs$ = this.documents
      .findDocumentsByCategory(["Prayers and Thanksgivings"], "en", ["bcp1979"])
      .pipe(
        filter((docs) => docs?.length > 1),
        map((docs) => docs.sort((a, b) => (a.slug <= b.slug ? -1 : 1)))
      );

    const search$ = this.search.valueChanges.pipe(
      startWith(""),
      tap((search) => console.log("search = ", search))
    );

    this.tree$ = combineLatest(this.pAndTs$, search$).pipe(
      map(([docs, filter]) => this.buildTree(filter, docs))
    );

    // gross
    this.preferences.displaySettings().subscribe((settings) => {
      const classes = this.processSettings(settings);
      const root = document.querySelector("venite-root");
      if (root) {
        root.setAttribute("class", classes.join(" "));
      }
    });
  }

  async openDoc(doc: LiturgicalDocument, summary: string) {
    const popover = await this.popover.create({
      component: PtPopupComponent,
      componentProps: {
        doc,
        summary,
      },
    });
    await popover.present();
  }

  buildTree(filter: string, docs: LiturgicalDocument[]): [any, any][][] {
    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    }

    function summarizeValue(option: LiturgicalDocument): string {
      let summary;
      if (option.type == "text") {
        summary = (option as Text).value[0]
          ?.replace(/\*/g, "")
          ?.replace("  ", " ");
      } else if (option.type == "liturgy") {
        summary = ((option as Liturgy).value[0] as Text)?.value[0]
          ?.replace(/\*/g, "")
          ?.replace("  ", " ");
      } else if (option.type == "responsive") {
        summary = (option as ResponsivePrayer).value[0]?.text;
      }
      summary = summary || "";
      return summary;
    }

    const options = !filter
      ? docs || []
      : (docs || []).filter(
          (doc) =>
            doc.label?.toLowerCase()?.includes(filter.toLowerCase()) ||
            JSON.stringify(doc.value)
              ?.toLowerCase()
              ?.includes(filter.toLowerCase())
        );

    const categories = Array.from(
      groupBy(options, (item: Text) => (item.category || [])[1])
    );

    const subcategories = categories.map(([categoryLabel, values]) => [
      categoryLabel,
      Array.from(
        groupBy(
          values.map((value) => [value, summarizeValue(value)]),
          ([item]) => (item?.category || [])[2]
        )
      ),
    ]);

    return subcategories;
  }

  ngOnDestroy() {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe();
    }
  }

  processSettings(settings: DisplaySettings): string[] {
    return [
      `dropcaps-${settings?.dropcaps}`,
      `response-${settings?.response}`,
      `repeat-antiphon-${settings?.repeatAntiphon}`,
      `fontscale-${settings?.fontscale?.toString() || "l"}`,
      `font-${settings?.font}`,
      `psalmverses-${settings?.psalmVerses}`,
      `bibleverses-${settings?.bibleVerses}`,
    ];
  }
}
