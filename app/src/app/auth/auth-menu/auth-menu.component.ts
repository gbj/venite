import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Organization, OrganizationService } from '../../organization/organization.module';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'venite-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss'],
})
export class AuthMenuComponent implements OnInit {
  organizations$ : Observable<Organization[]>;

  constructor(
    public auth : AuthService,
    private organizationService : OrganizationService
  ) { }

  ngOnInit() {
    this.organizations$ = this.auth.user.pipe(
      tap(user => console.log('loading orgs', user.uid)),
      switchMap(user => this.organizationService.organizationsWithOwner(user.uid)),
      tap(orgs => console.log('orgs', orgs)),
    );
  }

}
