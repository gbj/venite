import { Injectable, Inject } from '@angular/core';
import { LiturgicalDocument, LiturgicalDay, ClientPreferences, Liturgy, LectionaryEntry, findCollect, dateFromYMDString, filterCanticleTableEntries, docsToLiturgy, docsToOption, HolyDay, BibleReading, Preference } from '@venite/ldf';

import { Observable, of, combineLatest } from 'rxjs';
import { first, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DOCUMENT_SERVICE, DocumentServiceInterface, LECTIONARY_SERVICE, LectionaryServiceInterface, CANTICLE_TABLE_SERVICE, CanticleTableServiceInterface, BIBLE_SERVICE, BibleServiceInterface } from '@venite/ng-service-api';
import { LiturgyConfig } from '@venite/ng-pray/lib/liturgy-config';
import { isCompletelyCompiled } from './is-completely-rendered';

const emptyValue = (doc : LiturgicalDocument) => 
  !Boolean(doc.value) ||
  (Array.isArray(doc.value) &&
    (doc.value.length == 0 ||
      (doc.value.length == 1 && doc.value[0] == "")))

@Injectable({
  providedIn: 'root'
})
export class PrayService {
  public bulletinMode : boolean = false;

  public latestChildren$ : Observable<LiturgicalDocument>[];

  constructor(
    @Inject('liturgyConfig') private config : LiturgyConfig,
    @Inject(DOCUMENT_SERVICE) private documents : DocumentServiceInterface,
    @Inject(LECTIONARY_SERVICE) private lectionaryService : LectionaryServiceInterface,
    @Inject(CANTICLE_TABLE_SERVICE) private canticleTableService : CanticleTableServiceInterface,
    @Inject(BIBLE_SERVICE) private bibleService : BibleServiceInterface
  ) { }

  /** Returns the complete and filtered form for a doc within a particular liturgical context
   * If it should not be included given its day and condition, filter it out
   * If it is incomplete, find its complete form in the database */
  compile(docBase : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, liturgyversions : string[], originalPrefs : Record<string, Preference> | undefined) : Observable<LiturgicalDocument> {
    const doc = new LiturgicalDocument({
      ...docBase,
      // insert the day, for conditions
      day
    });

    // should the doc be included?
    if(doc.include(new LiturgicalDay(day), prefs)) {
      // clear out condition info
      doc.condition = undefined;

      // pass in the `LiturgicalDay` to a `Heading` that needs it
      if(doc.type == 'heading' && (doc.style == 'date' || doc.style == 'day')) {
        doc.day = day;
      }

      // recurse if doc is a `Liturgy` or an `Option` (and therefore contains other, nested docs), 
      if((doc.type == 'liturgy' || doc.type == 'option') && doc.value?.length > 0) {
        this.latestChildren$ = ((docBase as Liturgy)
          .value?.map(child => this.compile(child, day, prefs, liturgyversions.concat(docBase?.metadata?.liturgyversions || []), originalPrefs || doc.metadata?.preferences)));
        return combineLatest(
          // convert each child document in `Liturgy.value` into its own compiled Observable<LiturgicalDocument>
          // and combine them into a single Observable that fires when any of them changes
          // startWith(undefined) so it doesn't need to wait for all of them to load
          this.latestChildren$.map(child$ => child$
            ? child$.pipe(
              startWith(null),
              switchMap(child => child && child?.include(day, prefs) && !isCompletelyCompiled(child) 
                ? this.compile(child, day, prefs, liturgyversions, originalPrefs)
                : of(child))
            )
            : of(null))
        ).pipe(
          // if one of the options in an Option is an Option, take the child Option and spread its values into the parent
          map(compiledChildren => compiledChildren.map(
              child => docBase?.type === 'option' && child?.type === 'option' ? child?.value : [child]
            ).reduce((acc, cur) => acc.concat(cur), [])
          ),
          map(compiledChildren => new LiturgicalDocument({
            ... docBase,
            day,
            value: compiledChildren
          })),
          tap(doc => console.log('latest compiled form is', doc))
        );
      }

      /** Preprocess psalms */
      // insert antiphon if necessary
      // seasonal antiphon
      if(doc.type == 'psalm' && doc.metadata?.insert_seasonal_antiphon) {
        return this.insertAntiphon(doc, day, liturgyversions).pipe(
          switchMap(docWithAntiphon => this.compile(docWithAntiphon, day, prefs, liturgyversions, originalPrefs || doc.metadata?.preferences))
        );
      }
      // antiphon by date => add day to document
      if(doc.type == 'psalm' && doc.metadata?.antiphon && typeof doc.metadata.antiphon == 'object' && !doc.metadata.antiphon.hasOwnProperty('type')) {
        doc.day = day;
      }
      // if psalm with Gloria inserted, condition-check the provided Gloria
      if(doc.metadata?.gloria && !(new LiturgicalDocument(doc.metadata.gloria).include(day, prefs))) {
        doc.metadata.gloria = undefined;
      }

      /** Lookup and return, or simply return */
      // if doc has a `slug` and not a `value` or `lookup`, add `lookup` type of `slug` and recompile
      if(Boolean(doc.slug) && emptyValue(doc) && !Boolean(doc.lookup)) {
        return this.lookup(new LiturgicalDocument({ ...doc, lookup: { type: 'slug' } }), day, prefs, liturgyversions, originalPrefs);
      }
      
      // compile Bible readings if they have no content
      else if(doc.type == 'bible-reading' && Boolean(doc.citation) && emptyValue(doc)) {
        return this.lookupBibleReading(doc, typeof doc.version === 'object' ? prefs[doc.version.preference] : doc.version);
      }

      // if doc has a `lookup` and not a `value`, compile it
      else if(Boolean(doc.lookup) && emptyValue(doc)) {
        return this.lookup(doc, day, prefs, liturgyversions, originalPrefs);
      }

      // otherwise, return it as an `Observable`
      else {
        return of(doc);
      }
    }

    // if we don't want to include it, return null
    else {
      return of(null);
    }
  }

