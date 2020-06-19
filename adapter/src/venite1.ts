import {
  LiturgicalDocument, BibleReading, Psalm, Citation, Text,
  ResponsivePrayerLine, BibleReadingVerse, PsalmVerse, Sharing
} from '@venite/ldf';

export function venite1toLDF(old : any, type: string) : LiturgicalDocument | undefined {
  switch(type) {
    case 'psalm':
      return psalmToLDF(old);
    case 'collect':
      return collectToLDF(old);
    case 'reading':
      return readingToLDF(old);
    default:
      return new LiturgicalDocument();
  }
}

function psalmToLDF(old : any) : Psalm {
  let style = 'psalm';
  const category : string[] = [];

  // Psalm/Canticle/Invitatory Types
  if(old.canticle) {
    style = 'canticle';
    category.push('Canticle');
  }
  if(old.invitatory) {
    style = 'invitatory';
    category.push('Invitatory');
  }
  if(!old.canticle && !old.invitatory) {
    category.push('Psalm');
  }

  // Value
  const value = old.value.map((section : any) => {
    if(Array.isArray(section)) {
      let sectionVerses : PsalmVerse[] = section.map((verse : any) => {
        if(verse.length == 3) {
          return { type: 'psalm-verse', number: verse[0], verse: verse[1], halfverse: verse[2] };
        } else if(verse.length == 2) {
          return { type: 'psalm-verse', verse: verse[0], halfverse: verse[1] };
        } else {
          return { type: 'psalm-verse', verse: verse[1] };
        }
      });
      return { type: 'psalm-section', value: sectionVerses }
    } else {
      return {
        type: 'psalm-section',
        label: section.label,
        value: section.verses.map((verse : any) => ({ type: 'psalm-verse', verse: verse[0], halfverse: verse[1] }))
      }
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

function collectToLDF(old : { slug: string; language: string; version: string; value: string[] }) : Text {
  return new Text({
    type: 'text',
    style: 'prayer',
    slug: old.slug,
    category: ['Collect', 'Collect of the Day'],
    language: old.language,
    version: old.version,
    value: old.value,
    metadata: {
      response: 'Amen.',
      omit_response: false
    }
  })
}

function readingToLDF(old: {
  citation: string;
  label: string;
  language: string;
  version: string;
  value: string[];
  verses: { book: string; chapter: string; verse: string; text: string; }[][]
}) : BibleReading | undefined {
  if(old.verses && old.verses.flat().length > 0) {
    return new BibleReading({
      type: 'bible-reading',
      style: 'long',
      language: old.language || 'en',
      version: old.version || 'NRSV',
      citation: old.citation,
      slug: `${old.citation} (${old.language}-${old.version})`,
      label: old.label,
      value: old.verses.flat()
    });
  } else {
    return undefined;
  }
}

interface Prayer {
  slug : string;
  category : string;
  type : string;
  language : string;
  version : string;
  label : string;
  version_label : string;
  citation : string;
  value : any;
  response: string;
  source : string;
}

function prayerToLDF(old: Prayer) : LiturgicalDocument {
  const { type, style } = generateTypeAndStyle(old);

  return new LiturgicalDocument({
    type,
    style,
    slug: old.slug,
    category: new Array(old.category),
    language: old.language,
    version: old.version,
    citation: old.citation,
    source: sourceStringToCitation(old.source),
    label: old.label,
    version_label: old.version_label,
    metadata: generateMetadata(old),
    value: generateValue(old)
  });
}

function sourceStringToCitation(sourceString : string) : Citation | undefined {
  let source, citation;
  if(sourceString?.match(/BCP/)) {
    source = 'bcp1979';
    citation = sourceString.split('BCP')[1].trim()
  }
  if(source && citation) {
    return { api: 'https://www.venite.app/api', source, citation };
  } else {
    return undefined;
  }
}

function generateTypeAndStyle(old : Prayer) : { type: "psalm" | "liturgy" | "cycle" | "heading" | "option" | "refrain" | "rubric" | "text" | "responsive" | "bible-reading" | "meditation"; style?: string; } {
  switch(old.type) {
    case 'text':
      return { type: 'text', style: 'text' };
    case 'collect':
      return { type: 'text', style: 'prayer' };
    case 'preces':
    case 'litany':
    case 'responsive':
      const isPreces = old.value[0].hasOwnProperty('label'),
            isLitany = !!old.response || Array.isArray(old.value[0]),
            ts = { type: 'responsive' as 'responsive', style: 'responsive' };
      if(isPreces) {
        ts.style = 'preces';
      }
      if(isLitany) {
        ts.style = 'litany';
      }
      return ts;
    case 'rubric':
      return { type: 'rubric' };
    case 'scripture':
      return { type: 'bible-reading', style: 'short' };
    case 'gloria':
      return { type: 'refrain', style: 'gloria' };
    case 'antiphon':
      return { type: 'refrain', style: 'antiphon' };
    default:
      console.warn('\n\n*** (generateTypeAndStyle) Type Not Recognized ***\n\n', old, '\n\n*** Type Not Recognized ***\n\n');
      return { type: 'text', style: 'text' };
  }
}

function generateMetadata(old : Prayer) : any {
  switch(old.type) {
    case 'rubric':
      return undefined;
    case 'text':
    case 'scripture':
      return ({ response: old.response, omit_response: !old.response });
    case 'collect':
      return ({ response: old.response, omit_response: false });
    case 'preces':
    case 'litany':
    case 'responsive':
      return { response: old.response }
    case 'gloria':
    case 'antiphon':
      return undefined;
    default:
      console.warn('\n\n*** (generateMetadata) Type Not Recognized ***\n\n', old, '\n\n*** Type Not Recognized ***\n\n');
  }
}

function generateValue(old : Prayer) : LiturgicalDocument[] | ResponsivePrayerLine[] | BibleReadingVerse[] | string[]{
  switch(old.type) {
    case 'text':
    case 'collect':
    case 'rubric':
    case 'gloria':
    case 'antiphon':
      return old.value;
    case 'preces':
      return precesValue(old);
    case 'litany':
      return litanyValue(old);
    case 'responsive':
      const isPreces = old.value[0].hasOwnProperty('label'),
            isLitany = !!old.response || Array.isArray(old.value[0]);
      if(isPreces) {
        return precesValue(old);
      }
      if(isLitany) {
        return litanyValue(old);
      }
    case 'psalm':
      // TODO?
    case 'scripture':
      return old.value.map((text : string) => ({ text }));
    default:
      console.warn('\n\n*** (generateTypeAndStyle) Type Not Recognized ***\n\n', old, '\n\n*** Type Not Recognized ***\n\n');
      return [];
  }
}

function precesValue(old : Prayer) : ResponsivePrayerLine[] {
  return old.value.map((line : { label: string; text: string;}) => ({ label: line.label, text: line.text}));
}

function litanyValue(old : Prayer) : ResponsivePrayerLine[] {
  return old.value.map((line: string[]) => {
    let optional = false;
    if(line.length == 2 && line[0]?.match(/^\[/) && line[1]?.match(/\]$/)) {
      line[0] = line[0].replace('[', '');
      line[1] = line[1].replace(']', '');
      optional = true;
    }
    if(line.length == 1 && old.response && line[0]?.match(/^\[/) && line[0]?.match(/\]$/)) {
      line[0] = line[0].replace(/[\[\]]/g, '');
      optional = true;
    }
    return { text: line[0], response: line[1], optional };
  });
}
