import { BibleReading } from "@venite/ldf";
import { getOremus } from "./oremus";

export function getNRSV(citation : string) : Promise<BibleReading> {
  return getOremus(citation, 'NRSV');
}