import { LiturgicalDocument } from "https://cdn.skypack.dev/@venite/ldf@^0.20.2";
import { CalendarService } from "./calendar-service.ts";

export class CompileServiceController {
  async compileInDOM(ymd: string, rootEl: HTMLElement) {
    console.log("compiling liturgy found in ", rootEl, "for", ymd);

    // build day from date
    const day = await CalendarService.findDay(ymd, "bcp1979");
    console.log("day = ", day);

    // check days
    rootEl.querySelectorAll(".cp-doc").forEach((cpDoc) => {
      for (const child of Array.from(cpDoc.children)) {
        if (child instanceof HTMLElement) {
          const { ldf } = child.dataset;
          if (ldf) {
            const doc = new LiturgicalDocument(JSON.parse(decodeURI(ldf))),
              include = doc.include(day, {});
            if (!include) {
              console.log("should hide ", child);
              child.classList.add("hidden");
            } else {
              child.classList.remove("hidden");
            }
          }
        }
      }
    });
  }
}
