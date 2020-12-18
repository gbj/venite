import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Image, LiturgicalDocument } from '@venite/ldf';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'venite-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  @Input() uploadPath : string = 'users/avatar';
  @Output() imageUploaded : EventEmitter<LiturgicalDocument> = new EventEmitter();

  isUploading : boolean = false;

  error : string | null = null;
  
  // Contains a Data URL of a new image
  preview$ : Observable<string>;
  progress$ : Observable<number>;

  // Previous images I've uploaded
  myImages$ : Observable<string[]>;

  constructor(
    private upload: UploadService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes : SimpleChanges) {
    if(changes.uploadPath) {
      this.myImages$ = this.upload.listFiles(changes.uploadPath.currentValue);
    }
  }

  handleFiles(event : Event) {
    //console.log('handleFiles', event);
    
    const file = (<HTMLInputElement>event.target).files[0];
    if(file.type.startsWith('image')) {

      // create and load a preview
      const reader = new FileReader();
      reader.onload = e => this.preview$ = of(e.target.result.toString());
      reader.readAsDataURL(file);

      // upload to Firebase
      this.uploadImage(file);
    }
  }

  sendImage(url : string) {
    this.imageUploaded.emit(new Image({ type: 'image', value: [url]}))
  }

  uploadImage(file : File) {
    this.isUploading = true;
    const filePath = `${this.uploadPath}/${new Date().getTime()}-${file.name}`;
    this.progress$ = this.upload.uploadFile(file, filePath);

    // when progress is complete, save the new user image
    this.progress$.pipe(
      finalize(() => {
        this.preview$ = this.upload.getDownloadURL(filePath);
        this.isUploading = false;
        // messy but works
        this.preview$.subscribe(
          (value) => this.sendImage(value),
          (error) => this.error = error.toString()
        );
      })
    ).subscribe();
  }
}
