import { LiturgicalWeek } from '../liturgical-week';

export function dailyOfficeYear(date: Date, week: LiturgicalWeek) {
  // The Daily Office Lectionary is arranged in a two-year cycle. Year One
  // begins on the First Sunday of Advent preceding odd-numbered years, and
  // Year Two begins on the First Sunday of Advent preceding even-numbered
  // years.  (Thus, on the First Sunday of Advent, 1976, the Lectionary for
  // Year One is begun.)
  let D = [1, 2],
    year;
  // if Advent or December, use this year
  if (week.season === 'Advent' || date.getMonth() + 1 == 12) {
    year = date.getFullYear();
  } else {
    year = date.getFullYear() - 1;
  }
  return D[year % 2];
}

export function rclYear(date: Date, week: LiturgicalWeek): string {
  // The RCL is arranged in a three-year cycle. Year A
  // begins on the First Sunday of Advent in 2016/19/22,
  // Year B in 2017/20/23, Year C in 2018/21/24 etc.
  const D = ['A', 'B', 'C'];
  let year: number;
  // if Advent or December, use this year
  if (week.season === 'Advent' || date.getMonth() + 1 == 12) {
    year = date.getFullYear();
  } else {
    year = date.getFullYear() - 1;
  }
  return D[year % 3];
}
