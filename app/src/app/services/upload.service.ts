import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage : AngularFireStorage) { }

  uploadFile(file : File, filePath : string) : Observable<number> {
    const task = this.storage.upload(filePath, file);
    return task.percentageChanges();
  }

  getDownloadURL(filePath : string) : Observable<string> {
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL();
  }
}
