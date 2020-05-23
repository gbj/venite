import { LiturgicalWeek } from '../liturgical-week';
import { LiturgicalColor } from '../liturgical-color';

export interface ISeasonService {
  easterCycle(index : number) : LiturgicalWeek;
  adventCycle(index : number) : LiturgicalWeek;
  christmasCycle(index : number) : LiturgicalWeek;
  epiphanyCycle(index : number) : LiturgicalWeek;
  color(name : string) : LiturgicalColor;

  christmasCycleWeek(date : Date) : LiturgicalWeek;
  easterCycleWeek(date : Date) : LiturgicalWeek;
}
