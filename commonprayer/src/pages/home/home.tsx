import h from "https://cdn.skypack.dev/vhtml@ 2.2.0";
import { PageProps } from "../../ssg/page.ts";

export default function Home(): PageProps {
  return {
    style: "h2 { font-weight: normal; font-style: italic; }",
    main: <main>
      <h1>Common Prayer (Online)</h1>
      <h2>An unauthorized source for The Episcopal Church’s authorized liturgies.</h2>
      <h3>Table of Contents</h3>
      <ul class="toc-menu">
        <li>
          The Calendar of the Church Year
          <ul>
            <li><a href="/calendar/about">About</a></li>
            <li><a href="/calendar/bcp">Book of Common Prayer (1979)</a></li>
            <li><a href="/calendar/lff"><em>Lesser Feasts and Fasts</em> (2018)</a></li>
            <li><a href="/calendar/date">Calculator</a></li>
          </ul>
        </li>
        <li>
          <a href="/office">The Daily Office</a>
          <ul>
            <li><a href="/office/morning-prayer">Morning Prayer</a></li>
            <li><a href="/canticle-table">Table of Suggested Canticles</a></li>
          </ul>
        </li>
        <li><a href="/litany">The Great Litany</a></li>
        <li><a href="/collects">The Collects</a></li>
        <li><a href="/proper-liturgies">Proper Liturgies for Special Days</a></li>
        <li><a href="/baptism">Holy Baptism</a></li>
        <li><a href="/eucharist">Holy Eucharist</a></li>
        <li><a href="/pastoral-offices">Pastoral Offices</a></li>
        <li><a href="/episcopal-services">Episcopal Services</a></li>
        <li><a href="/psalter">The Psalter, or Psalms of David</a></li>
        <li><a href="/prayers-and-thanksgivings">Prayers and Thanksgivings</a></li>
        <li><a href="/catechism">An Outline of the Faith, or Catechism</a></li>
        <li><a href="/historical-documents">Historical Documents of the Church</a></li>
      </ul>
    </main>
  };
}
