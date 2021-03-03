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
      console.log(
        'unwrapOptions -- option -- selected is ',
        doc.metadata.selected,
        filtered[doc.metadata?.selected ?? 0],
      );
      return unwrapOptions(new LiturgicalDocument(filtered[doc.metadata?.selected ?? 0]));
    case 'liturgy':
      return new Liturgy({
        ...doc,
        value: ((doc as Liturgy).value || []).map((subDoc) => unwrapOptions(subDoc)),
      });
    default:
      return doc;
  }
}
