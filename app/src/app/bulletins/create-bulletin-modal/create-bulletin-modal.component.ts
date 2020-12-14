import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BulletinCommands } from '@venite/ng-pray-menu';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { OrganizationService } from 'src/app/organization/organization.module';
import { DocumentService } from 'src/app/services/document.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'venite-create-bulletin-modal',
  templateUrl: './create-bulletin-modal.component.html',
  styleUrls: ['./create-bulletin-modal.component.scss'],
})
export class CreateBulletinModalComponent implements OnInit {
  @Input() modal : any;

  constructor(
    private auth : AuthService,
    private organizationService : OrganizationService,
    private router : Router,
    private alert : AlertController,
    private documents : DocumentService,
    private translate : TranslateService
  ) {}
  
  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }

  async createBulletin(event : BulletinCommands) {
    // ask for a title and URL slug for this bulletin
    const liturgy = event?.state?.liturgy,
      orgs$ = this.auth.user.pipe(
        switchMap(user => user ? this.organizationService.organizationsWithUser(user.uid) : []),
      );
    
    orgs$.subscribe(
      async orgs => {
        const org = orgs.map(org => org.slug)[0];
        let proceed = true;

        if(org) {
          const alert = await this.alert.create({
            header: this.translate.instant("bulletins.create-a-bulletin"),
            message: this.translate.instant("bulletins.title-url-message", {base: `/${org}`}),
            inputs: [
              {
                name: 'label',
                type: 'text',
                placeholder: this.translate.instant("bulletins.title"),
                value: liturgy?.label
              },
              org && {
                name: 'slug',
                type: 'text',
                placeholder: this.translate.instant("bulletins.url", {base: `/${org}`}),
                value: liturgy?.slug
              }
            ],
            buttons: [
              {
                text: this.translate.instant("editor.cancel"),
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => console.log('cancel')
              }, {
                text: this.translate.instant("editor.create"),
                handler: () => console.log('ok')
              }
            ]
          });
      
          await alert.present();
      
          const { data } = await alert.onDidDismiss(),
            { values } = data,
            { label, slug } = values;
      
          event.state.liturgy.label = label;
          event.state.liturgy.slug = slug;
          
          // deduplicate slug
          if(slug) {
            const others = await this.documents.myOrganizationDocumentsWithSlug(org, slug).pipe(take(1)).toPromise();
            if(others?.length > 0 && proceed) {
              proceed = false;

              const alert = await this.alert.create({
                header: this.translate.instant("bulletins.conflict-found"),
                message: this.translate.instant("bulletins.conflict-found-message"),
                buttons: [
                  {
                    text: this.translate.instant("editor.cancel"),
                    role: 'cancel',
                    cssClass: 'secondary'
                  }, {
                    text: this.translate.instant("bulletins.ok"),
                    handler: () => {
                      liturgy.slug = slug;

                      others.forEach(other => {
                        this.documents.saveDocument(other.id, {
                          ...other.data,
                          slug: `${other.data.slug}-${other.data.day?.date || 'template'}`
                        })
                      });

                      this.router.navigate(
                        event.commands,
                        {
                          state: event.state,
                          skipLocationChange: true
                        }
                      )
                      this.dismiss();
                    }
                  }
                ]
              });
    
              await alert.present();
            } else {
              console.log('no duplicates');
            }
          }
        }
    
        // navigate to the newly-created bulletin
        console.log('proceed', proceed);

        if(proceed) {
          console.log('proceed');
          this.router.navigate(
            event.commands,
            {
              state: event.state,
              skipLocationChange: true
            }
          )
          this.dismiss();
        }
      }
    );
  }
}
