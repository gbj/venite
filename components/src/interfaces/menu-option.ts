import { JSX } from "@stencil/core";
import { LiturgicalDocument } from "@venite/ldf";

export class MenuOption {
  label: string;
  section: string[];
  icon: () => JSX.Element;
  template?: LiturgicalDocument[];
  hidden?: boolean;
  needsMoreInfo?: 'psalm' | 'canticle' | 'lectionary' | 'hymn' | 'liturgy' | 'liturgy-inline' | 'invitatory' | 'image' | 'category' | 'slug' | 'response' | 'reading';
}