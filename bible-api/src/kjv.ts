import { BibleReading } from "@venite/ldf";
import { getOremus } from "./oremus";

export function getKJV(citation : string) : Promise<BibleReading> {
  return getOremus(citation, 'AV');
}