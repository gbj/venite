import { ldfToHTML } from "https://cdn.skypack.dev/@venite/html@0.3.10";
import {
  BibleReading,
  CanticleTableEntry,
  ClientPreferences,
  dateFromYMDString,
  docsToLiturgy,
  docsToOption,
  filterCanticleTableEntries,
  findCollect,
  LiturgicalDay,
  LiturgicalDocument,
  Liturgy,
  Preference,
  Psalm,
  versionToString,
} from "https://cdn.skypack.dev/@venite/ldf@^0.20.5?dts";
import { LDF_TO_HTML_CONFIG } from "../ssg/ldf-to-html-config.tsx";
import { CalendarService } from "./calendar-service.ts";
import { CanticleTableService } from "./canticle-table-service.ts";
import { LectionaryService } from "./lectionary-service.ts";

export enum CompileMode {
  Document, // displays whole document without compiling
  Preview, // shows hidden content, greyed out
  Compiled, // shows only the proper content for that day
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/\s/g, "-").replace(/-+/g, "-");
}

export class CompileServiceController {
  bulletinMode = false;

  clear(rootEl: HTMLElement) {
    rootEl.querySelectorAll(".cp-doc").forEach((cpDoc) => {
      for (const child of Array.from(cpDoc.children)) {
        this.show(child);
      }
    });
  }

  async loadDoc(rootEl: HTMLElement): Promise<LiturgicalDocument> {
    const { category, slug } = (
        rootEl.querySelector("[data-slug]") as HTMLElement
      ).dataset,
      resp = await fetch(`/${category}/${slug}.json`),
      data = await resp.json();
    return new LiturgicalDocument(data.data[0]);
  }

  async compileInDOM(ymd: string, rootEl: HTMLElement, mode: CompileMode) {
    const doc = rootEl.dataset.ldf
        ? new LiturgicalDocument(JSON.parse(rootEl.dataset.ldf))
        : await this.loadDoc(rootEl),
      defaultPrefs: Record<string, string> = {};
    if (doc.type === "liturgy" && (doc as Liturgy).metadata?.preferences) {
      for (const [key, pref] of Object.entries(
        doc.metadata.preferences as Record<string, Preference>
      )) {
        const defaultOption =
          pref.options.find((o) => o.default) || pref.options[0];
        defaultPrefs[key] = defaultOption.value;
      }
    }

    // TODO user prefs
    const prefs = defaultPrefs,
      originalPrefs: Record<string, Preference> =
        doc.metadata?.preferences || {};
    console.log("prefs = ", prefs, "\n\noriginalPrefs = ", originalPrefs);

    // build day from date
    const day = await CalendarService.findDay(ymd, "bcp1979");

    // compile each individual document
    rootEl.querySelectorAll(".cp-doc").forEach(async (cpDoc) => {
      for (const child of Array.from(cpDoc.children)) {
        if (child instanceof HTMLElement) {
          const { ldf, compiled } = child.dataset;
          // remove any item that was already compiled from a previous date
          if (compiled === "true") {
            child.remove();
          }
          // run conditions and lookups
          else {
            if (ldf) {
              try {
                const doc = new LiturgicalDocument(JSON.parse(decodeURI(ldf)));

                // first, run any condition checks
                const include = doc.include(day as LiturgicalDay, {});
                if (!include) {
                  this.hide(child, mode);
                } else {
                  this.show(child);
                }

                // next, run any lookups
                const lookupEl = await this.lookup(
                  doc,
                  day as LiturgicalDay,
                  prefs,
                  originalPrefs
                );
                if (lookupEl) {
                  this.replace(child, lookupEl, mode);
                }

                if (doc.lookup) {
                  console.log("lookup", doc, child, lookupEl);
                }

                if (doc.compile_hidden) {
                  this.hide(child, mode);
                }
              } catch (e) {
                console.warn(e, decodeURI(ldf));
              }
            }
          }
        }
      }
    });
  }

