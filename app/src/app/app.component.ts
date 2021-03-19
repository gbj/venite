import { Component, NgZone } from "@angular/core";

import { Platform } from "@ionic/angular";

// Community Modules
import { TranslateService } from "@ngx-translate/core";
import { DarkmodeService } from "@venite/ng-darkmode";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AuthService } from "./auth/auth.service";
import { Organization } from "./organization/organization";
import { OrganizationService } from "./organization/organization.module";
import { PreferencesService } from "./preferences/preferences.service";

import { Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
const { App } = Plugins;

@Component({
  selector: "venite-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  remindersEnabled: boolean = false;
  organizations$: Observable<Organization[]>;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private auth: AuthService,
    private organizationService: OrganizationService,
    private darkMode: DarkmodeService,
    private preferences: PreferencesService,
    private zone: NgZone,
    private router: Router
  ) {
    this.initializeApp();
    this.translate.use("en");
  }

  initializeApp() {
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

      // dark mode
      this.darkMode.prefersDark.subscribe((prefersDark) => {
        document.body.classList.toggle("dark", prefersDark);
      });

      // sepia/ecru mode
      this.preferences
        .get("darkmode")
        .pipe(
          map((storedPreference) =>
            storedPreference ? storedPreference.value : "auto"
          )
        )
        .subscribe((value) =>
          document.body.classList.toggle("ecru", value == "ecru")
        );
    });
  }
}
