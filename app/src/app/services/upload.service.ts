import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File, filePath: string): Observable<number> {
    const task = this.storage.upload(filePath, file);
    return task.percentageChanges();
  }

  getDownloadURL(filePath: string): Observable<string> {
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL();
  }

  listFiles(filePath: string): Observable<string[]> {
    //console.log('(listFiles) filePath = ', filePath);
    const ref = this.storage.ref(filePath),
      listResult$ = ref.listAll(),
      imageRefs$ = listResult$.pipe(map((result) => result.items)),
      imageUrls$ = imageRefs$.pipe(
        switchMap((refs) =>
          Promise.all(refs.map(async (ref) => await ref.getDownloadURL()))
        )
      );

    return imageUrls$;
  }
}
