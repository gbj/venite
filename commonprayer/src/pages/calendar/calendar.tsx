import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import { Page } from "../../ssg/page.ts";
import { CalendarServiceController } from "../../services/calendar-service.ts";

const CalendarService = new CalendarServiceController();

const MONTHS = [
  {name: 'January', days: 31},
  {name: 'February', days: 28},
  {name: 'March', days: 31},
  {name: 'April', days: 30},
  {name: 'May', days: 31},
  {name: 'June', days: 30},
  {name: 'July', days: 31},
  {name: 'August', days: 31},
  {name: 'September', days: 30},
  {name: 'November', days: 30},
  {name: 'October', days: 31},
  {name: 'December', days: 31}
];

const CalendarPage = async (kalendar : string) => (await Page({
  main: async () => {
    const feasts = (await Promise.all(MONTHS.map(async (month, monthIndex) => await Promise.all([...Array(month.days).keys()].map(d => d +1).map(async dd => {
      const mmdd = `${monthIndex+1}/${dd}`,
        feast = await CalendarService.findFeastDays(kalendar, mmdd);
      return { mmdd, feast }
    }))))).flat();

    return <main>
      {MONTHS.map((month, monthIndex) => [
        <h2>{month.name}</h2>,
        <table id={month.name.toLowerCase()}>
          {[...Array(month.days).keys()].map(d => d +1).map(dd => {
            const entry = feasts.find(({ mmdd }) => mmdd === `${monthIndex + 1}/${dd}`),
              name = entry.feast.length > 0 ? entry.feast.filter(f => (f as any).name).map(f => (f as any).name).join("<br>") : undefined;
            return <tr>
              <td>{dd}</td>
              {name && <td dangerouslySetInnerHTML={{__html: name}}></td>}
              {!name && <td></td>}
            </tr>
          })}
        </table>
      ])}
    </main>
  }
}))();

export default CalendarPage;