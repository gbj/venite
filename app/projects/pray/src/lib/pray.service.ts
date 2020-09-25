import { Injectable, Inject } from '@angular/core';
import { LiturgicalDocument, LiturgicalDay, ClientPreferences, Liturgy, LectionaryEntry, findCollect, dateFromYMDString, filterCanticleTableEntries, docsToLiturgy, docsToOption, HolyDay } from '@venite/ldf';

import { Observable, of, combineLatest } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { DOCUMENT_SERVICE, DocumentServiceInterface, LECTIONARY_SERVICE, LectionaryServiceInterface, CANTICLE_TABLE_SERVICE, CanticleTableServiceInterface, BIBLE_SERVICE, BibleServiceInterface } from '@venite/ng-service-api';
import { LiturgyConfig } from './liturgy-config';

@Injectable({
  providedIn: 'root'
})
export class PrayService {
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
  compile(docBase : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, liturgyversions : string[] = []) : Observable<LiturgicalDocument> {
    const doc = new LiturgicalDocument({ ... docBase, day });

    // should the doc be included?
    if(doc.include(new LiturgicalDay(day), prefs)) {
      // pass in the `LiturgicalDay` to a `Heading` that needs it
      if(doc.type == 'heading' && (doc.style == 'date' || doc.style == 'day')) {
        doc.day = day;
      }

      // recurse if doc is a `Liturgy` or an `Option` (and therefore contains other, nested docs), 
      if((doc.type == 'liturgy' || doc.type == 'option') && doc.value?.length > 0) {
        this.latestChildren$ = ((docBase as Liturgy)
          .value?.map(child => this.compile(child, day, prefs, docBase?.metadata?.liturgyversions)));
        return combineLatest(
          // convert each child document in `Liturgy.value` into its own compiled Observable<LiturgicalDocument>
          // and combine them into a single Observable that fires when any of them changes
          // startWith(undefined) so it doesn't need to wait for all of them to load
          this.latestChildren$.map(child$ => child$ ? child$.pipe(startWith(undefined)) : of(undefined))
        ).pipe(
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
        return this.insertAntiphon(doc, day).pipe(
          switchMap(docWithAntiphon => this.compile(docWithAntiphon, day, prefs))
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
      if(Boolean(doc.slug) && !Boolean(doc.value) && !Boolean(doc.lookup)) {
        return this.lookup(new LiturgicalDocument({ ...doc, lookup: { type: 'slug' } }), day, prefs, liturgyversions);
      }

      // if doc has a `category` and not a `value` or `lookup`, add `lookup` type of `category` and recompile
      else if(Boolean(doc.category) && !Boolean(doc.value) && !Boolean(doc.lookup)) {
        return this.lookup(new LiturgicalDocument({ ...doc, lookup: { type: 'category' } }), day, prefs, liturgyversions);
      }

      // compile Bible readings if they have no content
      else if(doc.type == 'bible-reading' && Boolean(doc.citation) && (!Boolean(doc.value) || doc.value?.length == 0)) {
        return this.lookupBibleReading(doc, typeof doc.version === 'object' ? prefs[doc.version.preference] : doc.version);
      }

      // if doc has a `lookup` and not a `value`, compile it
      else if(Boolean(doc.lookup) && (!doc.value || doc.value?.length == 0)) {
        return this.lookup(doc, day, prefs, liturgyversions);
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
  lookup(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, alternateVersions : string[] = undefined) : Observable<LiturgicalDocument> {
    const language = doc.language || 'en',
          versions : string[] = (alternateVersions?.length > 0 ? [ doc.version , ... alternateVersions ] : [ doc.version ])
                        .filter(version => version !== undefined)
                        .map(version => typeof version === 'object' ? prefs[version.preference] : version);
  
    let result : Observable<LiturgicalDocument | null>;

    switch(doc.lookup.type) {
      case 'lectionary':
        result = doc.type == 'psalm'
          ? this.lookupPsalter(doc, day, prefs)
          : this.lookupLectionaryReadings(doc, day, prefs);
        break;
      case 'canticle-table':
      case 'canticle':
        result = this.lookupFromCanticleTable(
          day,
          versions,
          prefs,
          typeof doc.lookup.table === 'string' ? doc.lookup.table : prefs[doc.lookup.table.preference],
          Number(doc.lookup.item)
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
        result = this.documents.findDocumentsByCategory(['Collect of the Day'], doc.language || 'en', alternateVersions).pipe(
          // filter collects to find the appropriate one
          map(collects => findCollect(collects, day, this.config.sundayCollectsFirst, this.config.emberDayCollectPrecedesSunday))
        )
        break;

      /* for lookup's of the `slug` type, return an Observable of either
       * a) the only document matching the document's language/version, or
       * b) an LDF `Option` consisting of all matches */
      case 'slug':
      default:
        if(doc.slug && doc.type == 'liturgy') {
          result = this.documents.findDocumentsBySlug(doc.slug, language, versions).pipe(
            switchMap(doc => this.compile(docsToOption(doc), day, prefs, versions))
          );
        } else if(doc.slug) {
          result = this.lookupBySlug(
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
      map(doc => doc && new LiturgicalDocument(doc).include(new LiturgicalDay(day), prefs) ? doc : null)
    );
  }

  /* Look up documents (either single, as options, or rotating) by `slug` or `category` */

  /** Gives either a single `LiturgicalDocument` matching that slug, or (if multiple matches) an `Option` of all the possibilities  */
  lookupBySlug(slug : string, language : string, versions : string[], day : LiturgicalDay, prefs : ClientPreferences, filterType : 'seasonal' | 'evening' | 'day', rotate : boolean, random : boolean) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsBySlug(slug, language, versions).pipe(
      // filter seasonally etc.
      map(docs => filterType ? this.filter(filterType, day, docs) : docs),
      // Gloria condition check
      map(entries => entries.map(entry => (entry?.metadata?.gloria && !(new LiturgicalDocument(entry.metadata.gloria).include(day, prefs)))
        ? new LiturgicalDocument({ ... entry, metadata: { ...entry.metadata, gloria: undefined }})
        : entry
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
    if(rotate) {
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

  randomize(date : Date, evening : boolean, docs : LiturgicalDocument[]) : LiturgicalDocument {
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
  }

  /* Look up readings and chosen lectionary preference */
  lookupLectionaryReadings(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    // Bible Translation: defaults to a) whatever's passed in, then b) a hardcoded preference called `bibleVersion`, then c) New Revised Standard Version
    const version : string = typeof doc.version === 'object' ? prefs[doc.version.preference] : doc.version || prefs['bibleVersion'] || 'NRSV';

    return this.findReadings(doc, day, prefs).pipe(
      map(entries => (entries || []).map(entry => (new LiturgicalDocument({
        ... doc,
        citation : entry.citation,
        version,
        language : doc.language || 'en',
        label: doc.label || entry.citation
      })))),
      map(docs => docsToOption(docs)),
      switchMap(option => this.compile(option, day, prefs))
    );
  }

  /** Look up psalms by by `LiturgicalDay` and chosen lectionary preference */
  lookupPsalter(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    // Psalm Translation: defaults to a) whatever's passed in, then b) a hardcoded preference called `psalterVersion`, then c) BCP 1979
    const version : string = typeof doc.version === 'object' ? prefs[doc.version.preference] : doc.version || prefs['psalterVersion'] || 'bcp1979';

    return this.findReadings(doc, day, prefs).pipe(
      map(entries => (entries || []).map(entry => (new LiturgicalDocument({
        ... doc,
        style: 'psalm',
        slug : entry.citation,
        version,
        language : doc.language || 'en',
        lookup: { type: 'slug' }
      })))),
      // pack these into a `Liturgy` object
      map(docs => Object.assign(doc, { ... docsToLiturgy(docs), lookup: undefined })),
      // compile that `Liturgy` object, which will look up each of its `value` children
      // (i.e., each psalm) by its slug
      switchMap(option => this.compile(option, day, prefs)),
      // sort the psalms by number in increasing order
      map(liturgy => new LiturgicalDocument({
        ... liturgy,
        value: liturgy.value?.sort((a, b) => a.metadata?.number - b.metadata?.number)
      }))
    )
  }

  /** Finds lectionary readings, for either Bible readings or psalter */
  findReadings(doc, day, prefs) : Observable<LectionaryEntry[]> {
    const lectionary : string = typeof doc.lookup.table === 'string' ? doc.lookup.table : prefs[doc.lookup.table.preference],
          reading : string = typeof doc.lookup.item === 'string' || doc.lookup.item === 'number' ? doc.lookup.item.toString() : prefs[doc.lookup.item.preference];

    return this.lectionaryService.getReadings(day, lectionary, reading);
  }

  /** Finds the appropriate canticle from a given table for this liturgy */
  lookupFromCanticleTable(day : LiturgicalDay, versions : string[], prefs : ClientPreferences, whichTable : string, nth : number = 1, fallbackTable : string = undefined) : Observable<LiturgicalDocument> {
    return this.canticleTableService.findEntry(whichTable, nth, fallbackTable).pipe(
      // grab entry for the appropriate weekday
      map(entries => filterCanticleTableEntries(entries, day, whichTable, nth, fallbackTable, DEFAULT_CANTICLES)),
      switchMap(entries => entries.map(entry => new LiturgicalDocument(
        {
          slug: entry.slug,
          lookup: {
            type: 'slug'
          }
        }
      ))),
      map(docs => docsToOption(docs, versions)),
      switchMap(doc => this.compile(doc, day, prefs))
    )
  }

  /** Fetches values for Bible readings */
  lookupBibleReading(doc : LiturgicalDocument, version : string = 'NRSV') : Observable<LiturgicalDocument> {
    return this.bibleService.getText(doc.citation, version).pipe(
      map(versionWithText => new LiturgicalDocument({ ... doc, value: versionWithText.value })),
    );
  }

  /** Finds and inserts an appropriate seasonal antiphon */
  insertAntiphon(doc : LiturgicalDocument, day : LiturgicalDay) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsByCategory(['Seasonal Antiphon'], doc.language || 'en', []).pipe(
      // filter antiphons to find the appropriate one
      map(antiphons => {
        const antiphonsForDay = antiphons.filter(antiphon => antiphon.category.includes(day.propers || day.slug));

        /* prepends antiphons for a season that matches an unobserved black-letter day
         * this is specifically used in e.g., the Canadian 1962 book, which has black-letter
         * Marian feasts that call for a certain antiphon, but do not have their own propers
         * and therefore should not be the observed holy day */
        const blackLetterDays = (day.holy_days || []).filter(holyDay => holyDay.type?.rank < 3),
              highestBlackLetter : HolyDay | undefined = blackLetterDays.sort((a, b) => b.type?.rank - a.type?.rank)[0],
              antiphonsForBlackLetterDays = antiphons.filter(antiphon => antiphon.category.includes(highestBlackLetter?.season));

        if(antiphonsForDay.length == 0) {
          const antiphonsForSeason = antiphons.filter(antiphon => antiphon.category.includes(day.season || day.week?.season));
          return antiphonsForBlackLetterDays.concat(antiphonsForSeason)[0];
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
      })),
      tap(doc => console.log('doc with antiphon', doc))
    )
  }
}

const DEFAULT_CANTICLES = {
  'evening': ['canticle-15', 'canticle-17'],
  'morning': ['canticle-21', 'canticle-17']
};