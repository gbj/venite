import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Organization, OrganizationService } from '../../organization/organization.module';
import { switchMap, tap } from 'rxjs/operators';
import { User } from 'firebase';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'venite-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss'],
})
export class AuthMenuComponent implements OnInit {
  organizations$ : Observable<Organization[]>;

  constructor(
    public auth : AuthService,
    private organizationService : OrganizationService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.organizations$ = this.auth.user.pipe(
      tap(user => console.log('loading orgs', user.uid)),
      switchMap(user => this.organizationService.organizationsWithOwner(user.uid)),
      tap(orgs => console.log('orgs', orgs)),
    );
  }

  updateUserPhoto(user : User, photoURL : string) {
    user.updateProfile({ photoURL });
  }

  async logout() {
    this.auth.logout()
  }

}
