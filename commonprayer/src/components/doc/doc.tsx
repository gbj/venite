import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { LiturgicalDocument } from "https://cdn.skypack.dev/@venite/ldf@^0.20.5?dts";
import { ldfToHTML } from "https://cdn.skypack.dev/@venite/html@0.3.15";
import { LDF_TO_HTML_CONFIG } from "../../ssg/ldf-to-html-config.tsx";
import { Page } from "../../ssg/page.ts";

function sourceToHTML(source: { url: string; label?: string }) {
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
  main: async (slug : string, subpath : string | undefined, src: string) => {
    const json = await Deno.readTextFile(src),
      data = JSON.parse(json),
      docs = data.data ? data.data : [data];
    return <main>{
      data.source && (Array.isArray(data.source)
          ? `<section class="sources">${data.source
              .map((source) => sourceToHTML(source))
              .join("\n")}</section>`
          : sourceToHTML(data.source))}
    <div class="cp-doc" data-category={subpath} data-slug={slug} dangerouslySetInnerHTML={{__html: docs.map(
      (doc: LiturgicalDocument) => [
        doc.slug ? <a name={doc.slug}></a> : null,
        ldfToHTML(new LiturgicalDocument(doc), LDF_TO_HTML_CONFIG)
    ]).flat().filter(n => Boolean(n)).join("\n")}}></div>
  </main>
  },
});