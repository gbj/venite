import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'venite-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss'],
})
export class EditAvatarComponent implements OnInit {
  @Input() user : User;
  showEditTooltip : boolean = false;

  constructor() { }

  ngOnInit() {}

  toggleEditTooltip() {
    this.showEditTooltip = !this.showEditTooltip;
    console.log('toggle');
  }

  editAvatar() {
    console.log('edit avatar');
  }
}
