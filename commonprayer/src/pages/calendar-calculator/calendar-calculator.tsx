import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { Page } from "../../ssg/page.ts";

export enum Psalter {
  DailyOffice = "office",
  ThirtyDay = "30",
}


const CalendarAboutPage = await Page({
  styles: [path.join(path.fromFileUrl(import.meta.url), "..", "calendar-calculator.css")],
  scripts: [path.join(path.fromFileUrl(import.meta.url), "..", "calendar-ui.ts")],
  main: () => <main>
    {/* Controls */}
    <form id="date-controls">
      <input type="date" id="date" aria-label="Date" />
      <label>
        Daily Office Psalter
        {/* TODO pref */}
        <input type="radio" name="psalter" value={Psalter.DailyOffice} checked />
      </label>
      <label>
        30-Day Psalter
        <input type="radio" name="psalter" value={Psalter.ThirtyDay}/>
      </label>
    </form>
    
    {/* Outlet for template */}
    <article id="day-details"></article>

    {/* Tempalte */}
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
      <section class="collect">
        <article id="collect"></article>
      </section>

      <h3>Psalms</h3>
      <section class="psalms">
        <section class="morning">
          <h4>Morning</h4>
          <ul id="morning-psalms">Loading...</ul>
        </section>
        <section class="evening">
          <h4>Evening</h4>
          <ul id="evening-psalms">Loading...</ul>
        </section>
      </section>

      <section class="readings office">
        <h3>Daily Office Readings</h3>
        <ul id="readings">Loading...</ul>
      </section>

      <section class="readings rcl">
        <h3 class="hidden">Revised Common Lectionary Readings</h3>
        <ul id="rcl" class="hidden">Loading...</ul>
      </section>
    </template>
  </main>
});

export default CalendarAboutPage;