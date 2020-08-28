import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { AlertController } from '@ionic/angular';
import { UserProfile } from 'src/app/auth/user/user-profile';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LiturgicalDocument, Sharing } from '@venite/ldf';

@Component({
  selector: 'venite-create-document-button',
  templateUrl: './create-document-button.component.html',
  styleUrls: ['./create-document-button.component.scss'],
})
export class CreateDocumentButtonComponent implements OnInit {
  @Output() newDoc : EventEmitter<string> = new EventEmitter;

  userProfile$ : Observable<UserProfile>;

  constructor(
    private alert : AlertController,
    private auth : AuthService,
    private documents: DocumentService
  ) { }

  ngOnInit() {
    this.userProfile$ = this.auth.user.pipe(
      switchMap(user => this.auth.getUserProfile(user.uid))
    );
  }

   // Create and navigate to a new document
   async new(userProfile : UserProfile) {
    const alert = await this.alert.create({
      header: 'Create Document',  // TODO: i18n translate whole alert
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
      type: 'liturgy',
      metadata: {
        preferences: {},
        special_preferences: {}
      },
      sharing: new Sharing({
        owner: userProfile.uid,
        organization: (userProfile.orgs || [''])[0],
        collaborators: [],
        status: 'draft',
        privacy: 'organization'
      }),
      label,
      'value': [new LiturgicalDocument({
        'type': 'heading',
        'style': 'text',
        'metadata': {
          'level': 1
        },
        'value': [label]
      })]
    }));

    this.newDoc.emit(docId);
  }

}
