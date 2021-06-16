import { Component, OnInit } from "@angular/core";
import { DisplaySettings } from "@venite/ldf";
import { combineLatest, Observable } from "rxjs";
import { first } from "rxjs/operators";
import { PreferencesService } from "../preferences/preferences.service";

@Component({
  selector: "venite-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  settings$: Observable<DisplaySettings>;

  morningStart: string;
  morningEnd: string;
  noonStart: string;
  noonEnd: string;
  eveningStart: string;
  eveningEnd: string;
  complineStart: string;
  complineEnd: string;

  constructor(private preferencesService: PreferencesService) {}

  formChange() {
    const [morningStartHr, morningStartMin] = this.morningStart.split(":"),
      [morningEndHr, morningEndMin] = this.morningEnd.split(":"),
      [noonStartHr, noonStartMin] = this.noonStart.split(":"),
      [noonEndHr, noonEndMin] = this.noonEnd.split(":"),
      [eveningStartHr, eveningStartMin] = this.eveningStart.split(":"),
      [eveningEndHr, eveningEndMin] = this.eveningEnd.split(":"),
      [complineStartHr, complineStartMin] = this.complineStart.split(":"),
      [complineEndHr, complineEndMin] = this.complineEnd.split(":");
    this.preferencesService.set(
      "liturgy-times",
      JSON.stringify({
        morning: {
          start: {
            hour: Number(morningStartHr),
            minute: Number(morningStartMin),
          },
          end: { hour: Number(morningEndHr), minute: Number(morningEndMin) },
        },
        noon: {
          start: { hour: Number(noonStartHr), minute: Number(noonStartMin) },
          end: { hour: Number(noonEndHr), minute: Number(noonEndMin) },
        },
        evening: {
          start: {
            hour: Number(eveningStartHr),
            minute: Number(eveningStartMin),
          },
          end: { hour: Number(eveningEndHr), minute: Number(eveningEndMin) },
        },
        compline: {
          start: {
            hour: Number(complineStartHr),
            minute: Number(complineStartMin),
          },
          end: { hour: Number(complineEndHr), minute: Number(complineEndMin) },
        },
      })
    );
  }

  ngOnInit() {
    this.preferencesService.liturgyTimeRanges().subscribe((times) => {
      this.morningStart = `${times.morning.start.hour
        .toString()
        .padStart(2, "0")}:${times.morning.start.minute
        .toString()
        .padStart(2, "0")}`;

      this.morningEnd = `${times.morning.end.hour
        .toString()
        .padStart(2, "0")}:${times.morning.end.minute
        .toString()
        .padStart(2, "0")}`;

      this.noonStart = `${times.noon.start.hour
        .toString()
        .padStart(2, "0")}:${times.noon.start.minute
        .toString()
        .padStart(2, "0")}`;

      this.noonEnd = `${times.noon.end.hour
        .toString()
        .padStart(2, "0")}:${times.noon.end.minute
        .toString()
        .padStart(2, "0")}`;

      this.eveningStart = `${times.evening.start.hour
        .toString()
        .padStart(2, "0")}:${times.evening.start.minute
        .toString()
        .padStart(2, "0")}`;

      this.eveningEnd = `${times.evening.end.hour
        .toString()
        .padStart(2, "0")}:${times.evening.end.minute
        .toString()
        .padStart(2, "0")}`;

      this.complineStart = `${times.compline.start.hour
        .toString()
        .padStart(2, "0")}:${times.compline.start.minute
        .toString()
        .padStart(2, "0")}`;

      this.complineEnd = `${times.compline.end.hour
        .toString()
        .padStart(2, "0")}:${times.compline.end.minute
        .toString()
        .padStart(2, "0")}`;
    });
    // Grab display settings from preferences
    this.settings$ = this.preferencesService.displaySettings();
  }
}