  /** Return the complete form of a doc from the database, depending on what is specified in `lookup` property */
  lookup(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, alternateVersions : string[] = undefined, originalPrefs : Record<string, Preference> | undefined) : Observable<LiturgicalDocument> {
    const language = doc.language || 'en',
          versions : string[] = (alternateVersions?.length > 0 ? [ doc.version , ... alternateVersions ] : [ doc.version ])
                        .filter(version => version !== undefined)
                        .map(version => typeof version === 'object' ? prefs[version.preference] : version);
  
    let result : Observable<LiturgicalDocument | null>;

    switch(doc.lookup.type) {
      case 'lectionary':
        result = doc.type == 'psalm'
          ? this.lookupPsalter(doc, day, prefs, originalPrefs)
          : this.lookupLectionaryReadings(doc, day, prefs, originalPrefs);
        break;
      case 'canticle-table':
      case 'canticle':
        result = this.lookupFromCanticleTable(
          doc,
          day,
          versions,
          prefs,
          typeof doc.lookup.table === 'string' ? doc.lookup.table : prefs[doc.lookup.table.preference],
          Number(doc.lookup.item),
          undefined,
          originalPrefs
        );
        break;
      case 'category':
        result = this.lookupByCategory(
          doc.category || new Array(),
          language,
          versions,
          day,
          doc.lookup.filter,
          Boolean(doc.lookup.rotate),
          Boolean(doc.lookup.random)
        );
        break;
      case 'collect':
        result = this.documents.findDocumentsByCategory(['Collect of the Day'], doc.language || 'en', versions).pipe(
          map(collects => collects.map(collect => {
            const label = (day.holy_days || []).map(day => day.slug).includes(collect.slug)
              ? titleCase(day.holy_days.find(day => day.slug === collect.slug)?.name) || collect.label || "The Collect of the Day"
              : collect.label || "The Collect of the Day";
            return new LiturgicalDocument({ ... collect, label });
          })),
          // filter collects to find the appropriate one
          map(collects => findCollect(
            collects,
            day,
            this.config.sundayCollectsFirst,
            this.config.emberDayCollectPrecedesSunday,
            this.config.allSaintsSuppressesCollectOfTheDayUnlessSunday,
            this.config.allSaintsOctaveSuppressesCollectOfTheDayUnlessSunday
          )),
        )
        break;

      /* for lookup's of the `slug` type, return an Observable of either
       * a) the only document matching the document's language/version, or
       * b) an LDF `Option` consisting of all matches */
      case 'slug':
      default:
        if(doc.slug && doc.type == 'liturgy') {
          result = this.documents.findDocumentsBySlug(doc.slug, language, versions).pipe(
            switchMap(doc => this.compile(docsToOption(doc), day, prefs, versions, originalPrefs))
          );
        } else if(doc.type == 'psalm' && doc.slug?.match(/Psalm \d+/g)) {
          const number = doc.slug.match(/\d+/)[0],
            slug = doc.slug.split(':')[0].replace(' ', '_').toLowerCase();

            result = this.lookupBySlug(
              doc,
              slug,
              language,
              versions,
              day,
              prefs,
              doc.lookup.filter,
              Boolean(doc.lookup.rotate),
              Boolean(doc.lookup.random)
            );
        } else if(doc.slug) {
          result = this.lookupBySlug(
            doc,
            doc.slug,
            language,
            versions,
            day,
            prefs,
            doc.lookup.filter,
            Boolean(doc.lookup.rotate),
            Boolean(doc.lookup.random)
          );
        } else {
          console.warn('the following is not a compilable document\n\n', doc);
          result = of(null);
        }
    }

    // make sure the result we're getting from lookup should be included
    return result.pipe(
      map(doc => doc && new LiturgicalDocument(doc).include(new LiturgicalDay(day), prefs)
        ? new LiturgicalDocument({
          ...doc,
          condition: undefined,
          lookup: undefined
        })
        : null
      )
    );
  }

