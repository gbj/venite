import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from 'firebase';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'venite-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss'],
})
export class EditAvatarComponent implements OnInit {
  @Input() user : User;
  @Output() photoURLChange : EventEmitter<string> = new EventEmitter();

  error: string;

  showEditTooltip : boolean = false;
  isUploading : boolean = false;

  // Contains a Data URL of a new image
  preview$ : Observable<string>;
  progress$ : Observable<number>;

  @ViewChild('newAvatarInput') avatarInput;

  constructor(private upload : UploadService) { }

  ngOnInit() {}

  toggleEditTooltip() {
    this.showEditTooltip = !this.showEditTooltip;
  }

  editAvatar() {
    this.avatarInput.nativeElement.click();
  }

  handleFiles(event : Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    if(file.type.startsWith('image')) {

      // create and load a preview
      const reader = new FileReader();
      reader.onload = e => this.preview$ = of(e.target.result.toString());
      reader.readAsDataURL(file);

      // upload to Firebase
      this.uploadAvatar(file);
    }
  }

  uploadAvatar(file : File) {
    this.isUploading = true;
    const filePath = `users/avatar/${new Date().getTime()}-${file.name}`;
    this.progress$ = this.upload.uploadFile(file, filePath);

    // when progress is complete, save the new user image
    this.progress$.pipe(
      finalize(() => {
        this.preview$ = this.upload.getDownloadURL(filePath);
        this.isUploading = false;
        // messy but works
        this.preview$.subscribe(
          (value) => this.photoURLChange.emit(value),
          (error) => this.error = error.toString()
        );
      })
    ).subscribe();
  }
}
