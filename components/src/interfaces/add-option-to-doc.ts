import { LiturgicalDocument } from "@venite/ldf";

export interface AddOptionToDoc {
  base: string;
  index: number;
  obj: LiturgicalDocument;
}
