import { dateFromYMD } from './date-from-ymd';
import { dateOnly } from './date-only';

/** Returns the date of Easter in a given year */
export function easterInYear(Y: number, julian: boolean = false): Date {
  if (julian) {
    // Computus — Meeus's Julian algorithm
    const a = Y % 4,
      b = Y % 7,
      c = Y % 19,
      d = (19 * c + 15) % 30,
      e = (2 * a + 4 * b - d + 34) % 7,
      month = (d + e + 114) / 31,
      day = ((d + e + 114) % 31) + 1;
    return dateOnly(new Date(Y, month - 1, day));
  } else {
    // Computus - Meeus/Jones/Butcher algorithm
    const a = Y % 19,
      b = Math.floor(Y / 100),
      c = Y % 100,
      d = Math.floor(b / 4),
      e = b % 4,
      f = Math.floor((b + 8) / 25),
      g = Math.floor((b - f + 1) / 3),
      h = (19 * a + b - d - g + 15) % 30,
      i = Math.floor(c / 4),
      k = c % 4,
      L = (32 + 2 * e + 2 * i - h - k) % 7,
      m = Math.floor((a + 11 * h + 22 * L) / 451),
      month = Math.floor((h + L - 7 * m + 114) / 31),
      day = ((h + L - 7 * m + 114) % 31) + 1;
    return dateOnly(new Date(Y, month - 1, day));
  }
}
