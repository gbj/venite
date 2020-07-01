import { LiturgicalDocument } from "../liturgical-document";
import { Option } from "../option";

/* Converts a list of documents into a single document showing options in parallel */
export function docsToOption(docs : LiturgicalDocument[] | LiturgicalDocument, versions : string[] | undefined = undefined) : LiturgicalDocument {
  if(Array.isArray(docs)) {
    // sort by preferred version
    let sorted : LiturgicalDocument[];
    if(versions !== undefined && versions.length > 0) {
      sorted = docs.sort((a, b) => versions.indexOf(a.version) - versions.indexOf(b.version))
    } else {
      sorted = docs;
    }

    return sorted?.length > 1
      // if multiple LiturgicalDocuments given, return an Option made up of them
      ? new Option({
        'type': 'option',
        metadata: { selected: 0 },
        value: sorted
      })
      // if only one LiturgicalDocument given, return that document 
      : sorted[0];
  } else {
    return docs;
  }
}