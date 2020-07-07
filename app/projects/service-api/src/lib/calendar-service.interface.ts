import { Observable } from 'rxjs';
import { Kalendar, LiturgicalWeekIndex, LiturgicalWeek, HolyDay, LiturgicalDay, ProperLiturgy, Liturgy, LiturgicalDocument } from '@venite/ldf';

export interface CalendarServiceInterface {
  findKalendars : () => Observable<Kalendar[]>;

  findSanctorals : () => Observable<Kalendar[]>;

  findWeek : (kalendar : string, query : LiturgicalWeekIndex) => Observable<LiturgicalWeek[]>;

  findFeastDays : (kalendar : string, mmdd : string) => Observable<HolyDay[]>;

  findSpecialDays : (kalendar : string, slug : string) => Observable<HolyDay[]>;

  findProperLiturgies : (day : LiturgicalDay, language : string) => Observable<ProperLiturgy[]>;

  addHolyDays : (day : LiturgicalDay, vigil : boolean) => Observable<LiturgicalDay>;

  buildWeek : (date : Observable<Date>, kalendar : Observable<string>, vigil : Observable<boolean>) => Observable<LiturgicalWeek[]>;

  buildDay : (date : Observable<Date>, kalendar : Observable<string>, liturgy: Observable<Liturgy|LiturgicalDocument>, week : Observable<LiturgicalWeek[]>, vigil : Observable<boolean>) => Observable<LiturgicalDay>;
}