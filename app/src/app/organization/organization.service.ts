import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Organization } from './organization';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, switchMap, take } from 'rxjs/operators';
import { UserProfile } from '../auth/user/user-profile';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private readonly afs: AngularFirestore) { }

  organizationById(orgId : string) : Observable<Organization> {
    return this.afs.doc<Organization>(`Organizations/${orgId}`).valueChanges();
  }

  // Enables a user to start following a particular organization
  async join(uid : string, orgId : string) : Promise<void> {
    return await this.afs.doc(`Users/${uid}`).update({
      ['orgs']: firestore.FieldValue.arrayUnion(orgId)
    });
  }

  async create(name : string, ownerUID : string) : Promise<DocumentReference> {
    const slug = slugify(name);

    // check uniqueness of slug
    const exists = await this.exists(slug);
    if(exists) {
      const [n, inc] = name.split(/-(\d+)/);
      this.create(`${n}${(parseInt(inc) || 0) +1}`, ownerUID);
    }

    return await this.afs.collection<Organization>('Organizations').add({
      slug,
      name,
      owner: ownerUID,
      editors: []
    })
  }

  async exists(slug : string) : Promise<boolean> {
    return this.afs.doc<Organization>(`Organizations/${slug}`).snapshotChanges().pipe(
      take(1),
      map(d => d.payload.exists)
    ).toPromise();
  }

  // Search by string
  organizationsMatching(search : string) : Observable<Organization[]> {
    return this.afs.collection<Organization>('Organization').snapshotChanges().pipe(
      // transform from AngularFire `DocumentChangeAction` to `doc`
      map(changeactions => changeactions.map(action => action?.payload?.doc)),
      // extra ID and document data and leave the rest behind
      map(orgs => orgs.map(doc => ({ ... doc.data(), id: doc.id })))
    );
  }

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
    return this.afs.doc<UserProfile>(`Users/${uid}`)
      .valueChanges()
      .pipe(
        map(userProfile => userProfile.orgs),
        switchMap(orgs => combineLatest(orgs.map(this.organizationById)))
      )
  }
}

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '') // Replace spaces with ''
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
}