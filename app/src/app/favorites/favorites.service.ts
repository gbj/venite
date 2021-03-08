import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Favorite } from "./favorite";
import firebase from 'firebase/app';
import 'firebase/firestore';

export type IdAndFavorite = {
  id: string;
  data: Favorite;
};

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  objects$ : Observable<Favorite[]>;

  constructor(
    private auth: AuthService,
    private readonly afs: AngularFirestore,
  ) { }

  async create(dto: Favorite) : Promise<string> {
    const id = this.afs.createId();
    await this.afs.collection('Favorites').doc(id).set({
      ...dto,
      date_created: firebase.firestore.Timestamp.now(),
      date_modified: firebase.firestore.Timestamp.now()
    });
    return id;
  }

  read(id : string) : Observable<IdAndFavorite> {
    return this.afs.collection('Favorites').doc<Favorite>(id).valueChanges().pipe(
      map(data => ({ id, data }))
    );
  }

  readAll() : Observable<IdAndFavorite[]> {
    return this.auth.user.pipe(
      tap(user => console.log('searching for all favorites for', user?.uid)),
      switchMap(user => this.afs.collection<Favorite>('Favorites', ref => ref.where('user', '==', user.uid)).snapshotChanges()),
      map(changeactions => changeactions.map(action => {
        const doc = action.payload.doc;
        return {
          id: doc.id,
          data: doc.data()
        }
      })),
    );
  }

  async update(id : string, dto : Favorite) : Promise<void> {
    return this.afs.collection('Favorites').doc(id).set({
      ...dto,
      date_modified: firebase.firestore.Timestamp.now()
    });
  }

  async delete(id : string) : Promise<void> {
    return this.afs.collection('Favorites').doc(id).delete();
  }
}