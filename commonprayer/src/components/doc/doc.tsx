import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { LiturgicalDocument } from "https://cdn.skypack.dev/@venite/ldf@^0.21.0?dts";
import { ldfToHTML } from "https://cdn.skypack.dev/@venite/html@0.3.30";
import { LDF_TO_HTML_CONFIG } from "../../ssg/ldf-to-html-config.tsx";
import { Page } from "../../ssg/page.ts";

export function sourceToHTML(source: { url: string; label?: string }) {
  return <a class="source" href={source?.url} target="_blank">
    <span class="label">Source</span>
    {source.label || "Source"}
  </a>;
}

export const Doc = await Page({
  scripts: [
    path.join(path.fromFileUrl(import.meta.url), "..", "doc-ui.ts"),
  ],
  styles: [
    path.join(path.fromFileUrl(import.meta.url), "..", "doc.css"),
  ],
  main: async (slug : string, subpath : string | undefined, src?: string, doc?: LiturgicalDocument) => {
    let data;
    if(src) {
      const json = await Deno.readTextFile(src);
      data = JSON.parse(json);
    }
    else if(doc) {
      data = doc;
    }
    const docs = [];
     
    if(data.data) {
      const dataDocs : LiturgicalDocument[] = data.data;
      // deduplicate by value
      const alreadySeen = new Set();
      for(const doc of dataDocs) {
        const key = JSON.stringify(doc.value);
        if(!alreadySeen.has(key)) {
          alreadySeen.add(key);
          docs.push(doc);
        }
      }
    }
    // if a single doc, push it into the docs
    else {
      docs.push(data);
    }
        
    const sources = data.source
      ? Array.isArray(data.source)
        ? data.source.map((source) => sourceToHTML(source))
        : sourceToHTML(data.source)
      : "";

    return <main>
      <section class="sources" dangerouslySetInnerHTML={{__html: sources }}></section>
      <div class="cp-doc" data-category={subpath} data-slug={slug} dangerouslySetInnerHTML={{__html: docs.map(
        (doc: LiturgicalDocument) => [
          doc.slug ? <a name={doc.slug}></a> : null,
          ldfToHTML(new LiturgicalDocument(doc), LDF_TO_HTML_CONFIG)
      ]).flat().filter(n => Boolean(n)).join("\n")}}></div>
    </main>
  },
});