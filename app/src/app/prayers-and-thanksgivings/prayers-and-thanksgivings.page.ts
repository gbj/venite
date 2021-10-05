import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { DisplaySettings, LiturgicalDocument } from "@venite/ldf";
import {
  DocumentServiceInterface,
  DOCUMENT_SERVICE,
  PreferencesServiceInterface,
  PREFERENCES_SERVICE,
} from "@venite/ng-service-api";
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "venite-prayers-and-thanksgivings",
  templateUrl: "./prayers-and-thanksgivings.page.html",
  styleUrls: ["./prayers-and-thanksgivings.page.scss"],
})
export class PrayersAndThanksgivingsPage implements OnInit, OnDestroy {
  pAndTs$: Observable<LiturgicalDocument[]>;
  settingsSub: Subscription;

  constructor(
    @Inject(DOCUMENT_SERVICE) private documents: DocumentServiceInterface,
    @Inject(PREFERENCES_SERVICE)
    private preferences: PreferencesServiceInterface
  ) {}

  ngOnInit() {
    this.pAndTs$ = this.documents
      .findDocumentsByCategory(["Prayers and Thanksgivings"], "en", ["bcp1979"])
      .pipe(
        filter((docs) => docs?.length > 1),
        map((docs) => docs.sort((a, b) => (a.slug <= b.slug ? -1 : 1)))
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
