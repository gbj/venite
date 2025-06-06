import { ClientPreferences, LiturgicalDay, LiturgicalDocument } from "@venite/ldf";

export type BulletinCommands = {
  commands: string[];
  state:{
    liturgy: LiturgicalDocument;
    day: LiturgicalDay;
    prefs: ClientPreferences;
  }
}