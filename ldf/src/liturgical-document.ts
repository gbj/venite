import { LiturgicalDay } from './calendar/liturgical-day';
import { ResponsivePrayerLine } from './responsive-prayer';
import { BibleReadingVerse } from './bible-reading/bible-reading-verse';
import { Citation } from './citation/citation';
import { PsalmSection } from './psalm';
import { Sharing } from './sharing/sharing';
import { Condition } from './condition';
import { ClientPreferences } from './liturgy/client-preferences';
import { Change } from './editing/change';

const TYPES = ['liturgy', 'cycle', 'heading', 'option', 'refrain', 'rubric', 'text', 'responsive', 'bible-reading', 'psalm', 'meditation'] as const;
type TypeTuple = typeof TYPES;

const LOOKUP_TYPES = ['lectionary', 'canticle-table', 'category', 'slug', 'collect'];
type LookupTypeTuple = typeof LOOKUP_TYPES;

/** Represents a liturgy of any scope and concreteness, from a complete bullletin to a single prayer. */
export class LiturgicalDocument {
  /** If provided from a database, `id` is unique identifier/DB primary key */
  id?: number;

  /** Indicates the type of document */
  type: TypeTuple[number];

  /** An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style. */
  style?: string | null;

  /** Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'. */
  category: string[];

  /** An array of `Conditions`s determining whether the document should be displayed, given its day. */
  condition: {
    mode: 'and' | 'or';
    conditions: Condition[];
  };

  /** The URL (as a string) for the API that provided the document, or against which it can be compiled.
   */
  api?: string;

  /** Permissions for this document: whether it's public, shared with particular individuals, etc. */
  sharing?: Sharing;

  /** Version number of the document */
  lastRevision: number;

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
  version_label?: string | null;

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

  /** Biblical or other citation for the document.
   * @example
   * `John 1:14` */
  citation?: string | null;

  /** Source for the physical resource within which the document can be found
   * @example
   * { source: 'bcp1979', 'citation': 'p. 123' } */
  source?: Citation | null;

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
  metadata?: any;

  /** Marks a document hidden, so it will not display but will not be deleted
   * Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
   * making it easier to restore or toggle on and off */
  hidden: boolean = false;

  /** Instructs the client to look up more information from the server
    * @example
    * // the 1st canticle in the 1979 BCP table for the current `LiturgicalDay`
    * { type: 'psalm', style: 'canticle', lookup: { table: 'bcp1979', item: 1 }}
    * @example
    * // the morning psalms in the 30-day BCP cycle
    * { type: 'psalm', style: 'canticle', lookup: { table: 'bcp_30day_psalter', item: 'morning_psalms' }}
    * @example
    * // the gospel reading in the Revised Common Lectionary
    * { type: 'bible-reading', style: 'long', lookup: { table: 'rcl', item: 'gospel' }} */
  lookup?: {
    type: LookupTypeTuple[number];
    /** Lectionary or canticle table name */
    table?: string | { preference: string; };
    /** Reading type to search
     * To search on slug or category, use the actual `slug` or `category` of this document */
    item?: string | number | { preference: string; };
    /** Filter results based on `LiturgicalDay.season`, `LiturgicalDay.slug`, or `Liturgy.evening` */
    filter?: 'seasonal' | 'evening' | 'day';
    /** If `true`, rotate through the possibilities and gives only one; if `false`, give all as options in random order */
    rotate?: boolean;
  };

  /** The content of the document. */
  value?: LiturgicalDocument[] | ResponsivePrayerLine[] | BibleReadingVerse[] | PsalmSection[] | string[];

  /** Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
   * given the day and assigned preferences  */
  include(day: LiturgicalDay, prefs: ClientPreferences = {}): boolean {
    if (this.condition !== undefined) {
      const evaluatedConditions: boolean[] = this.condition.conditions.map((condition) => {
        if (!(condition instanceof Condition)) {
          condition = new Condition(condition);
        }
        return condition.include(day || this.day, prefs);
      });

      if (this.condition.mode == 'or') {
        return evaluatedConditions.reduce((a, b) => a || b);
      } else {
        return evaluatedConditions.reduce((a, b) => a && b);
      }
    } else {
      return true;
    }
  }

  /** Returns the list of all possible `type` values */
  availableTypes() : ReadonlyArray<string> {
    return TYPES;
  }

  /** Returns the list of all possible `style` values. Child classes should override if they have styles available. */
  availableStyles() : ReadonlyArray<string> {
    return [];
  }

  /** Returns the list of all possible `lookup.type` values */
  availableLookupTypes() : ReadonlyArray<string> {
    return LOOKUP_TYPES;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<LiturgicalDocument> = {}) {
    Object.assign(this, data);
  }
}
