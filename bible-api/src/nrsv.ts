import { BibleReading } from "@venite/ldf/dist/cjs";
import { getOremus } from "./oremus";

export function getNRSV(citation : string) : Promise<BibleReading> {
  return getOremus(citation, 'NRSV');
}