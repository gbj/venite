import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BulletinCommands } from '@venite/ng-pray-menu';

@Component({
  selector: 'venite-create-bulletin-modal',
  templateUrl: './create-bulletin-modal.component.html',
  styleUrls: ['./create-bulletin-modal.component.scss'],
})
export class CreateBulletinModalComponent implements OnInit {
  @Input() modal : any;

  constructor(
    private router : Router
  ) {}
  
  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }

  createBulletin(event : BulletinCommands) {
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
