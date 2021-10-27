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
  state: "idle" | "pending" | "error" = "idle";

  ngOnInit() {}

  async report(): Promise<void> {
    try {
      this.state = "pending";
      await this.issues.create({
        name: this.name,
        email: this.email,
        location: window.location.toString(),
        description: this.description,
        status: Status.Open,
        priority: null,
      });

      this.state = "idle";

      return await this.modal.dismiss();
    } catch (e) {
      console.warn("Error reporting issue", e);
      this.state = "error";
    }
  }

  dismiss() {
    if (this.modal) {
      this.modal.dismiss();
    } else {
      this.modalController.dismiss();
    }
  }
}
