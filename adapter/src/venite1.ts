import { LiturgicalDocument, Heading, Psalm, Citation } from '@venite/ldf';

export function venite1toLDF(old : any, type: string = 'psalm') : LiturgicalDocument {
  switch(type) {
    case 'psalm':
      return psalmToLDF(old);
    default:
      return new LiturgicalDocument();
  }
}

function psalmToLDF(old : any) : Psalm {
  let style = 'psalm';
  const category = [];

  // Psalm/Canticle/Invitatory Types
  if(old.canticle) {
    style = 'canticle';
    category.push({ name: 'Canticle' });
  }
  if(old.invitatory) {
    style = 'invitatory';
    category.push({ name: 'Invitatory' });
  }
  if(!old.canticle && !old.invitatory) {
    category.push({ name: 'Psalm' });
  }

  // Value
  const value = old.value.map((section : any) => {
    if(Array.isArray(section)) {
      return section.map((verse : any) => {
        if(verse.length == 3) {
          return { type: 'psalm-verse', number: verse[0], verse: verse[1], halfverse: verse[2] };
        } else if(verse.length == 2) {
          return { type: 'psalm-verse', verse: verse[0], halfverse: verse[1] };
        } else if(verse.length == 1) {
          return { type: 'psalm-verse', verse: verse[1] };
        }
      });
    } else {
      return new Array(
        new Heading({type: 'heading', metadata: { level: 4 }, value: [section.label]})
      ).concat(
        section.verses.map((verse : any) => ({ type: 'psalm-verse', verse: verse[0], halfverse: verse[1] }))
      );
    }
  });

  const source = sourceStringToCitation(old.source);

  const obj = {
    type: 'psalm' as 'psalm',
    style: style as "psalm" | "canticle" | "invitatory",
    category,
    label: old.label,
    slug: old.slug,
    version_label: old.version_label,
    language: old.language,
    version: old.version,
    citation: old.citation,
    source,
    metadata: {
      number: old.number,
      localname: old.localname,
      latinname: old.latinname,
      omit_antiphon: !!old.omit_antiphon,
      omit_gloria: !!old.omit_gloria
    },
    hidden: !!old.hidden,
    value
  };

  if(source) {
    obj.source = source;
  }

  return new Psalm(obj);
}

function sourceStringToCitation(sourceString : string) : Citation | undefined {
  let source, citation;
  if(sourceString.match(/BCP/)) {
    source = 'bcp1979';
    citation = sourceString.split('BCP')[1].trim()
  }
  if(source && citation) {
    return { api: 'https://www.venite.app/api', source, citation };
  } else {
    return undefined;
  }
}
