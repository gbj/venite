import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LiturgicalDay, Liturgy, ProperLiturgy } from '@venite/ldf';

import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'venite-proper-liturgy-menu',
  templateUrl: './proper-liturgy-menu.component.html',
  styleUrls: ['./proper-liturgy-menu.component.scss'],
})
export class ProperLiturgyMenuComponent implements OnInit {
  @Input() day : LiturgicalDay;
  @Input() language : string = 'en';

  @Output() properLiturgyChange : EventEmitter<ProperLiturgy> = new EventEmitter();

  properLiturgies : Observable<ProperLiturgy[]>;

  constructor(private calendarService : CalendarService) { }

  ngOnInit() {
    if(this.day) {
      this.updateLiturgies();
    }
  }

  ngOnChanges() {
    if(this.day) {
      this.updateLiturgies();
    }
  }

  updateLiturgies() {
    this.properLiturgies = this.calendarService.findProperLiturgies(
      this.day,
      this.language
    ).pipe(
      tap(val => console.log('updateLiturgies', val))
    );
  }

  change(proper_liturgy : ProperLiturgy, event : CustomEvent) {
    if(event.detail.checked) {
      this.properLiturgyChange.emit(proper_liturgy)
    } else {
      this.properLiturgyChange.emit(undefined);
    }
  }
}