  // DOM manipulation methods
  hide(child: Element, mode: CompileMode) {
    if (mode === CompileMode.Preview) {
      child.classList.add("dimmed");
    } else if (mode === CompileMode.Compiled) {
      child.classList.add("hidden");
    }
  }

  show(child: Element) {
    child.classList.remove("dimmed");
    child.classList.remove("hidden");
  }

  replace(child: Element, compiledChild: Element, mode: CompileMode) {
    this.hide(child, mode);
    child.parentNode.insertBefore(compiledChild, child.nextSibling);
  }

  // Lookup methods
  async lookup(
    doc: LiturgicalDocument,
    day: LiturgicalDay,
    prefs: ClientPreferences,
    originalPrefs: Record<string, Preference> | undefined
  ): Promise<Element | null> {
    if (doc.lookup) {
      let resultDocs: LiturgicalDocument[] | null;

      const version = versionToString(doc.version);

      switch (doc.lookup?.type) {
        case "category":
          resultDocs = await this.lookupByCategory(doc.category, version);
          break;
        // TODO lectionary + psalter lookup
        case "lectionary":
          resultDocs = doc.lookup.table
            ? [await this.lookupLectionary(doc, day, prefs, originalPrefs)]
            : [];
          break;
        case "canticle": {
          if (doc.lookup.table) {
            const table =
              typeof doc.lookup.table === "string"
                ? undefined
                : (
                    (originalPrefs[doc.lookup.table.preference] as any)
                      ?.options || []
                  ).find(
                    (item) =>
                      item.value === prefs[doc.lookup.table["preference"]]
                  );

            resultDocs = await this.lookupCanticle(
              day,
              version,
              typeof doc.lookup.table === "string"
                ? doc.lookup.table
                : prefs[doc.lookup.table.preference],
              Number(doc.lookup.item),
              table?.metadata?.fallback
            );
          } else {
            resultDocs = [];
          }
          break;
        }
        case "slug":
          resultDocs = await this.lookupBySlug(doc.slug, version);
          break;
        case "collect": {
          const collects = await this.lookupByCategory(
            ["Collect of the Day"],
            version
          );
          resultDocs = [
            findCollect(
              collects,
              day,
              true,
              false,
              false,
              false,
              Boolean(doc?.lookup?.allow_multiple)
            ),
          ];
          break;
        }
        default:
          return null;
      }

      if (resultDocs) {
        // filter/rotate
        const filteredDoc = this.filterAndRotate(doc, day, resultDocs);

        // create in UI
        const el = document.createElement("article");
        el.classList.add("doc");
        el.dataset.ldf = JSON.stringify(filteredDoc);
        el.dataset.compiled = "true";
        el.innerHTML = ldfToHTML(filteredDoc, LDF_TO_HTML_CONFIG);
        return el;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  filterAndRotate(
    original: LiturgicalDocument,
    day: LiturgicalDay,
    results: LiturgicalDocument[]
  ): LiturgicalDocument {
    let docs: LiturgicalDocument | LiturgicalDocument[] = results;
    if (
      original.lookup.filter ||
      original.lookup.random ||
      original.lookup.rotate
    ) {
      const filtered = original.lookup.filter
          ? this.filter(original.lookup.filter, day, results)
          : results,
        rotated = this.rotate(
          original.lookup.rotate,
          original.lookup.random,
          day,
          filtered
        );
      docs = rotated;
    }

    if (original.lookup.allow_multiple && Array.isArray(docs)) {
      return docsToLiturgy(docs);
    } else if (Array.isArray(docs)) {
      return docsToOption(docs);
    } else {
      return docs;
    }
  }

  filter(
    filterType: "seasonal" | "evening" | "day",
    day: LiturgicalDay,
    docs: LiturgicalDocument[]
  ): LiturgicalDocument[] {
    switch (filterType) {
      case "seasonal": {
        const filteredByDaySeason = docs.filter((doc) =>
            doc.category?.includes(day?.season)
          ),
          filteredByWeekSeason = docs.filter((doc) =>
            doc.category?.includes(day?.week?.season)
          );
        return filteredByDaySeason?.length == 0
          ? filteredByWeekSeason
          : filteredByDaySeason;
      }
      case "evening":
        return docs.filter((doc) => doc.category?.includes("Evening"));
      case "day":
        return docs.filter(
          (doc) =>
            doc.category?.includes(day?.slug) ||
            doc.category?.includes(day?.propers)
        );
      default:
        return docs;
    }
  }

  rotate(
    rotate: boolean,
    random: boolean,
    day: LiturgicalDay,
    docs: LiturgicalDocument[]
  ): LiturgicalDocument | LiturgicalDocument[] {
    if (rotate && !this.bulletinMode) {
      const date = dateFromYMDString(day.date);
      if (random) {
        return this.randomize(date, day.evening, docs);
      } else {
        const diffFromZero = Math.round(
          (date.getTime() - new Date(0).getTime()) / (1000 * 60 * 60 * 24)
        );
        return docs[diffFromZero % docs.length];
      }
    } else {
      return docs;
    }
  }

  randomize(
    date: Date,
    evening: boolean,
    docs: LiturgicalDocument[]
  ): LiturgicalDocument | LiturgicalDocument[] {
    if (!this.bulletinMode) {
      const UINT32_MAX = 4294967295;

      const genSeed = (now: number) => {
        const x = now % UINT32_MAX;
        const y = (now << now) >>> 0 % UINT32_MAX;
        const z = (y * 11) % UINT32_MAX;
        const w = (x * now) % UINT32_MAX;
        return [x, y, z, w];
      };

      // Marsaglia, George (July 2003). "Xorshift RNGs". Journal of Statistical Software 8 (14).
      // https://github.com/Risto-Stevcev/pure-random/blob/master/src/pure-random.js
      const xorshift = (seed: number[]) => {
        var x = seed[0],
          y = seed[1],
          z = seed[2],
          w = seed[3];
        var t = x;
        t = (t ^ (t << 11)) >>> 0;
        t = (t ^ (t >>> 8)) >>> 0;
        x = y;
        y = z;
        z = w;
        w = (w ^ (w >>> 19)) >>> 0;
        w = (w ^ t) >>> 0;
        return w;
      };

      const rand = (seed: number[], min: number, max: number) =>
        Math.floor(min + (xorshift(seed) / 4294967295) * (max - min));

      const seed = genSeed(
          Number(
            `${
              evening ? 1 : 0
            }${date.getMonth()}${date.getDate()}${date.getFullYear()}`
          )
        ),
        index = rand(seed, 0, docs.length);

      return docs[index];
    } else {
      return docsToOption(docs);
    }
  }

  // as the SSG traverses documents while building pages, it stores LDF JSON for a category in an array of documents
  // located at `/CATEGORY/category.json` or `/CATEGORY/VERSION/category.json`
  async lookupByCategory(
    categories: string[] | undefined,
    version: string | undefined
  ): Promise<LiturgicalDocument[] | null> {
    if (categories) {
      const docs = (
        await Promise.all(
          categories.map(async (category) => {
            const resp = await fetch(
                `/${slugify(category)}${
                  version ? `/${version}` : ""
                }/category.json`
              ),
              data: LiturgicalDocument[] = await resp.json();
            return data;
          })
        )
      ).flat();
      return docs;
    } else {
      return null;
    }
  }

  // documents looked up only by slug are located at `/SLUG.json` or `/VERSION/SLUG.json`
  async lookupBySlug(
    slug: string | undefined,
    version: string | undefined
  ): Promise<LiturgicalDocument[] | null> {
    if (slug) {
      const resp = await fetch(
          `/${version ? `${version}/` : ""}${slugify(slug)}.json`
        ),
        data = await resp.json();
      return Array.isArray(data.data)
        ? (data.data as LiturgicalDocument[])
        : ([data] as LiturgicalDocument[]);
    } else {
      return null;
    }
  }

  async lookupCanticle(
    day: LiturgicalDay,
    version: string,
    whichTable: string,
    nth = 1,
    fallbackTable: string | undefined
  ): Promise<LiturgicalDocument[]> {
    const entries = await CanticleTableService.findEntry(
        whichTable,
        nth,
        fallbackTable
      ),
      filtered = filterCanticleTableEntries(
        entries as CanticleTableEntry[],
        day,
        whichTable,
        nth,
        fallbackTable,
        DEFAULT_CANTICLES
      );
    const docs = await Promise.all(
      filtered.map((entry) => this.lookupBySlug(entry.slug, "canticle"))
    );
    return docs.flat();
  }

  async lookupLectionary(
    doc: LiturgicalDocument,
    day: LiturgicalDay,
    prefs: ClientPreferences,
    originalPrefs: Record<string, Preference> | undefined
  ): Promise<LiturgicalDocument> {
    const lectionaryName: string =
        typeof doc.lookup?.table === "string"
          ? doc.lookup.table
          : prefs[doc.lookup.table.preference],
      readingPrefName =
        typeof doc.lookup?.item === "string" ||
        typeof doc.lookup?.item === "number"
          ? null
          : doc.lookup.item.preference,
      reading: string = readingPrefName
        ? prefs[readingPrefName]
        : doc.lookup.item.toString(),
      alternateYear = Boolean(
        (originalPrefs[readingPrefName]?.options || []).find(
          (option) => option.value == reading
        )?.metadata?.alternateYear
      ),
      entries = await LectionaryService.findReading(
        day,
        lectionaryName,
        reading,
        alternateYear
      );
    // look up and sort the documents
    const docs = await Promise.all(
        entries.map((entry) =>
          doc.type === "psalm"
            ? this.lookupPsalm(doc, prefs, entry.citation)
            : this.lookupBibleReading(doc, prefs, entry.citation)
        )
      ),
      sorted = docs.sort((a, b) =>
        a.type === "psalm" &&
        b.type === "psalm" &&
        a?.metadata?.number === b?.metadata?.number &&
        a.value &&
        b.value
          ? Number((a as Psalm).value[0].value[0].number) -
            Number((b as Psalm).value[0].value[0].number)
          : a?.metadata?.number - b?.metadata?.number
      );
    if (doc.metadata?.allow_multiple) {
      return docsToLiturgy(sorted);
    } else {
      return docsToOption(sorted);
    }
  }

  async lookupBibleReading(
    doc: LiturgicalDocument,
    prefs: ClientPreferences,
    citation: string
  ): Promise<LiturgicalDocument> {
    const version =
        typeof doc.version === "object"
          ? prefs[doc.version.preference]
          : doc.version || "NRSV",
      resp = await fetch(
        `https://us-central1-venite-2.cloudfunctions.net/bible?citation=${citation}&version=${version}`
      ),
      data = await resp.json();
    return new BibleReading(data);
  }

  async lookupPsalm(
    doc: LiturgicalDocument,
    prefs: ClientPreferences,
    c: string
  ): Promise<LiturgicalDocument> {
    const version =
      typeof doc.version === "object"
        ? prefs[doc.version.preference]
        : doc.version || prefs["psalterVersion"] || "bcp1979";
    const slug = c.match(/Psalm \d+/g)
      ? c.split(":")[0].replace(" ", "-").toLowerCase()
      : c;
    const resp = await fetch(`/assets/liturgy/psalter/${version}/${slug}.json`),
      { data } = await resp.json();
    return docsToLiturgy(data);
  }
}

const DEFAULT_CANTICLES = {
  evening: [, "canticle-15", "canticle-17"],
  morning: [, "canticle-21", "canticle-16"],
};

const HOLY_DAY_READINGS = {
  morning: {
    readingA: "holy_day_morning_1",
    readingB: "holy_day_morning_2",
  },
  evening: {
    readingA: "holy_day_evening_1",
    readingB: "holy_day_evening_2",
  },
};
