import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Organization } from '../../organization/organization';

import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { OrganizationService } from 'src/app/organization/organization.service';

@Component({
  selector: 'venite-join-organization',
  templateUrl: './join-organization.component.html',
  styleUrls: ['./join-organization.component.scss'],
})
export class JoinOrganizationComponent implements OnInit {
  @Input() modal : any = null;
  @Output() complete : EventEmitter<boolean> = new EventEmitter();

  // the text to be searched
  search$ : BehaviorSubject<string> = new BehaviorSubject('');

  // organizations that match the search
  matches$ : Observable<Organization[]>;


  constructor(
    private auth : AuthService,
    private organizationService : OrganizationService
  ) { }

  ngOnInit() {
    this.matches$ = this.search$.pipe(
      //filter(search => !!search),
      switchMap(search => this.organizationService.organizationsMatching(search))
    );
  }

  runSearch(event : CustomEvent) {
    this.search$.next(event.detail.value);
  }

  trackByFn(index : number, item : Organization) {
    return item.slug;
  }

  async joinOrganization(org : Organization) {
    const user = this.auth.currentUser();
    await this.organizationService.join(user.uid, org.id);
    this.complete.emit(true);
  }

  async createOrganization(name : string) {
    const user = this.auth.currentUser();
    //console.log('creating organization with user', user);
    await this.organizationService.create(name, user.uid);
    this.complete.emit(true);
  }

  dismiss() {
    this.modal.dismiss();
  }
}
