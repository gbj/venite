import { ldfToHTML } from "https://cdn.skypack.dev/@venite/html@0.3.2";
import {
  dateFromYMDString,
  docsToLiturgy,
  docsToOption,
  LiturgicalDay,
  LiturgicalDocument,
  versionToString,
} from "https://cdn.skypack.dev/@venite/ldf@^0.20.2?dts";
import { LDF_TO_HTML_CONFIG } from "../ssg/ldf-to-html-config.tsx";
import { CalendarService } from "./calendar-service.ts";

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

  async compileInDOM(ymd: string, rootEl: HTMLElement, mode: CompileMode) {
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
              const doc = new LiturgicalDocument(JSON.parse(decodeURI(ldf)));

              // first, run any condition checks
              const include = doc.include(day as LiturgicalDay, {});
              if (!include) {
                this.hide(child, mode);
              } else {
                this.show(child);
              }

              // next, run any lookups
              const lookupEl = await this.lookup(doc, day as LiturgicalDay);
              if (lookupEl) {
                this.replace(child, lookupEl, mode);
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
    day: LiturgicalDay
  ): Promise<Element | null> {
    if (doc.lookup) {
      let resultDocs: LiturgicalDocument[] | null;

      switch (doc.lookup?.type) {
        case "category":
          resultDocs = await this.lookupByCategory(
            doc.category,
            versionToString(doc.version)
          );
          break;
        case "lectionary":
        case "canticle":
        case "slug":
        case "collect":
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
      case "seasonal":
        const filteredByDaySeason = docs.filter((doc) =>
            doc.category?.includes(day?.season)
          ),
          filteredByWeekSeason = docs.filter((doc) =>
            doc.category?.includes(day?.week?.season)
          );
        return filteredByDaySeason?.length == 0
          ? filteredByWeekSeason
          : filteredByDaySeason;
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
}
