import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'venite-create-bulletin-modal',
  templateUrl: './create-bulletin-modal.component.html',
  styleUrls: ['./create-bulletin-modal.component.scss'],
})
export class CreateBulletinModalComponent implements OnInit {
  @Input() modal : any;
  
  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }

  dayChosen(event : any) {
    this.dismiss();
  }
}
