import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';

// Community Modules
import { TranslateService } from '@ngx-translate/core';
import { DarkmodeService } from '@venite/ng-darkmode';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Organization } from './organization/organization';
import { OrganizationService } from './organization/organization.module';
//import { DarkmodeService } from '@venite/ng-darkmode';

@Component({
  selector: 'venite-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  remindersEnabled : boolean = false;
  organizations$ : Observable<Organization[]>;

  constructor(
    private platform : Platform,
    private translate : TranslateService,
    private auth : AuthService,
    private organizationService : OrganizationService,
    private darkMode : DarkmodeService
  ) {
    this.initializeApp();
    this.translate.use('en');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.remindersEnabled = this.platform.is('capacitor');

      this.organizations$ = this.auth.user.pipe(
        switchMap(user => user ? this.organizationService.organizationsWithUser(user.uid) : []),
      );
//      this.statusBar.styleDefault();
//      this.splashScreen.hide();

      this.darkMode.prefersDark.subscribe(prefersDark => {
        //console.log('now prefers dark', prefersDark);
        document.body.classList.toggle('dark', prefersDark);
      });
    });
  }
}
