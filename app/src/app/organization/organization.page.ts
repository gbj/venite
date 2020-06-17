import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from './organization.service';
import { Organization } from './organization';
import { switchMap, tap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserProfile } from '../auth/user/user-profile';
import { User } from 'firebase/app';

@Component({
  selector: 'venite-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {
  orgId$ : Observable<string>;
  organization$ : Observable<Organization>;
  role$ : Observable<'owner' | 'editor' | 'member' | 'none'>;  // User's 
  members$ : Observable<UserProfile[]>;

  constructor(
    private route : ActivatedRoute,
    public auth : AuthService,
    private organizationService : OrganizationService
  ) { }

  ngOnInit() {
    this.orgId$ = this.route.params.pipe(
      map(params => params.orgId)
    );

    const userProfile$ = this.auth.user.pipe(
      switchMap(user => this.auth.getUserProfile(user.uid))
    );

    this.organization$ = this.orgId$.pipe(
      switchMap(orgId => this.organizationService.find(orgId))
    );

    this.role$ = combineLatest(this.auth.user, userProfile$, this.orgId$, this.organization$).pipe(
      map(([user, userProfile, orgId, org]) => {
        if(user.uid == org.owner) {
          return 'owner';
        } else if(org.editors.includes(user.uid)) {
          return 'editor';
        } else if(userProfile.orgs.includes(orgId)) {
          return 'member';
        } else {
          return 'none';
        }
      })
    );

    this.members$ = this.orgId$.pipe(
      switchMap(orgId => this.organizationService.members(orgId))
    );
  }

  join(user : User, orgId : string) : Promise<void> {
    return this.organizationService.join(user.uid, orgId);
  }

  leave(user : User, orgId : string) : Promise<void> {
    return this.organizationService.leave(user.uid, orgId);
  }

  addEditor(event : UserProfile, orgId : string) : Promise<void> {
    return this.organizationService.addEditor(event.uid, orgId);
  }

  removeEditor(uid : string, orgId : string) : Promise<void> {
    return this.organizationService.removeEditor(uid, orgId);
  }

}
