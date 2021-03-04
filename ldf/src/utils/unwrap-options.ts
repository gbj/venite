import { LiturgicalDocument } from '../liturgical-document';
import { Liturgy } from '../liturgy/liturgy';
import { Option } from '../option';

export function unwrapOptions(doc: LiturgicalDocument): LiturgicalDocument {
  switch (doc?.type) {
    case 'option':
      const filtered = ((doc as Option).value || []).filter(
        (entry) =>
          Boolean(entry) && (Boolean(entry.value) || Boolean(entry?.type === 'bible-reading' && entry.citation)),
      );
      return unwrapOptions(new LiturgicalDocument(filtered[doc.metadata?.selected ?? 0]));
    case 'liturgy':
      return new Liturgy({
        ...doc,
        value: ((doc as Liturgy).value || []).map((subDoc) => unwrapOptions(subDoc)),
      });
    case 'psalm':
      if (doc?.metadata?.gloria?.type) {
        doc.metadata.gloria = unwrapOptions(doc.metadata.gloria);
      }
      if (doc?.metadata?.antiphon?.type) {
        doc.metadata.antiphon = unwrapOptions(doc.metadata.antiphon);
      }
      return doc;
    default:
      return doc;
  }
}
