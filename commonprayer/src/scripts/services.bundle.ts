import { CalendarServiceController } from "../services/calendar-service.ts";
import { CompileServiceController } from "../services/compile-service.ts";
import { LectionaryServiceController } from "../services/lectionary-service.ts";

export const CalendarService = new CalendarServiceController();
export const LectionaryService = new LectionaryServiceController();
export const CompileService = new CompileServiceController();
