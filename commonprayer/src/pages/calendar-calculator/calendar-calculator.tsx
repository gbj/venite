import h from "https://cdn.pika.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { Page } from "../../ssg/page.ts";


const CalendarAboutPage = await Page({
  styles: [path.join(path.fromFileUrl(import.meta.url), "..", "calendar-calculator.css")],
  scripts: [path.join(path.fromFileUrl(import.meta.url), "..", "..", "calendar", "calendar-service.ts"), path.join(path.fromFileUrl(import.meta.url), "..", "calendar-ui.ts")],
  main: () => <main>
    <input type="date" id="date"/>
    <article id="day-details"></article>
    <details class="disclaimer">
      <summary>Disclaimer</summary>
      <p>
        This page does its best to calculate the correct liturgical day for any given date. 
        It will occasionally contain slight inaccuracies. The Episcopal Church’s <a href="/calendar/about">calendar</a> also
        includes relatively complex and at-times ambiguous rules, particularly for when a feast should be observed
        as opposed to being transferred to another day, and coexist with local traditions.
      </p>
      <p>In other words, take this is a helpful tool and not an authoritative source for the correct observance for any given day.</p>
    </details>
    <template id="day-details-template">
      <h1></h1>
      <h2></h2>
      <article id="collect"></article>
      <ul id="readings"></ul>
    </template>
  </main>
});

export default CalendarAboutPage;