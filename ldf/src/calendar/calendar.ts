/** Describes properties of the liturgical calendar used in a particular tradition. */
export class Calendar {
  /** `true` if this calendar uses the Julian calendar, `false` if Gregorian */
  julian : boolean;

  /** How many weeks before Easter the Easter cycle begins in the calendar */
  easterCycleBegins: number;

  /** How many weeks before Christmas the Christmas cycle begins in the calendar */
  christmasCycleBegins: number;
}

export const TEC_1979_CALENDAR : Calendar = {
  julian: false,
  easterCycleBegins: 7,
  christmasCycleBegins: 4
}