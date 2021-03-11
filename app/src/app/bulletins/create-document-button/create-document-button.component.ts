import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { DocumentService } from "src/app/services/document.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { UserProfile } from "src/app/auth/user/user-profile";
import { combineLatest, Observable, of } from "rxjs";
import { map, switchMap, take, tap } from "rxjs/operators";
import { LiturgicalDocument, Sharing } from "@venite/ldf";
import { TranslateService } from "@ngx-translate/core";
import { slugify } from "src/app/slugify";
import {
  Organization,
  OrganizationService,
} from "src/app/organization/organization.module";

@Component({
  selector: "venite-create-document-button",
  templateUrl: "./create-document-button.component.html",
  styleUrls: ["./create-document-button.component.scss"],
})
export class CreateDocumentButtonComponent implements OnInit {
  @Input() label: string = "Create a New Document";
  @Input() template: (string) => Promise<LiturgicalDocument>;
  @Input() icon;
  @Output() newDoc: EventEmitter<string> = new EventEmitter();

  userData$: Observable<{
    profile: UserProfile;
    uid: string;
    orgs: Organization[];
  }>;

  constructor(
    private alert: AlertController,
    private auth: AuthService,
    private documents: DocumentService,
    private organizationService: OrganizationService,
    private translate: TranslateService,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    const userProfile$ = this.auth.user.pipe(
      switchMap((user) => this.auth.getUserProfile(user?.uid))
    );

    const orgs$ = this.auth.user.pipe(
      switchMap((user) =>
        this.organizationService.organizationsWithUser(user?.uid)
      )
    );

    this.userData$ = combineLatest([userProfile$, this.auth.user, orgs$]).pipe(
      map(([profile, user, orgs]) => ({ profile, uid: user?.uid, orgs }))
    );
  }

  // Create and navigate to a new document
  async new(userProfile: UserProfile, uid: string, orgs: Organization[]) {
    const alert = await this.alert.create({
      header: "Create a Template", // TODO: i18n translate whole alert
      inputs: [
        {
          name: "label",
          type: "text",
          placeholder: "Title",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Create",
          handler: (value) =>
            this.createNew(userProfile, uid, orgs, value.label),
        },
      ],
    });

    await alert.present();
  }

  async createNew(
    userProfile: UserProfile,
    uid: string,
    orgs: Organization[],
    label: string
  ) {
    const loading = await this.loading.create();
    await loading.present();

    const template = await this.template(label); //,
    //slug = await ;

    this.uniqueSlugify(
      orgs[0]?.slug,
      uid,
      template.slug || slugify(template.label)
    ).subscribe(async (slug) => {
      const docId = await this.documents.newDocument(
        new LiturgicalDocument({
          ...template,
          slug,
          sharing: new Sharing({
            owner: userProfile.uid,
            organization: (userProfile.orgs || [""])[0],
            collaborators: [],
            status: "draft",
            privacy: "organization",
          }),
        })
      );

      this.loading.dismiss();

      this.newDoc.emit(docId);
    });
  }

  uniqueSlugify(org: string, uid: string, s: string): Observable<string> {
    const slugified = slugify(s);

    return this.documents.myOrgDocExists(org, uid, s).pipe(
      take(1),
      //tap(exists => //console.log('uniqueSlugify', org, s, uid, 'exists?', exists)),
      switchMap((exists) => {
        if (exists) {
          const [n, inc] = s.split(/-(\d+)/);
          return this.uniqueSlugify(
            org,
            uid,
            `${n}-${(parseInt(inc) || 1) + 1}`
          );
        } else {
          return of(slugified);
        }
      })
    );
  }
}
