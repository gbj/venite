import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LiturgicalDay, ProperLiturgy } from '@venite/ldf';

import { CALENDAR_SERVICE, CalendarServiceInterface } from '@venite/ng-service-api';

@Component({
  selector: 'venite-proper-liturgy-menu',
  templateUrl: './proper-liturgy-menu.component.html',
  styleUrls: ['./proper-liturgy-menu.component.scss'],
})
export class ProperLiturgyMenuComponent implements OnInit {
  @Input() day : LiturgicalDay;
  @Input() language : string = 'en';
  @Input() properLiturgySelected : string | undefined = undefined;

  @Output() properLiturgyChange : EventEmitter<ProperLiturgy> = new EventEmitter();

  properLiturgies : Observable<ProperLiturgy[]>;

  constructor(@Inject(CALENDAR_SERVICE) private calendarService : CalendarServiceInterface) { }

  ngOnInit() {
    if(this.day) {
      this.updateLiturgies();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.day && !this.properLiturgySelected) {
      this.updateLiturgies();
    }
  }

  updateLiturgies() {
    this.properLiturgies = this.calendarService.findProperLiturgies(
      this.day,
      this.language
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
