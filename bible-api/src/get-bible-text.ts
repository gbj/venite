import { getNRSV } from "./nrsv";
import { BibleReading } from "@venite/ldf";
import { getESV } from "./esv";
import { getCEB } from "./ceb";
import { getKJV } from "./kjv";

export async function getBibleText(citation : string, version : string) : Promise<BibleReading> {
  switch(version) {
    case 'NRSV':
    case 'nrsv':
      return getNRSV(citation);
    case 'ESV':
    case 'esv':
      return getESV(citation);
    case 'CEB':
    case 'ceb':
      return getCEB(citation);
    case 'KJV':
    case 'kjv':
    case 'AV':
    case 'av':
      return getKJV(citation);
    default:
      throw `${version} is not a supported Bible version. Try 'NRSV', 'ESV', 'KJV', or 'CEB.'`
  }
}