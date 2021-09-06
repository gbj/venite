import { Lookup, LiturgicalDocument } from "https://cdn.skypack.dev/@venite/ldf@^0.21.0?dts";
import h from "https://cdn.skypack.dev/vhtml@2.2.0";

const LOCALE = {
  "en": {
    "ordinal-1": "1<sup>st</sup>",
    "ordinal-2": "2<sup>nd</sup>",
    "canticle-from": "canticle from the",
    "canticle-table": 'Table of Suggested Canticles.',
    "the": "The",
    "a": "A",
    "reading-from": "reading from the",
    "chosen-lectionary": "chosen lectionary.",
    "daily-office": 'Daily Office lectionary.',
    "daily-office-psalter": 'Daily Office psalter.',
    "30day-psalter": '30-day psalter.',
    "rcl1": 'Revised Common Lectionary (Track One).',
    "rcl2": 'Revised Common Lectionary (Track Two).',
    "appointed-psalms": 'The Psalms appointed for the day.',
    "appointed-readings": "The Readings appointed for the day.",
    "collect": "The Collect of the Day."
  }
}

export const LDF_TO_HTML_CONFIG = {
  includeLDF: false,
  lookupLinks: (doc : LiturgicalDocument) => {
    const locale = LOCALE[doc.language || "en"];

    switch (doc.lookup.type) {
      case "category":{
        const category = doc.category[0],
          version = doc.version,
          slug = category.trim().replace(/\s/g, "-").toLowerCase();
        return (
          <a href={`/${slug}${version ? `/${version}` : ""}`}>{category}</a>
        );
      }
      case "canticle":
        if(doc.lookup.item) {
          const text = [
            locale["the"],
            locale[`ordinal-${doc.lookup.item}`],
            locale['canticle-from'],
            locale['canticle-table']
          ].join(" ");
          return <a href="/canticle-table" dangerouslySetInnerHTML={{__html: text}}></a>;
        } else {
          return <a href="/canticle-table">
            {locale['canticle-table']}
          </a>;
        }
      case "collect":
        return <a href={`/collect-of-the-day${doc.version ? `/${doc.version}` : ''}`}>{locale['collect']}</a>;
      case "lectionary":{
                // message noting the reading number and lectionary
        if(doc.lookup.item && doc.lookup.table) {
          let nth : number;
          if(Number(doc.lookup.item)) {
            nth = Number(doc.lookup.item);
          } else {
            switch((doc.lookup.item as { preference: string; })?.preference) {
              case "readingA":
                nth = 1;
                break;
              case "readingB":
                nth = 2;
                break;
              case "readingC":
                nth = 3;
                break;
              default:
                nth = null;
            }
          }
          if(doc.lookup.item.toString().includes("psalm")) {
            return <a href="/calendar/date">{locale['appointed-psalms']}</a>;
          } else {
            const href = typeof doc.lookup.table === "string" ? `/lectionary/${doc.lookup.table}` : "/lectionary",
              text = [
                nth ? locale['the'] : locale['a'],
                nth ? locale[`ordinal-${nth}`] : "",
                locale["reading-from"],
                typeof doc.lookup.table === "object" ? locale["chosen-lectionary"] : locale[doc.lookup.table]
              ].join(" ");
  
            return <a href={href} dangerouslySetInnerHTML={{__html: text}}></a>;
          }
        }
        // generic pointer to the readings of the day
        else {
          return <a href="/calendar/date">{locale["appointed-readings"]}</a>
        }
     } default:
        return <pre>{JSON.stringify(doc.lookup)}</pre>;
    }
  },
};
