import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { LiturgyMenuService } from './liturgy-menu.service';

import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';

import { Liturgy } from '@venite/ldf';

@Component({
  selector: 'venite-liturgy-menu',
  templateUrl: './liturgy-menu.component.html',
  styleUrls: ['./liturgy-menu.component.scss'],
})
export class LiturgyMenuComponent implements OnInit {
  @Input() language : string = 'en';
  @Input() version : string = 'Rite-II';

  /** Slug of default liturgy */
  @Input() liturgy : string;

  /** Emits the `Liturgy` whenever user's selection changes */
  @Output() liturgyChange : EventEmitter<Liturgy> = new EventEmitter();

  // Menu pulled from LiturgyMenuService
  liturgyOptions : Observable<Liturgy[]>;

  constructor(private liturgyMenu : LiturgyMenuService) { }

  async ngOnInit() {
    // grab liturgyOptions observable from the service
    this.liturgyOptions = this.liturgyMenu.findOptions(this.language, this.version);

    // default value is either whatever is Input or whatever is appropriate for the time of day
    // fire after a timeout so it registers as a change and emits liturgyChange
    // probably kind of hacky
    this.liturgy = this.liturgy || this.liturgyOfTheHour(new Date());
  }

  // Hard-coded default liturgy slug for any given hour
  liturgyOfTheHour(now : Date) : string {
    let hour : number = now.getHours();
    if(hour > 3 && hour < 11) {
      return "morning_prayer"
    } else if(hour >= 11 && hour <= 14) {
      return "noonday_prayer"
    } else if(hour >= 14 && hour <= 20) {
      return "evening_prayer"
    } else {
      return "compline"
    }
  }

  /** Emits liturgyChange() by searching on options for a Liturgy with the slug given */
  update(slug : string, options : Liturgy[]) {
    this.liturgyChange.emit(options.find(option => option.slug == slug));
  }
}
