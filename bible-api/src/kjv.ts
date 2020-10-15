import { BibleReading } from "@venite/ldf/dist/cjs";
import { getOremus } from "./oremus";

export function getKJV(citation : string) : Promise<BibleReading> {
  return getOremus(citation, 'AV');
}