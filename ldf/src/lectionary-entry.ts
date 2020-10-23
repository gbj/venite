export class LectionaryEntry {
  lectionary?: string;
  citation: string;
  day?: string;
  type?: string; //'first_reading'|'second_reading'|'gospel'|'morning_psalm'|'evening_psalm'
  whentype?: string; //'year'|'date'|'time';
  when?: number;
}
