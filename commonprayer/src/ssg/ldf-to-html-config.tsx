//import { LDFToHTMLConfig } from "https://cdn.pika.dev/@venite/html@0.2.4";
//import { Lookup } from "https://cdn.pika.dev/@venite/ldf@^0.19.5";
import { LiturgicalDocument } from "https://cdn.pika.dev/@venite/ldf@^0.19.5";
import h from "https://cdn.pika.dev/vhtml@2.2.0";

export const LDF_TO_HTML_CONFIG = {
  includeLDF: false,
  lookupLinks: (doc) => {
    switch(doc.lookup.type) {
      case "category":
        const category = doc.category[0],
          version = doc.version,
          slug = category.trim().replace(/\s/g, '-').toLowerCase();
        return <a href={`/${slug}${version ? `/${version}` : ''}`}>{category}</a>;
      default:
        return <pre>{JSON.stringify(doc.lookup)}</pre>
    }
  }
};
