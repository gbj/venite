import { Component, Inject, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthServiceInterface, AUTH_SERVICE } from "@venite/ng-service-api";
import { IssueService, Status } from "src/app/issues/issue.service";

@Component({
  selector: "venite-issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["./issue.component.scss"],
})
export class IssueComponent implements OnInit {
  @Input() modal: any;

  constructor(
    private issues: IssueService,
    @Inject(AUTH_SERVICE) public auth: AuthServiceInterface,
    private modalController: ModalController
  ) {}

  name = this.auth.currentUser()?.displayName;
  email = this.auth.currentUser()?.email;
  description = "";
  //name = new FormControl(this.auth.currentUser()?.displayName);
  //email = new FormControl(this.auth.currentUser()?.email);
  //description = new FormControl("");

  ngOnInit() {}

  async report(): Promise<void> {
    await this.issues.create({
      name: this.name,
      email: this.email,
      location: window.location.toString(),
      description: this.description,
      status: Status.Open,
      priority: null,
    });

    return await this.modal.dismiss();
  }

  dismiss() {
    if (this.modal) {
      this.modal.dismiss();
    } else {
      this.modalController.dismiss();
    }
  }
}
