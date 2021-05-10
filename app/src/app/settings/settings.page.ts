import { Component, OnInit } from "@angular/core";
import { DisplaySettings } from "@venite/ldf";
import { combineLatest, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { PreferencesService } from "../preferences/preferences.service";

@Component({
  selector: "venite-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  settings$: Observable<DisplaySettings>;

  constructor(private preferencesService: PreferencesService) {}

  ngOnInit() {
    // Grab display settings from preferences
    this.settings$ = this.preferencesService.displaySettings();
  }
}
