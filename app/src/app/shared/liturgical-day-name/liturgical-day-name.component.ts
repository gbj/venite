import { Component, Input, OnInit } from '@angular/core';

import { LiturgicalDay } from '@venite/ldf';

@Component({
  selector: 'venite-liturgical-day-name',
  templateUrl: './liturgical-day-name.component.html',
  styleUrls: ['./liturgical-day-name.component.scss'],
})
export class LiturgicalDayNameComponent {
  @Input() day : LiturgicalDay;

  constructor() { }

}
