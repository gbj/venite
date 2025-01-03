import { getNRSV, getNRSVAE } from "./nrsv";
import { BibleReading } from "@venite/ldf/dist/cjs";
import { getESV } from "./esv";
import { getCEB } from "./ceb";
import { getKJV } from "./kjv";
import { getBibleGateway } from "./bible-gateway";

export async function getBibleText(
  citation: string,
  version: string
): Promise<BibleReading> {
  switch (version) {
    case "NRSV":
    case "nrsv":
      return getBibleGateway(citation, "NRSVA");
    case "NRSVAE":
    case "nrsvae":
      return getBibleGateway(citation, "NRSVA");
    case "ESV":
    case "esv":
      return getESV(citation);
    case "CEB":
    case "ceb":
      return getCEB(citation);
    case "KJV":
    case "kjv":
    case "AV":
    case "av":
      return getBibleGateway(citation, "KJV");
    default:
      return getBibleGateway(citation, version);
    //throw `${version} is not a supported Bible version. Try 'NRSV', 'ESV', 'KJV', or 'CEB.'`;
  }
}
