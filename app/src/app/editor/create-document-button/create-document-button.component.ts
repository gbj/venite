import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { AlertController } from '@ionic/angular';
import { UserProfile } from 'src/app/auth/user/user-profile';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LiturgicalDocument, Sharing } from '@venite/ldf';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'venite-create-document-button',
  templateUrl: './create-document-button.component.html',
  styleUrls: ['./create-document-button.component.scss'],
})
export class CreateDocumentButtonComponent implements OnInit {
  @Input() label : string = "Create a New Document";
  @Input() template: (string) => LiturgicalDocument;
  @Input() icon;
  @Output() newDoc : EventEmitter<string> = new EventEmitter;

  userProfile$ : Observable<UserProfile>;


  constructor(
    private alert : AlertController,
    private auth : AuthService,
    private documents: DocumentService,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.userProfile$ = this.auth.user.pipe(
      switchMap(user => this.auth.getUserProfile(user.uid))
    );
  }

   // Create and navigate to a new document
   async new(userProfile : UserProfile) {
    const alert = await this.alert.create({
      header: 'Create a Template',  // TODO: i18n translate whole alert
      inputs: [
        {
          name: 'label',
          type: 'text',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Create',
          handler: value => this.createNew(userProfile, value.label)
        }
      ]
    });

    await alert.present();
  }

  async createNew(userProfile : UserProfile, label : string) {
    const docId = await this.documents.newDocument(new LiturgicalDocument({
      ... this.template(label),
      sharing: new Sharing({
        owner: userProfile.uid,
        organization: (userProfile.orgs || [''])[0],
        collaborators: [],
        status: 'draft',
        privacy: 'organization'
      })
    }));

    this.newDoc.emit(docId);
  }

}
