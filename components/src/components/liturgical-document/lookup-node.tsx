import { FunctionalComponent, JSX, h } from "@stencil/core";
import { LiturgicalDocument } from "@venite/ldf";

export type LookupNodeProps = {
  doc: LiturgicalDocument;
  localeStrings: Record<string, string>;
}

const valueOrPreference = (x : string | number | { preference: string }, localeStrings : Record<string, string>) => {
  if(typeof x === 'object') {
    return <span>{localeStrings.definedByPreference} <code>{x.preference}</code></span>
  } else {
    return <code>{x}</code>;
  }
}

export const LookupNode : FunctionalComponent<LookupNodeProps> = ({ doc, localeStrings }) => {
  let desc : JSX.Element;
  switch(doc.lookup?.type) {
    case 'lectionary':
      desc = [
        localeStrings.lectionaryReading,
        valueOrPreference(doc.lookup?.item, localeStrings),
        localeStrings.fromLectionary,
        valueOrPreference(doc.lookup?.table, localeStrings),
        "."
      ];
      break;
    case 'canticle':
      desc = [
        localeStrings[`canticle-${doc.lookup?.item}`],
        localeStrings.fromCanticleTable,
        valueOrPreference(doc.lookup?.table, localeStrings),
        "."
      ];
      break;
    case 'category':
      desc = [
        localeStrings.category,
        doc.category.map(category => <code>{category}</code>),
        doc.lookup?.filter && doc.lookup?.filter == 'seasonal' && localeStrings['filter-seasonal'],
        doc.lookup?.filter && doc.lookup?.filter == 'evening' && localeStrings[`filter-evening-${doc.lookup?.item || true}`],
        doc.lookup?.filter && doc.lookup?.filter == 'day' && localeStrings[`filter-day`],
        doc.lookup?.filter && doc.lookup?.filter == 'day' && <code>{doc.lookup?.item}</code>,
        doc.lookup?.hasOwnProperty('rotate') && localeStrings[`rotate-${doc.lookup?.rotate}`],
        "."
      ];
      break;
    case 'slug':
      desc = [
        localeStrings.slug,
        <code>{doc.slug}</code>,
        doc.lookup?.filter && doc.lookup?.filter == 'seasonal' && localeStrings['filter-seasonal'],
        doc.lookup?.filter && doc.lookup?.filter == 'evening' && localeStrings[`filter-evening-${doc.lookup?.item || true}`],
        doc.lookup?.filter && doc.lookup?.filter == 'day' && localeStrings[`filter-day`],
        doc.lookup?.filter && doc.lookup?.filter == 'day' && <code>{doc.lookup?.item}</code>,
        doc.lookup?.hasOwnProperty('rotate') && localeStrings[`rotate-${doc.lookup?.rotate}`],
        "."
      ];
      break;
    case 'collect':
      desc = <code>{localeStrings.collect}</code>;
      break;
    default:
      desc = JSON.stringify(doc.lookup);
      break;
  }
  return (
    <article class="lookup">{desc}</article>
  )
}