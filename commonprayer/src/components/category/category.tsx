import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { LiturgicalDocument } from "https://cdn.skypack.dev/@venite/ldf@^0.21.0?dts";
import { ldfToHTML } from "https://cdn.skypack.dev/@venite/html@0.3.21";
import { LDF_TO_HTML_CONFIG } from "../../ssg/ldf-to-html-config.tsx";
import { Page } from "../../ssg/page.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/exists.ts";
import { VERSION_LABELS } from "../../ssg/version-labels.ts";
import { Mode } from "./mode.ts";

const SHORT_DOC_LENGTH = 1000;

async function buildDocs(srcDir : string, subpath : string, categorySlug : string, children : any[]) {
  const alreadyFound : Set<string> = new Set();

  for await (const { name, isFile, isDirectory } of await Deno.readDir(srcDir)) {
    if (isFile && name.endsWith(".json") && name !== "index.json") {
      const json = await Deno.readTextFile(path.join(srcDir, name)),
        { data, index } = JSON.parse(json),
        docs = data.map((doc) => new LiturgicalDocument(doc));
      for (const doc of docs) {
        const label = doc.label || (doc.category || [])[0],
          key = `${label}-${doc.version}-${JSON.stringify((doc.value || [])[0])}`;

        if(!alreadyFound.has(key)) {
          alreadyFound.add(key);
          const html = ldfToHTML(doc, LDF_TO_HTML_CONFIG);
          children.push({
            index,
            html,
            url: `${subpath ? `/${subpath}/` : '/'}${categorySlug}/${name.replace(".json", "")}${doc.slug && name === "docs.json" ? `#${doc.slug}` : ''}`,
            label,
            version: doc.version,
            ldf: JSON.stringify(doc)
          });
        }
      }
    }
    else if(isDirectory) {
      await buildDocs(path.join(srcDir, name), subpath, `${categorySlug}/${name}`, children);
    }
  }
}

export const Category = await Page({
  scripts: [
    path.join(path.fromFileUrl(import.meta.url), "..", "category-ui.bundle.ts"),
  ],
  styles: [path.join(path.fromFileUrl(import.meta.url), "..", "category.css")],
  main: async (srcDir: string, categorySlug: string, subpath? : string) => {
    const children: { index: number; html: string; ldf: string; version: string; label?: string; url: string; }[] = [];

    let metadata: { label?: string } = {};
    if (await exists(path.join(srcDir, "index.json"))) {
      metadata = JSON.parse(
        await Deno.readTextFile(path.join(srcDir, "index.json"))
      );
    }

    await buildDocs(srcDir, subpath, categorySlug, children);

    const versions = groupBy(
      children.sort((a, b) => a.index - b.index),
      child => child.version
    );

    const labels = groupBy(
      children.sort((a, b) => a.index - b.index),
      child => child.label
    );

    const uniqueLabels = Array.from(new Set(children.map(child => child.label)));

    const mode = children.map(child => child.html.length < SHORT_DOC_LENGTH).reduce((a, b) => a && b, true)
      ? uniqueLabels.length === 1
            // if they're all short and share a label, just show all the documents
      ? Mode.Embedded
      // if the labels are different, show them with labels
      : Mode.Labeled
      // if any of the documents are longer, just give them all as links
      : Mode.Links;

    return (
      <main data-mode={mode}>
        {metadata?.label && <h1>{metadata.label}</h1>}
        <input
          type="search"
          placeholder="Search"
          name="category-filter"
          id="searchbar"
          disabled
          results="5"
          autosave={categorySlug}
        />
        {uniqueLabels.length == 1 && <h2>{uniqueLabels[0]}</h2>}
        <ol class="version-list">
          {Object.entries(versions).map(([version, children]) => <ol class="category-list">
            <li class="version">
              {/* Show version, but only if there's more than one document label; otherwise, use version as document label */}
              {Object.keys(versions).length > 1 && uniqueLabels.length > 1 && <h2>{VERSION_LABELS[version] || version}</h2>}
              {/* Labeled */}
              {mode === Mode.Labeled && Object.entries(labels).map(([label, entries]) => <section>
                <h2 class="label">{label}</h2>
                {entries.map(entry =>
                  <li class="document"
                    data-copyable={entry.html.length < SHORT_DOC_LENGTH ? "true" : "false"}
                    data-ldf={entry.ldf}
                    data-category={label}
                  >
                    <article
                      dangerouslySetInnerHTML={{__html: entry.html}} class="cp-doc"
                    ></article>
                  </li>)}
              </section>)}
              {/* Embedded or links */}
              {mode !== Mode.Labeled && children
                .map((child) => (
                  <li class="document" data-copyable={child.html.length < SHORT_DOC_LENGTH ? "true" : "false"} data-ldf={child.ldf}>
                    {/* Embedded */}
                    {mode === Mode.Embedded && <article
                        dangerouslySetInnerHTML={{ __html: child.html }}
                        class="cp-doc"
                    ></article>}

                    {/* Links */}
                    {mode === Mode.Links && <a href={child.url}>{uniqueLabels.length > 1 ? child.label : VERSION_LABELS[version] || version}</a>}
                  </li>
                ))}
            </li>
          </ol>)}
        </ol>
      </main>
    );
  },
});


function groupBy<T>(xs : T[], groupFn: (t : T) => string) : Record<string, T[]> {
  return xs.reduce((acc : Record<string, T[]>, curr : T) => {
    const group = groupFn(curr);
    if(!acc[group]) {
      acc[group] = [curr];
    } else {
      acc[group].push(curr);
    }
    
    return acc; 
  }, {});
};