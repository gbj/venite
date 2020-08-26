import { LiturgicalDocument } from '../liturgical-document';
import { Liturgy } from '../liturgy/liturgy';

/* Converts a list of documents into a single document including all the documents in serial */
export function docsToLiturgy(docs: LiturgicalDocument[]): LiturgicalDocument {
  const uniqueLabels = docs
    .map((o) => o.label)
    .reduce((uniques, item) => (uniques.includes(item) ? uniques : [...uniques, item]), [] as string[]).length;

  return docs?.length > 1
    ? // if multiple LiturgicalDocuments given, return a Liturgy made up of them
      new Liturgy({
        type: 'liturgy',
        value: docs,
        label: docs[0] ? docs[0].label : undefined,
      })
    : // if only one LiturgicalDocument given, return that document
      docs[0];
}
