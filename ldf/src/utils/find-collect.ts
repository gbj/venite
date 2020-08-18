import { LiturgicalDocument } from '../liturgical-document';
import { Text } from '../text';
import { LiturgicalDay } from '../calendar/liturgical-day';
import { docsToOption } from './docs-to-option';
import { HolyDay } from '../calendar/holy-day';
import { docsToLiturgy } from './docs-to-liturgy';

/** Given a set of all possible collects and a `LiturgicalDay`, returns a `LiturgicalDocument` of the correct collect or sequence of collects */
export function findCollect(
  collects: LiturgicalDocument[],
  day: LiturgicalDay,
  sundayFirst: boolean = true,
): LiturgicalDocument | null {
  const observedDay = day.propers || day.slug,
    redLetterCollects = collects.filter((collect) => collect.slug == observedDay),
    redLetterCollect = redLetterCollects.length > 0 ? docsToOption(redLetterCollects) : null,
    sundaySlug = day.week?.propers || day.week?.slug,
    sundayCollects = collects.filter((collect) => collect.slug == sundaySlug),
    sundayCollect = sundayCollects.length > 0 ? docsToOption(sundayCollects) : null,
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
    redLetterOrSunday = redLetterCollect || sundayCollect;

  if (redLetterOrSunday || blackLetterCollects.length > 0) {
    if (sundayFirst) {
      const collects = new Array(redLetterCollect || sundayCollect || new LiturgicalDocument()).concat(
        blackLetterCollects,
      );
      return docsToLiturgy(collects);
    } else {
      const collects = blackLetterCollects.concat(redLetterCollect || sundayCollect || new LiturgicalDocument());
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
