import h from "https://cdn.pika.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { LiturgicalDocument } from "https://cdn.pika.dev/@venite/ldf@^0.19.5";
import { ldfToHTML } from "https://cdn.pika.dev/@venite/html@0.2.4";
import { LDF_TO_HTML_CONFIG } from "../../ssg/ldf-to-html-config.tsx";
import { Page } from "../../ssg/page.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/exists.ts";

export const Category = await Page({
  scripts: [path.join(path.fromFileUrl(import.meta.url), "..", "category-ui.ts")],
  styles: [path.join(path.fromFileUrl(import.meta.url), "..", "category.css")],
  main: async (srcDir : string, categorySlug : string) => {
    const children : { index: number; html: string; label?: string; }[] = [];
  
    let metadata : {label?: string;} = {};
    if(await exists(path.join(srcDir, "index.json"))) {
      metadata = JSON.parse(await Deno.readTextFile(path.join(srcDir, "index.json")));
    }

    for await(const { name, isFile } of await Deno.readDir(srcDir)) {
      if(isFile && name.endsWith(".json") && name !== "index.json") {
        const json = await Deno.readTextFile(path.join(srcDir, name)),
          { data, index } = JSON.parse(json),
          docs = data.map(doc => new LiturgicalDocument(doc)),
          html = docs.map(doc => ldfToHTML(doc, LDF_TO_HTML_CONFIG)).join("\n\n");
        children.push({index, html, label: docs[0]?.label });
      }
    }

    return <main>
      {metadata?.label && <h1>{metadata.label}</h1>}
      <input type="search"
        placeholder="Search"
        name="category-filter"
        id="searchbar"
        disabled
        results="5"
        autosave={categorySlug}
      />
      <ol id="category-list">
        {
          children
            .sort((a, b) => a.index - b.index)
            .map(child => <li>
              <details>
                {child.label && <summary>{child.label}</summary>}
                <article dangerouslySetInnerHTML={{__html: child.html}}></article>
              </details>
            </li>)
        }
      </ol>
    </main>;
  }
});