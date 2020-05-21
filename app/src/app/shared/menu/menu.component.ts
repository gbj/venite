import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PlatformService } from '../../services/platform.service';
import { AuthService } from '../../auth/auth.service';

import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'venite-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  remindersEnabled : boolean = false;

  constructor(
    public auth : AuthService,
    private platform : PlatformService,
    private modal : ModalController
  ) { }

  signOut() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.remindersEnabled = this.platform.is('capacitor');
  }

  async signIn() {
    const modal = await this.modal.create({
      component: LoginComponent
    });
    return await modal.present();
  }

}
