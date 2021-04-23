import { Component, Inject, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { AuthServiceInterface, AUTH_SERVICE } from "@venite/ng-service-api";

enum Status {
  Open = "Open",
  Closed = "Closed",
  Pending = "Pending",
}

type Report = {
  name: string;
  email: string;
  location: string;
  description: string;
  status: Status;
  priority: 3;
};

@Component({
  selector: "venite-issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["./issue.component.scss"],
})
export class IssueComponent implements OnInit {
  @Input() modal: any;

  constructor(
    private afs: AngularFirestore,
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
    const docId = this.afs.createId();
    const report: Report = {
      name: this.name,
      email: this.email,
      location: window.location.toString(),
      description: this.description,
      status: Status.Open,
      priority: 3,
    };
    await this.afs.collection("Issue").doc(docId).set(report);

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
