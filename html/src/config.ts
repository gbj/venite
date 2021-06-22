import { LiturgicalDocument } from "@venite/ldf";

export type LDFToHTMLConfig = {
  includeLDF: boolean;
  lookupLinks: (doc: LiturgicalDocument) => string;
};
