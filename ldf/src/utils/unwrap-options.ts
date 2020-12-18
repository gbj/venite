import { LiturgicalDocument } from '../liturgical-document';
import { Liturgy } from '../liturgy/liturgy';
import { Option } from '../option';

export function unwrapOptions(doc: LiturgicalDocument): LiturgicalDocument {
  switch (doc?.type) {
    case 'option':
      //console.log('unwrapOptions -- option -- selected is ', doc.metadata.selected, doc.metadata);
      const selectedDoc = (doc as Option).value[doc.metadata?.selected || 0];
      return unwrapOptions(new LiturgicalDocument(selectedDoc));
    case 'liturgy':
      return new Liturgy({
        ...doc,
        value: ((doc as Liturgy).value || []).map((subDoc) => unwrapOptions(subDoc)),
      });
    default:
      return doc;
  }
}
