import { LiturgicalDocument } from "../liturgical-document";
import { Liturgy } from "../liturgy/liturgy";

/* Converts a list of documents into a single document including all the documents in serial */
export function docsToLiturgy(docs : LiturgicalDocument[]) : LiturgicalDocument {
  return docs?.length > 1
    // if multiple LiturgicalDocuments given, return a Liturgy made up of them
    ? new Liturgy({
      'type': 'liturgy',
      value: docs
    })
    // if only one LiturgicalDocument given, return that document 
    : docs[0];
}