  /* Look up documents (either single, as options, or rotating) by `slug` or `category` */

  /** Gives either a single `LiturgicalDocument` matching that slug, or (if multiple matches) an `Option` of all the possibilities  */
  lookupBySlug(docBase : LiturgicalDocument, slug : string, language : string, versions : string[], day : LiturgicalDay, prefs : ClientPreferences, filterType : 'seasonal' | 'evening' | 'day', rotate : boolean, random : boolean) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsBySlug(slug, language, versions).pipe(
      // filter seasonally etc.
      map(docs => filterType ? this.filter(filterType, day, docs) : docs),
      // Gloria condition checks
      // run `include` on the Gloria itself
      map(entries => entries.map(entry => (entry?.metadata?.gloria && !(new LiturgicalDocument(entry.metadata.gloria).include(day, prefs)))
        ? new LiturgicalDocument({ ... entry, metadata: { ...entry?.metadata, gloria: undefined }})
        : entry
      )),
      // insert all omit_ preferences from different document types
      map(docs => docs.map(doc => 
        new LiturgicalDocument({
        ...doc,
        metadata: {
          ...doc.metadata,
          omit_antiphon: doc?.metadata?.omit_antiphon || docBase?.metadata?.omit_antiphon,
          // also omit Gloria Patri if `insertGloria` === 'false'
          omit_gloria: (docBase?.style === 'psalm' && Boolean(prefs['insertGloria'] == 'false')) || doc?.metadata?.omit_gloria || docBase?.metadata?.omit_gloria,
          omit_response: doc?.metadata?.omit_response || docBase?.metadata?.omit_response,
          changeable: doc?.metadata?.changeable || docBase?.metadata?.changeable
        }
      })
    )),
      // rotate and merge
      map(docs => rotate ? this.rotate(rotate, random, day, docs) : docs),
      map(docs => docsToOption(docs, versions)),
    );
  }

  /** Gives either a single `LiturgicalDocument` matching that category, or (if multiple matches) an `Option` of all the possibilities  */
  lookupByCategory(category : string[], language : string, versions : string[], day : LiturgicalDay, filterType : 'seasonal' | 'evening' | 'day', rotate : boolean, random : boolean) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsByCategory(category, language, versions).pipe(
      map(docs => this.filter(filterType, day, docs)),
      map(docs => this.rotate(rotate, random, day, docs)),
      map(docs => docsToOption(docs, versions)),
    );
  }

  /** Filters documents depending on whether `doc.category` includes the appropriate `LiturgicalDay.season`, 'Evening', or `LiturgicalDay.slug` */
  filter(filterType : 'seasonal' | 'evening' | 'day', day : LiturgicalDay, docs : LiturgicalDocument[]) : LiturgicalDocument[] {
    switch(filterType) {
      case 'seasonal':
        const filteredByDaySeason = docs.filter(doc => doc.category?.includes(day?.season)),
          filteredByWeekSeason = docs.filter(doc => doc.category?.includes(day?.week?.season));
        return filteredByDaySeason?.length == 0 ? filteredByWeekSeason : filteredByDaySeason;
      case 'evening':
        return docs.filter(doc => doc.category?.includes('Evening'));
      case 'day':
        return docs.filter(doc => doc.category?.includes(day?.slug) || doc.category?.includes(day?.propers));
      default:
        return docs;
    }
  }

  /** If `rotate` is `true`, return one of the docs, rotated through by day; if `false`, return them all */
  rotate(rotate : boolean, random : boolean, day : LiturgicalDay, docs : LiturgicalDocument[]) : LiturgicalDocument | LiturgicalDocument[] {
    if(rotate && !this.bulletinMode) {
      const date = dateFromYMDString(day.date);
      if(random) {
        return this.randomize(date, day.evening, docs);
      } else {
        const diffFromZero = Math.round((date.getTime()-(new Date(0)).getTime())/(1000*60*60*24));
        return docs[diffFromZero % docs.length];
      }
    } else {
      return docs;
    }
  }

  // randomizes by day
  randomize(date : Date, evening : boolean, docs : LiturgicalDocument[]) : LiturgicalDocument | LiturgicalDocument[] {
    if(!this.bulletinMode) {
      const UINT32_MAX = 4294967295;

      const genSeed = (now : number) => {
        const x = now % UINT32_MAX;
        const y = now << now >>> 0 % UINT32_MAX;
        const z = y * 11 % UINT32_MAX;
        const w = x * now % UINT32_MAX;
        return [x,y,z,w];
      }
    
      // Marsaglia, George (July 2003). "Xorshift RNGs". Journal of Statistical Software 8 (14).
      // https://github.com/Risto-Stevcev/pure-random/blob/master/src/pure-random.js
      const xorshift = (seed : number[]) => {
        var x = seed[0], y = seed[1], z = seed[2], w = seed[3];
        var t = x;
        t = (t ^ (t << 11)) >>> 0;
        t = (t ^ (t >>> 8)) >>> 0;
        x = y; y = z; z = w;
        w = (w ^ (w >>> 19)) >>> 0;
        w = (w ^ t) >>> 0;
        return w;
      }
  
      const rand = (seed : number[], min : number, max : number) => Math.floor(min + xorshift(seed) / 4294967295 * (max - min));
  
      const seed = genSeed(Number(`${evening ? 1 : 0}${date.getMonth()}${date.getDate()}${date.getFullYear()}`)),
        index = rand(seed, 0, docs.length);
  
      return docs[index];
    } else {
      return docsToOption(docs);
    }
  }

  /* Look up readings and chosen lectionary preference */
  lookupLectionaryReadings(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, originalPrefs : Record<string, Preference> | undefined) : Observable<LiturgicalDocument> {
    // Bible Translation: defaults to a) whatever's passed in, then b) a hardcoded preference called `bibleVersion`, then c) New Revised Standard Version
    const version : string = typeof doc.version === 'object' ? prefs[doc.version.preference] : doc.version || prefs['bibleVersion'] || 'NRSV';

    return this.findReadings(doc, day, prefs, originalPrefs).pipe(
      // if no entries found, check for holy day readings
      switchMap(entries => entries?.length > 0 
        ? of(entries)
        : this.findReadings(
          doc,
          day,
          {
            ...prefs,
            readingA: HOLY_DAY_READINGS[doc?.day?.evening ? 'evening' : 'morning']['readingA'],
            readingB: HOLY_DAY_READINGS[doc?.day?.evening ? 'evening' : 'morning']['readingB']
          } ,
          originalPrefs)
      ),
      // convert lectionary entries to empty docs
      map(entries => (entries || []).map(entry => (new LiturgicalDocument({
        ... doc,
        citation : entry.citation,
        version,
        language : doc.language || 'en',
        label: doc.label || entry.citation
      })))),
      // bind them into an option and compile it
      map(docs => docsToOption(docs)),
      switchMap(option => this.compile(option, day, prefs, [version], originalPrefs)),
    );
  }

  /** Look up psalms by by `LiturgicalDay` and chosen lectionary preference */
  lookupPsalter(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, originalPrefs : Record<string, Preference> | undefined) : Observable<LiturgicalDocument> {
    // Psalm Translation: defaults to a) whatever's passed in, then b) a hardcoded preference called `psalterVersion`, then c) BCP 1979
    const version : string = typeof doc.version === 'object' ? prefs[doc.version.preference] : doc.version || prefs['psalterVersion'] || 'bcp1979';

    return this.findReadings(doc, day, prefs, originalPrefs).pipe(
      map(entries => (entries || []).map(entry => (new LiturgicalDocument({
        ... doc,
        style: 'psalm',
        slug : entry.citation,
        version,
        language : doc.language || 'en',
        lookup: { type: 'slug' }
      })))),
      // pack these into a `Liturgy` object
      map(docs => new LiturgicalDocument({ ... docsToLiturgy(docs), lookup: undefined })),
      // compile that `Liturgy` object, which will look up each of its `value` children
      // (i.e., each psalm) by its slug
      switchMap(option => this.compile(option, day, prefs, [version], originalPrefs)),
      // sort the psalms by number in increasing order
      map(liturgy => new LiturgicalDocument({
        ... liturgy,
        value: (liturgy?.value || []).sort((a, b) => a?.metadata?.number - b?.metadata?.number)
      })),
    )
  }

  /** Finds lectionary readings, for either Bible readings or psalter */
  findReadings(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, originalPrefs : Record<string, Preference> | undefined) : Observable<LectionaryEntry[]> {
    const lectionary : string = typeof doc.lookup?.table === 'string' ? doc.lookup.table : prefs[doc.lookup.table.preference],
          readingPrefName : string | null = typeof doc.lookup?.item === 'string' || typeof doc.lookup?.item === 'number' ? null : doc.lookup.item.preference,
          reading : string = readingPrefName ? prefs[readingPrefName] : doc.lookup.item.toString(),
          alternateYear = Boolean(((originalPrefs[readingPrefName])?.options || []).find(option => option.value == reading)?.metadata?.alternateYear);
  
    return this.lectionaryService.getReadings(day, lectionary, reading, alternateYear);
  }

  /** Finds the appropriate canticle from a given table for this liturgy */
  lookupFromCanticleTable(doc : LiturgicalDocument, day : LiturgicalDay, versions : string[], prefs : ClientPreferences, whichTable : string, nth : number = 1, fallbackTable : string | undefined, originalPrefs : Record<string, Preference> | undefined) : Observable<LiturgicalDocument> {
    return this.canticleTableService.findEntry(whichTable, nth, fallbackTable).pipe(
      // grab entry for the appropriate weekday
      map(entries => filterCanticleTableEntries(entries, day, whichTable, nth, fallbackTable, DEFAULT_CANTICLES)),
      switchMap(entries => entries.map(entry => new LiturgicalDocument(
        {
          slug: entry.slug,
          lookup: {
            type: 'slug'
          },
          metadata: {
            changeable: doc?.metadata?.changeable
          }
        }
      ))),
      map(docs => docsToOption(docs, versions)),
      switchMap(doc => this.compile(doc, day, prefs, versions, originalPrefs)),
    )
  }

  /** Fetches values for Bible readings */
  lookupBibleReading(doc : LiturgicalDocument, version : string = 'NRSV') : Observable<LiturgicalDocument> {
    return this.bibleService.getText(doc.citation, version).pipe(
      startWith(new BibleReading()),
      map(versionWithText => new LiturgicalDocument({ ... doc, value: versionWithText.value })),
    );
  }

  /** Finds and inserts an appropriate seasonal antiphon */
  insertAntiphon(doc : LiturgicalDocument, day : LiturgicalDay, versions : string[]) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsByCategory(['Seasonal Antiphon'], doc.language || 'en', versions).pipe(
      // filter antiphons to find the appropriate one
      map(antiphons => {
        const antiphonsForDay = antiphons.filter(antiphon => (antiphon?.category || []).includes(day.propers || day.slug));

        /* prepends antiphons for a season that matches an unobserved black-letter day
         * this is specifically used in e.g., the Canadian 1962 book, which has black-letter
         * Marian feasts that call for a certain antiphon, but do not have their own propers
         * and therefore should not be the observed holy day */
        const blackLetterDays = (day.holy_days || []).filter(holyDay => holyDay.type?.rank < 3),
              highestBlackLetter : HolyDay | undefined = blackLetterDays.sort((a, b) => b.type?.rank - a.type?.rank)[0],
              antiphonsForBlackLetterDays = antiphons.filter(antiphon => (antiphon?.category || []).includes(highestBlackLetter?.season));

        if(antiphonsForDay.length == 0) {
          const antiphonsForSeason = antiphons.filter(antiphon => (antiphon?.category || []).includes(day.season || day.week?.season));
          return this.randomize(dateFromYMDString(day.date), day.evening, antiphonsForBlackLetterDays.concat(antiphonsForSeason));
        } else {
          return antiphonsForDay[0];
        }
      }),
      map(antiphon => new LiturgicalDocument({
        ... doc,
        metadata: {
          ... doc.metadata,
          insert_seasonal_antiphon: false,
          antiphon
        }
      }))
    )
  }
}

const DEFAULT_CANTICLES = {
  'evening': [, 'canticle-15', 'canticle-17'],
  'morning': [, 'canticle-21', 'canticle-16']
};

const HOLY_DAY_READINGS = {
  'morning': {
    'readingA': 'holy_day_morning_1',
    'readingB': 'holy_day_morning_2'
  },
  'evening': {
    'readingA': 'holy_day_evening_1',
    'readingB': 'holy_day_evening_2'
  }
}

function titleCase(str : string | undefined) {
  if(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      const firstLetter = word.startsWith('[') ? word[1] : word[0];
      return !['de', 'of', 'the', 'in', 'and', 'with', 'by'].includes(word.trim()) ? word.replace(firstLetter, firstLetter.toUpperCase()) : word;
    }).join(' ');
  } else {
    return null;
  }
}