import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from "@angular/core";
import { Observable, BehaviorSubject, Subject, fromEvent, of } from "rxjs";
import { Organization } from "../../organization/organization";

import { filter, map, startWith, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { OrganizationService } from "src/app/organization/organization.service";
import { AlertController, IonSearchbar, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { CreateOrganizationComponent } from "../create-organization/create-organization.component";

@Component({
  selector: "venite-join-organization",
  templateUrl: "./join-organization.component.html",
  styleUrls: ["./join-organization.component.scss"],
})
export class JoinOrganizationComponent implements OnInit {
  @Input() modal: any = null;
  @Output() complete: EventEmitter<boolean> = new EventEmitter();

  @ViewChildren("searchBar") searchBar: QueryList<IonSearchbar>;

  // the text to be searched
  search$: Subject<string> = new Subject();

  // organizations that match the search
  matches$: Observable<Organization[]>;

  constructor(
    private auth: AuthService,
    private organizationService: OrganizationService,
    private modalController: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.matches$ = this.search$.pipe(
      startWith(""),
      switchMap((search) =>
        this.organizationService.organizationsMatching(search)
      )
    );
  }

  runSearch(event: CustomEvent) {
    this.search$.next(event.detail.value);
  }

  trackByFn(index: number, item: Organization) {
    return item.slug;
  }

  async joinOrganization(org: Organization) {
    const user = this.auth.currentUser();
    await this.organizationService.join(user.uid, org.id);
    this.complete.emit(true);
  }

  async createOrganization(name: string) {
    const user = this.auth.currentUser();

    const modal = await this.modalController.create({
      component: CreateOrganizationComponent,
    });
    modal.componentProps = {
      modal,
      name,
    };
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.organizationService.create(name, user.uid);
    }

    this.complete.emit(true);
  }

  dismiss() {
    this.modal.dismiss();
  }
}
