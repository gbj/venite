import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from './organization.service';
import { Organization } from './organization';
import { switchMap, tap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserProfile } from '../auth/user/user-profile';

@Component({
  selector: 'venite-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {
  organization$ : Observable<Organization>;
  isOwner$ : Observable<boolean>;
  members$ : Observable<UserProfile[]>;

  constructor(
    private route : ActivatedRoute,
    private auth : AuthService,
    private organizationService : OrganizationService
  ) { }

  ngOnInit() {
    this.organization$ = this.route.params.pipe(
      map(params => params.orgId),
      switchMap(orgId => this.organizationService.find(orgId))
    );

    this.isOwner$ = combineLatest(this.auth.user, this.organization$).pipe(
      map(([user, org]) => user.uid == org.owner)
    );

    this.members$ = this.route.params.pipe(
      map(params => params.orgId),
      switchMap(orgId => this.organizationService.members(orgId))
    );
  }

}
