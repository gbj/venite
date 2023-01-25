import { Component, NgZone } from "@angular/core";

import { ModalController, Platform, ToastController } from "@ionic/angular";

// Community Modules
import { TranslateService } from "@ngx-translate/core";
import { DarkmodeService } from "@venite/ng-darkmode";
import { combineLatest, Observable, of } from "rxjs";
import {
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
} from "rxjs/operators";
import { AuthService } from "./auth/auth.service";
import { Organization } from "./organization/organization";
import { OrganizationService } from "./organization/organization.module";
import { PreferencesService } from "./preferences/preferences.service";

import { Router } from "@angular/router";
import { App } from "@capacitor/app";

import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { environment } from "../environments/environment";
import { IssueComponent } from "./shared/issue/issue.component";
import { IssueService } from "./issues/issue.service";
import { LocalStorageService } from "./services/local-storage.service";

@Component({
  selector: "venite-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  remindersEnabled: boolean = false;
  organizations$: Observable<Organization[]>;
  canDonate: boolean = true;
  issueManager$: Observable<boolean>;
  issues$: Observable<number | null>;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private auth: AuthService,
    private organizationService: OrganizationService,
    private darkMode: DarkmodeService,
    private preferences: PreferencesService,
    private zone: NgZone,
    private router: Router,
    private modal: ModalController,
    private issues: IssueService,
    private storage: LocalStorageService,
    private toast: ToastController
  ) {
    this.initializeApp();
    this.translate.use("en");
  }

  async initializeApp() {
    this.canDonate = !this.platform.is("capacitor");

    this.platform.ready().then(() => {
      // deep links
      App.addListener("appUrlOpen", (data: { url: string }) => {
        this.zone.run(() => {
          const slug = data.url.split(".app").pop();
          if (slug) {
            this.router.navigateByUrl(slug);
          }
        });
      });

      // reminders page
      this.remindersEnabled = this.platform.is("capacitor");

      // organizations for auth menu
      this.organizations$ = this.auth.user.pipe(
        switchMap((user) =>
          user
            ? this.organizationService.organizationsWithUser(user.uid)
            : of([])
        )
      );

      // dark mode + ecru
      combineLatest([
        this.darkMode.prefersDark.pipe(startWith(false)),
        this.darkMode.darkmodePreference$.pipe(
          map((storedPreference) =>
            storedPreference ? storedPreference.value : "auto"
          )
        ),
      ]).subscribe(([prefersDark, pref]) => {
        document.body.classList.toggle("ecru", pref == "ecru");

        if (prefersDark && pref !== "ecru") {
          document.body.classList.toggle("dark", true);
        } else {
          document.body.classList.toggle("dark", false);
        }
      });

      // iOS text accessibility/font scaling
      if (this.platform.is("ios")) {
        this.preferences.get("font_accessibility").subscribe((pref) => {
          if (pref?.value === "true") {
            document.body.classList.add("dynamic-text");
          } else {
            document.body.classList.remove("dynamic-text");
          }
        });
      }
    });

    if (this.platform.is("capacitor")) {
      FirebaseAnalytics.initializeFirebase(environment.firebase);
      FirebaseAnalytics.setCollectionEnabled({
        enabled: true,
      });
    }

    // Issues
    this.issueManager$ = combineLatest([
      this.auth.user,
      this.organizationService.find("venite"),
    ]).pipe(
      map(
        ([user, org]) =>
          org.owner === user?.uid || org.editors.includes(user?.uid)
      )
    );
    this.issues$ = this.issueManager$.pipe(
      switchMap((isManager) =>
        isManager ? this.issues.numberOpen() : of(null)
      )
    );

    // Venite 2 welcome message
    const hasHiddenWelcomeMessage = await this.storage.get(
      "v2-hide-welcome-message"
    );
    if (!hasHiddenWelcomeMessage) {
      const toast = await this.toast.create({
        message: "Welcome to Venite 2.0.",
        color: "tertiary",
        buttons: [
          {
            text: "Learn More",
            handler: () => {
              this.router.navigateByUrl("/about#2");
              this.storage.set("v2-hide-welcome-message", true);
            },
          },
          {
            icon: "close",
            handler: () => {
              this.storage.set("v2-hide-welcome-message", true);
            },
          },
        ],
      });
      await toast.present();
    }
  }

  async reportIssue() {
    const modal = await this.modal.create({
      component: IssueComponent,
    });
    modal.componentProps = {
      modal,
    };

    await modal.present();
  }
}
