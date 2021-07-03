//import { LDFToHTMLConfig } from "https://cdn.skypack.dev/@venite/html@0.3.2";
//import { Lookup } from "https://cdn.skypack.dev/@venite/ldf@^0.20.2";
import h from "https://cdn.skypack.dev/vhtml@2.2.0";

export const LDF_TO_HTML_CONFIG = {
  includeLDF: false,
  lookupLinks: (doc) => {
    switch (doc.lookup.type) {
      case "category":
        const category = doc.category[0],
          version = doc.version,
          slug = category.trim().replace(/\s/g, "-").toLowerCase();
        return (
          <a href={`/${slug}${version ? `/${version}` : ""}`}>{category}</a>
        );
      default:
        return <pre>{JSON.stringify(doc.lookup)}</pre>;
    }
  },
};
