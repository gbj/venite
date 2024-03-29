import { LiturgicalDocument } from '../liturgical-document';
import { Text } from '../text';
import { LiturgicalDay } from '../calendar/liturgical-day';
import { docsToOption } from './docs-to-option';
import { HolyDay } from '../calendar/holy-day';
import { docsToLiturgy } from './docs-to-liturgy';
import { dateFromYMDString } from '../calendar/utils';

const FAKE_SEASONS = ['Saints', 'Mary'];

/** Given a set of all possible collects and a `LiturgicalDay`, returns a `LiturgicalDocument` of the correct collect or sequence of collects */
export function findCollect(
  collects: LiturgicalDocument[],
  day: LiturgicalDay,
  sundayFirst: boolean = true,
  emberDayPrecedesSunday: boolean = false,
  allSaintsSuppressesCollectOfTheDayUnlessSunday: boolean = false,
  allSaintsOctaveSuppressesCollectOfTheDayUnlessSunday: boolean = false,
  allowMultiple: boolean = true,
  sundayRedLetterDaysAlsoIncludeSundayCollect: boolean = false,
): LiturgicalDocument | null {
  const date = dateFromYMDString(day.date),
    observedDay = (day.holy_day_observed ? day.collect : null) || day.propers || day.slug,
    isAllSaintsOctave = date.getMonth() === 10 && date.getDate() === 8,
    isInOctaveOfAllSaints = date.getMonth() === 10 && date.getDate() >= 1 && date.getDate() <= 8,
    suppressSundayCollect =
      (allSaintsSuppressesCollectOfTheDayUnlessSunday && isInOctaveOfAllSaints && date.getDay() !== 0) ||
      (allSaintsOctaveSuppressesCollectOfTheDayUnlessSunday && isAllSaintsOctave && date.getDay() !== 0),
    redLetterCollects = collects.filter((collect) => collect.slug === observedDay),
    redLetterCollect = redLetterCollects.length > 0 ? docsToOption(redLetterCollects) : null,
    sundaySlug = day.week?.propers || day.week?.slug,
    sundayCollects = collects.filter((collect) => collect.slug === sundaySlug),
    sundayCollect = !suppressSundayCollect && sundayCollects.length > 0 ? docsToOption(sundayCollects) : null,
    redLetterOrSunday = redLetterCollect || sundayCollect,
    season = !FAKE_SEASONS.includes(day.season) ? day.season : day.week?.season || day.season,
    seasonalCollects = collects.filter((collect) => collect.slug === season),
    octave = day?.octave || (day?.holy_days && day?.holy_days[0] && day.holy_days[0].octave),
    octaveCollect = octave ? docsToOption(collects.filter((collect) => collect.slug === octave)) : null,
    blackLetterDays = (day.holy_days || []).filter(
      (feast) => feast.type && feast.type.rank < 3 && feast?.slug !== redLetterOrSunday?.slug,
    ),
    blackLetterCollects = blackLetterDays.map((holyday) =>
      docsToOption(
        (holyday.category || [])
          .map((category) =>
            collects
              .filter((collect) => collect.slug === category)
              .map((collect) => (collect.type === 'text' ? processCollectText(collect as Text, holyday) : collect)),
          )
          .concat(
            collects.filter(
              (collect) =>
                (collect.slug === holyday.slug || collect.slug === holyday.collect) &&
                !(holyday.slug && holyday.category?.includes(holyday.slug)),
            ),
          )
          .flat(),
      ),
    ),
    // don't include the seasonal collect if it's the same as the Sunday, i.e., on the First Sunday of Advent
    observedSeasonalCollect = seasonalCollects
      ? docsToLiturgy(
          seasonalCollects.filter((collect) => {
            const collectValue = JSON.stringify(collect.value);
            return (
              collectValue !== JSON.stringify(redLetterOrSunday?.value) &&
              blackLetterCollects
                .filter((blCollect) => Boolean(blCollect))
                .map((blCollect) => JSON.stringify(blCollect.value))
                .reduce((prev: boolean, curr) => prev && curr !== collectValue, true)
            );
          }),
        )
      : null,
    // don't include the octave collect if it's the same as the collect of the day
    observedOctaveCollect =
      octaveCollect && JSON.stringify(octaveCollect.value) !== JSON.stringify(redLetterOrSunday?.value)
        ? octaveCollect
        : null;

  if (redLetterOrSunday || blackLetterCollects.length > 0) {
    if (sundayFirst || date.getDay() === 0) {
      const collects = [
        redLetterCollect || sundayCollect,
        redLetterCollect &&
        sundayRedLetterDaysAlsoIncludeSundayCollect &&
        JSON.stringify(redLetterCollect.value) !== JSON.stringify(sundayCollect?.value) &&
        (date.getDay() === 0 || (date.getDay() == 6 && day.evening))
          ? new LiturgicalDocument({ ...sundayCollect, label: day.week.name })
          : undefined,
        ...blackLetterCollects,
        observedOctaveCollect,
        observedSeasonalCollect,
      ].filter((collect): collect is LiturgicalDocument => !!collect);
      return docsToLiturgy(filterMultiple(day, collects, allowMultiple));
    } else {
      const collects = [
        // Ember Day seasonal collects precede Sunday collects, others follow (Canada)
        emberDayPrecedesSunday && (day.season || '').includes('Ember') ? observedSeasonalCollect : null,
        redLetterCollect,
        ...blackLetterCollects,
        redLetterCollect ? undefined : sundayCollect,
        observedOctaveCollect,
        !emberDayPrecedesSunday || !(day.season || '').includes('Ember') ? observedSeasonalCollect : null,
      ].filter((collect): collect is LiturgicalDocument => !!collect);
      return docsToLiturgy(filterMultiple(day, collects, allowMultiple));
    }
  } else {
    console.warn('(LDF findCollect) Could not find a collect for ', day, 'from the available collects', collects);
    return null;
  }
}

function filterMultiple(
  day: LiturgicalDay,
  collects: LiturgicalDocument[],
  allowMultiple: boolean,
): LiturgicalDocument[] {
  const alreadyPresent: Record<string, boolean> = {};
  let duplicatesRemoved: LiturgicalDocument[] = [];
  collects.forEach((collect) => {
    let json = JSON.stringify(collect);
    if (!alreadyPresent[json]) {
      duplicatesRemoved.push(collect);
    }
    alreadyPresent[json] = true;
  });

  if (allowMultiple) {
    return duplicatesRemoved;
  } else {
    return [
      duplicatesRemoved.find((c) => c.slug === day.holy_day_observed?.slug) ||
        (day.slug !== day.week.slug && collects.find((c) => c.slug === (day.holy_days || [])[0]?.slug)) ||
        collects[0],
    ];
  }
}

export function processCollectText(collect: Text, day: HolyDay): LiturgicalDocument {
  const saintName = (day.name || '').split(/[,;]/)[0],
    oldValue: string[] = collect.value || new Array(),
    value = oldValue.map((piece) => piece.replace(/N\./g, saintName).replace(/[\[\]]/g, ''));
  return new Text({
    ...collect,
    value,
  });
}
