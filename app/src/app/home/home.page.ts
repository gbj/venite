import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "firebase/app";

import { BehaviorSubject, Observable, Subject, combineLatest } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";

import {
  HolyDay,
  Kalendar,
  LiturgicalDocument,
  LiturgicalDay,
  LiturgicalWeek,
  LiturgicalWeekIndex,
  ProperLiturgy,
  ClientPreferences,
  liturgicalWeek,
  liturgicalDay,
  addOneDay,
  dateToYMD,
  Liturgy,
  Preference,
} from "@venite/ldf";

import { AuthService } from "../auth/auth.service";
import { CalendarService } from "../services/calendar.service";
import { DocumentService } from "../services/document.service";
import { PreferencesService } from "../preferences/preferences.service";
import { LectionaryService } from "../services/lectionary.service";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "venite-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
