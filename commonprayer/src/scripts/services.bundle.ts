import { LiturgicalDocument } from "https://cdn.skypack.dev/@venite/ldf@^0.21.0?dts";

import { CalendarServiceController } from "../services/calendar-service.ts";
import { CompileServiceController } from "../services/compile-service.ts";
import { LectionaryServiceController } from "../services/lectionary-service.ts";

export const CalendarService = new CalendarServiceController();
export const LectionaryService = new LectionaryServiceController();
export const CompileService = new CompileServiceController();

import { ldfToHTML } from "https://cdn.skypack.dev/@venite/html@0.3.19";
import { LDF_TO_HTML_CONFIG } from "../ssg/ldf-to-html-config.tsx";

export function docToHTML(doc: LiturgicalDocument): string {
  return ldfToHTML(doc, LDF_TO_HTML_CONFIG);
}

export { CompileMode } from "../services/compile-service.ts";
