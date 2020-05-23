import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LiturgyMenuService } from './liturgy-menu.service';

import { Observable } from 'rxjs';

import { Liturgy } from '@venite/ldf';

@Component({
  selector: 'venite-liturgy-menu',
  templateUrl: './liturgy-menu.component.html',
  styleUrls: ['./liturgy-menu.component.scss'],
})
export class LiturgyMenuComponent implements OnInit {
  @Input() language : string = 'en';
  @Input() version : string = 'Rite-II';

  @Output() liturgyChange : EventEmitter<Liturgy> = new EventEmitter();

  liturgyOptions : Promise<Liturgy[]>;

  constructor(private liturgyMenu : LiturgyMenuService) { }

  async ngOnInit() {
    this.liturgyOptions = this.liturgyMenu.getOptions(this.language, this.version);
    console.log(await this.liturgyOptions);
  }

  async update(event : CustomEvent) {
    const options = await this.liturgyOptions;
    const choice = options.find(opt => opt.slug == event.detail.value);
    this.liturgyChange.emit(choice);
  }

}
