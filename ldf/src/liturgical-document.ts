import { LiturgicalDay } from './calendar/liturgical-day';
import { ResponsivePrayerLine } from './responsive-prayer';
import { BibleReadingVerse } from './bible-reading/bible-reading';
import { Citation } from './citation/citation';
import { PsalmVerse } from './psalm';
import { Heading } from './heading';
import { Sharing } from './sharing/sharing';
import { Category } from './category';
import { Condition } from './condition';
import { ClientPreferences } from './liturgy/client-preferences';

/** Represents a liturgy of any scope and concreteness, from a complete bullletin to a single prayer. */
export class LiturgicalDocument {
  /** If provided from a database, `id` is unique identifier/DB primary key */
  id?: number;

  /** Indicates the type of document */
  type: 'liturgy' | 'heading' | 'option' | 'refrain' | 'rubric' | 'text' | 'responsive' | 'bible-reading' | 'psalm';

  /** An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style. */
  style?: string;

  /** Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'. */
  category: Category[];

  /** An array of `Conditions`s determining whether the document should be displayed, given its day. */
  condition: {
    mode: 'and' | 'or';
    conditions: Condition[];
  };

  /** The URL (as a string) for the API that provided the document, or against which it can be compiled.
   */
  api: string;

  /** Permissions for this document: whether it's public, shared with particular individuals, etc. */
  sharing?: Sharing;

  /** An identifying slug. Given the `slug`, the API should be able to identify this document.
   * @example
   * `'morning_prayer'`, `'lords_prayer'`
   */
  slug: string;

  /** A human-readable name; either the name of the whole liturgy, or a label for a piece.
   * @example
   * `'Morning Prayer'`, `'The Apostles’ Creed'`
   */
  label: string;

  /** Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.
   * @example
   * `'Lord’s Prayer (Traditional)'`
   */
  version_label?: string;

  /** Language code (typically an ISO 639-1 two-letter code)
   * @example
   * `'en'`
   */
  language: string;

  /** Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.
   * @example
   * `'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`
   */
  version: string;

  /** Source for the document, either as a string or a `Citation` object.
   * @example
   * `John 1:14`, { source: 'bcp1979', 'citation': 'p. 123' }
   */
  citation?: string | Citation;

  /** Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.
   * @example
   * `'gloria_patri_0'`, `'gloria_patri_1'`
   */
  uid?: string;

  /** Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
   * {@link LiturgicalDay}
   */
  day?: LiturgicalDay;

  /** Optional: Child classes can store any additional properties they need within the `metadata` object.
   * @example
   * { response: 'Thanks be to God.' }
   */
  metadata? : any;

  /** Marks a document hidden, so it will not display but will not be deleted
    * Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
    * making it easier to restore or toggle on and off */
  hidden : boolean = false;

  /** The content of the document. */
  value: LiturgicalDocument[] | ResponsivePrayerLine[] | BibleReadingVerse[] | (PsalmVerse | Heading)[][] | string[];

  /** Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
    * given the day and assigned preferences  */
  include(day : LiturgicalDay, prefs : ClientPreferences = {}) : boolean {
    if(this.condition !== undefined) {
      const evaluatedConditions : boolean[] = this.condition.conditions.map(condition => {
        if(!(condition instanceof Condition)) {
          condition = new Condition(condition);
        }
        return condition.include(day || this.day, prefs);
      });

      if(this.condition.mode == 'or') {
        return evaluatedConditions.reduce((a, b) => a || b);
      } else {
        return evaluatedConditions.reduce((a, b) => a && b);
      }
    } else {
      return true;
    }
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<LiturgicalDocument> = {}) {
    Object.assign(this, data);
  }
}
