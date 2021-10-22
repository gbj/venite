import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import { sourceToHTML } from "../../components/doc/doc.tsx";
import { PageProps } from "../../ssg/page.ts";

export default function Eucharist(): PageProps {
  const source = sourceToHTML({
    "url": "https://www.episcopalchurch.org/wp-content/uploads/sites/2/2019/11/bcp_compressed.pdf#page=315",
    "label": "BCP p. 315"
  });
  return {
    main: <main>
      <section dangerouslySetInnerHtml={{__html: source}}></section>
      <h1>The Holy Eucharist</h1>
      <h2>The Liturgy for the Proclamation of the Word of God and Celebration of the Holy Communion</h2>
      <ul class="collects">
        <li>
          <a href="/eucharist/Rite-I">The Holy Eucharist: Rite I</a>
        </li>
        <li>
          <a href="/eucharist/Rite-I">The Holy Eucharist: Rite II</a>
        </li>
        <li>
          <a href="/eucharist/EOW">The Holy Eucharist: <em>Enriching Our Worship</em></a>
        </li>
        <li>
          <a href="/prayers-of-the-people">Prayers of the People</a>
        </li>
        <li>
          <a href="/pastoral-offices/communion-under-special-circumstances">Communion under Special Circumstances</a>
        </li>
        <li>An Order for Celebrating the Holy Eucharist</li>
        <li>Additional Directions</li>
      </ul>
    </main>
  };
}
