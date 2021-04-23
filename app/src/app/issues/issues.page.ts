import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { IssueService, IdAndIssue } from "./issue.service";

@Component({
  selector: "venite-issues",
  templateUrl: "./issues.page.html",
  styleUrls: ["./issues.page.scss"],
})
export class IssuesPage implements OnInit {
  open$: Observable<IdAndIssue[]>;
  pending$: Observable<IdAndIssue[]>;
  closed$: Observable<IdAndIssue[]>;

  constructor(
    private issueService: IssueService,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.open$ = this.issueService.open();
    this.pending$ = this.issueService.pending();
    this.closed$ = this.issueService.closed();
  }

  close(id: string) {
    this.issueService.close(id);
  }

  delete(id: string) {
    this.issueService.delete(id);
  }

  open(id: string) {
    this.issueService.setOpen(id);
  }

  setPending(id: string) {
    this.issueService.setPending(id);
  }

  setPriority(id: string, priority: number) {
    this.issueService.setPriority(id, priority);
  }

  async priorityAlert(id: string) {
    const alert = await this.alert.create({
      header: "Set Priority",
      inputs: [
        {
          type: "radio",
          label: "Low",
          value: 1,
        },
        {
          type: "radio",
          label: "Medium",
          value: 3,
        },
        {
          type: "radio",
          label: "High",
          value: 5,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Ok",
        },
      ],
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();
    this.issueService.setPriority(id, data?.values || null);
  }
}
