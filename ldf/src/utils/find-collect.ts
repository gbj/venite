import { LiturgicalDocument } from '../liturgical-document';
import { Text } from '../text';
import { LiturgicalDay } from '../calendar/liturgical-day';
import { docsToOption } from './docs-to-option';
import { HolyDay } from '../calendar/holy-day';
import { docsToLiturgy } from './docs-to-liturgy';

const FAKE_SEASONS = ['Saints', 'Mary'];

/** Given a set of all possible collects and a `LiturgicalDay`, returns a `LiturgicalDocument` of the correct collect or sequence of collects */
export function findCollect(
  collects: LiturgicalDocument[],
  day: LiturgicalDay,
  sundayFirst: boolean = true,
): LiturgicalDocument | null {
  const observedDay = day.propers || day.slug,
    redLetterCollects = collects.filter((collect) => collect.slug === observedDay),
    redLetterCollect = redLetterCollects.length > 0 ? docsToOption(redLetterCollects) : null,
    sundaySlug = day.week?.propers || day.week?.slug,
    sundayCollects = collects.filter((collect) => collect.slug === sundaySlug),
    sundayCollect = sundayCollects.length > 0 ? docsToOption(sundayCollects) : null,
    season = !FAKE_SEASONS.includes(day.season) ? day.season : day.week?.season || day.season,
    seasonalCollects = collects.filter((collect) => collect.slug === season),
    seasonalCollect = seasonalCollects.length > 0 ? docsToOption(seasonalCollects) : null,
    blackLetterDays = (day.holy_days || []).filter((feast) => feast.type && feast.type.rank < 3),
    blackLetterCollects = blackLetterDays.map((holyday) =>
      docsToOption(
        (holyday.category || [])
          .map((category) =>
            collects
              .filter((collect) => collect.slug === category)
              .map((collect) => (collect.type === 'text' ? processCollectText(collect as Text, holyday) : collect)),
          )
          .flat(),
      ),
    ),
    redLetterOrSunday = redLetterCollect || sundayCollect,
    // don't include the seasonal collect if it's the same as the Sunday, i.e., on the First Sunday of Advent
    observedSeasonalCollect =
      seasonalCollects && JSON.stringify(seasonalCollect?.value) !== JSON.stringify(redLetterOrSunday?.value)
        ? seasonalCollect
        : null;

  if (redLetterOrSunday || blackLetterCollects.length > 0) {
    if (sundayFirst) {
      const collects = [redLetterCollect || sundayCollect, ...blackLetterCollects, observedSeasonalCollect].filter(
        (collect): collect is LiturgicalDocument => collect !== null,
      );
      return docsToLiturgy(collects);
    } else {
      const collects = [...blackLetterCollects, redLetterCollect || sundayCollect, observedSeasonalCollect].filter(
        (collect): collect is LiturgicalDocument => collect !== null,
      );
      return docsToLiturgy(collects);
    }
  } else {
    console.warn('(LDF findCollect) Could not find a collect for ', day, 'from the available collects', collects);
    return null;
  }
}

export function processCollectText(collect: Text, day: HolyDay): LiturgicalDocument {
  const saintName = (day.name || '').split(',')[0],
    oldValue: string[] = collect.value || new Array(),
    value = oldValue.map((piece) => piece.replace(/N\./g, saintName));
  return new Text({
    ...collect,
    value,
  });
}