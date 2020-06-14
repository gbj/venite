import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Organization } from './organization';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private readonly afs: AngularFirestore) { }

  // Search by user

  /** All organizations in which a given user plays any role */
  organizationsWithUser(uid : string) : Observable<Organization[]> {
    return combineLatest(
      this.organizationsWithOwner(uid),
      this.organizationsWithEditor(uid),
      this.organizationsWithMember(uid)
    ).pipe(
      map(([owner, editor, member]) => owner.concat(editor).concat(member))
    )
  }

  /** All organizations of which a given user is the owner */
  organizationsWithOwner(uid : string) : Observable<Organization[]> {
    return this.afs.collection<Organization>('Organization', ref =>
      ref.where('owner', '==', uid)
    ).valueChanges();
  }

  /** All organizations of which a given user is an editor */
  organizationsWithEditor(uid : string) : Observable<Organization[]> {
    return this.afs.collection<Organization>('Organization', ref =>
      ref.where('editors', 'array-contains', uid)
    ).valueChanges();
  }

  /** All organizations of which a given user is a member */
  organizationsWithMember(uid : string) : Observable<Organization[]> {
    return this.afs.collection<Organization>('Organization', ref =>
      ref.where('members', 'array-contains', uid)
    ).valueChanges();
  }
}
