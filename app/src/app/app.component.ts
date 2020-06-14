import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';

// Community Modules
import { TranslateService } from '@ngx-translate/core';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'venite-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private translate : TranslateService,
    private darkMode : DarkmodeService
  ) {
    this.initializeApp();
    this.translate.use('en');
  }

  initializeApp() {
    this.platform.ready().then(() => {
//      this.statusBar.styleDefault();
//      this.splashScreen.hide();

      this.darkMode.prefersDark.subscribe(prefersDark => {
        console.log('now prefers dark', prefersDark);
        document.body.classList.toggle('dark', prefersDark);
      });
    });
  }
}
