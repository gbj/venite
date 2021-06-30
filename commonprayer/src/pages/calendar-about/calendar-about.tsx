import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { Page } from "../../ssg/page.ts";

const CalendarAboutPage = await Page({
  styles: [path.join(path.fromFileUrl(import.meta.url), "..", "calendar-about.css")],
  main: () => <main>
    <h1>The Calendar of the Church Year</h1>

    <p>The Church Year consists of two cycles of feasts and holy days: one is dependent upon the movable date of the Sunday of the Resurrection or Easter Day; the other, upon the fixed date of December 25, the Feast of
    our Lord’s Nativity or Christmas Day.</p>

    <p>Easter Day is always the first Sunday after the full moon that falls on or
    after March 21. It cannot occur before March 22 or after April 25.</p>

    <p>The sequence of all Sundays of the Church Year depends upon the date of
    Easter Day. But the Sundays of Advent are always the four Sundays
    before Christmas Day, whether it occurs on a Sunday or a weekday. The
    date of Easter also determines the beginning of Lent on Ash Wednesday,
    and the feast of the Ascension on a Thursday forty days after Easter Day.</p>

    <h2>1. Principal Feasts</h2>

    <p>The Principal Feasts observed in this Church are the following:</p>

    <ol class="calendar-feast-list">
      <li>Easter Day</li>
      <li>Ascension Day</li>
      <li>The Day of Pentecost</li>
      <li>Trinity Sunday</li>
      <li>All Saints’ Day, <em>November 1</em></li>
      <li>Christmas Day, <em>December 25</em></li>
      <li>The Epiphany, <em>January 6</em></li>
    </ol>

    <p>These feasts take precedence of any other day or observance.  All Saints’
    Day may always be observed on the Sunday following November 1, in
    addition to its observance on the fixed date.</p>

    <h2>2. Sundays</h2>

    <p>All Sundays of the year are feasts of our Lord Jesus Christ. In addition to
    the dated days listed above, only the following feasts, appointed on fixed
    days, take precedence of a Sunday:</p>

    <ol class="calendar-feast-list">
      <li>The Holy Name</li>
      <li>The Presentation</li>
      <li>The Transfiguration</li>
    </ol>

    <p>
      The feast of the Dedication of a Church, and the feast of its patron or
      title, may be observed on, or be transferred to, a Sunday, except in the
      seasons of Advent, Lent, and Easter.
    </p>

    <p>
      All other Feasts of our Lord, and all other Major Feasts appointed on
      fixed days in the Calendar, when they occur on a Sunday, are normally
      transferred to the first convenient open day within the week. When
      desired, however, the Collect, Preface, and one or more of the Lessons
      appointed for the Feast may be substituted for those of the Sunday, but
      not from the Last Sunday after Pentecost through the First Sunday after
      the Epiphany, or from the Last Sunday after the Epiphany through
      Trinity Sunday.
    </p>

    <p>
      With the express permission of the bishop, and for urgent and sufficient
      reason, some other special occasion may be observed on a Sunday.
    </p>

    <h2>3. Holy Days</h2>

    <p>
    The following Holy Days are regularly observed throughout the year.
    Unless otherwise ordered in the preceding rules concerning Sundays, they
    have precedence over all other days of commemoration or of special
    observance:
    </p>

    <h3>Other Feasts of Our Lord</h3>

    <ol class="calendar-feast-list">
      <li>The Holy Name</li>
      <li>The Presentation</li>
      <li>The Annunciation</li>
      <li>The Visitation</li>      
      <li>Saint John the Baptist</li>
      <li>The Transfiguration</li>
      <li>Holy Cross Day</li>
    </ol>

    <h3>Other Major Feasts</h3>

    <ol class="calendar-feast-list">
      <li>All feasts of Apostles</li>
      <li>All feasts of Evangelists</li>
      <li>Saint Stephen</li>
      <li>The Holy Innocents</li>
      <li>Saint Joseph</li>
      <li>Saint Mary Magdalene</li>
      <li>Saint Mary the Virgin</li>
      <li>Saint Michael and All Angels</li>
      <li>Saint James of Jerusalem</li>
      <li>Independence Day</li>
      <li>Thanksgiving Day</li>
    </ol>

    <h3>Fasts</h3>
    <ol class="calendar-feast-list">
      <li>Ash Wednesday</li>
      <li>Good Friday</li>
    </ol>

    <p>
      Feasts appointed of fixed days in the Calendar are not observed on the
      days of Holy Week or of Easter Week. Major Feasts falling in these weeks
      are transferred to the week following the Second Sunday of Easter, in the
      order of their occurrence.
    </p>

    <p>
      Feasts appointed on fixed days in the Calendar do not take precedence of
      Ash Wednesday.
    </p>

    <p>
      Feasts of our Lord and other Major Feasts appointed on fixed days,
      which fall upon or are transferred to a weekday, may be observed on any
      open day within the week. This provision does not apply to Christmas
      Day, the Epiphany, and All Saints’ Day.
    </p>

    <h3>4. Days of Special Devotion</h3>

    <p>
      The following days are observed by special acts of discipline and
      self-denial:
    </p>

    <p>
      Ash Wednesday and the other weekdays of Lent and of Holy Week,
      except the feast of the Annunciation.
    </p>

    <p>
      Good Friday and all other Fridays of the year, in commemoration of the
      Lord’s crucifixion, except for Fridays in the Christmas and Easter
      seasons, and any Feasts of our Lord which occur on a Friday.
    </p>

    <h3>5. Days of Optional Observance</h3>

    <p>
      Subject to the rules of precedence governing Principal Feasts, Sundays,
      and Holy Days, the following may be observed with the Collects, Psalms,
      and Lessons duly authorized by this Church:
    </p>

    <ol class="calendar-feast-list">
      <li>Commemorations listed in the Calendar</li>
      <li>Other Commemorations, using the Common of Saints</li>
      <li>
        The Ember Days, traditionally observed on the Wednesdays, Fridays, and
        Saturdays after the First Sunday in Lent, the Day of Pentecost, Holy
        Cross Day, and December 13
      </li>
      <li>
        The Rogation Days, traditionally observed on Monday, Tuesday, and
        Wednesday before Ascension Day
      </li>
      <li>Various Occasions</li>
    </ol>

    <p>
      Provided, that there is no celebration of the Eucharist for any such
      occasion on Ash Wednesday, Maundy Thursday, Good Friday, and Holy
      Saturday; and provided further, that none of the Propers appointed for
      Various Occasions is used as a substitute for, or as an addition to, the
      Proper appointed for the Principal Feasts.
    </p>

  </main>
});

export default CalendarAboutPage;