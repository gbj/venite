import h from "https://cdn.pika.dev/vhtml@2.2.0";

export const TOCMenu = () => [
  <button class="menu-button" id="toc-menu-button">
    <img src="/assets/icon/books.svg"/>
    <span class="visually-hidden">Table of Contents</span>
  </button>,
  <nav class="hidden toc-menu">
    <ul>
      <li>
        <h2>The Calendar of the Church Year</h2>
        <ul>
          <li><a href="/calendar/about">About</a></li>
          <li><a href="/calendar/bcp">Book of Common Prayer (1979)</a></li>
          <li><a href="/calendar/lff"><em>Lesser Feasts and Fasts</em> (2018)</a></li>
          <li><a href="/calendar/date">Calculator</a></li>
        </ul>
      </li>
      <li>
        <h2>The Daily Office</h2>
        <ul>
          <li>Morning Prayer</li>
          <li><a href="/office/noonday-prayer">Noonday Prayer</a></li>
          <li>Evening Prayer</li>
          <li><a href="/office/compline">Compline</a></li>
        </ul>
      </li>
      <li>
        <h2>The Great Litany</h2>
        <ul>
          <li><a href="/litany/bcp">Traditional Language</a></li>
          <li><a href="/litany/eow">Expansive Language</a></li>
          <li><a href="/litany/supplication">The Supplication</a></li>
        </ul>
      </li>
      <li>
        <h2>The Collects</h2>
        <ul>
          <li>Traditional Language</li>
          <li>Contemporary Language</li>
        </ul>
      </li>
      <li>
        <details>
          <summary><h2>Proper Liturgies for Special Days</h2></summary>
          <ul>
            <li>Ash Wednesday</li>
            <li>Palm Sunday</li>
            <li>Maundy Thursday</li>
            <li>Good Friday</li>
            <li>Holy Saturday</li>
            <li>The Great Vigil of Easter</li>
          </ul>
        </details>
      </li>
      <li>
        <h2>Holy Baptism</h2>
      </li>
      <li>
        <details>
          <summary><h2>Holy Eucharist</h2></summary>
          <ul>
            <li>An Exhortation</li>
            <li>
              A Penitential Order
              <ul>
                <li>Rite One</li>
                <li>Rite Two</li>
              </ul>
            </li>
            <li>
              <h3>The Holy Eucharist</h3>
              <ul>
                <li>Rite One</li>
                <li>Rite Two</li>
                <li><em>Enriching Our Worship</em></li>
                <li>Inclusive Language</li>
                <li>An Order for Celebrating the Holy Eucharist</li>
              </ul>
            </li>
            <li>Prayers of the People</li>
            <li><a href="/eucharistic-prayer">Eucharistic Prayers</a></li>
            <li>
              Proper Prefaces
              <ul>
              <li><a href="/proper-prefaces/Rite-I">Rite One</a></li>
              <li><a href="/proper-prefaces/Rite-II">Rite Two</a></li>
              </ul>
            </li>
            <li>Communion under Special Circumstances</li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary><h2>Pastoral Offices</h2></summary>
          <ul>
            <li>Confirmation</li>
            <li>A Form of Commitment to Christian Service</li>
            <li>
              Marriage
              <ul>
                <li>Celebration and Blessing of a Marriage</li>
                <li>The Blessing of a Civil Marriage</li>
                <li>[TODO insert additional marriage materials]</li>
                <li>An Order for Marriage</li>
              </ul>
            </li>
            <li>Thanksgiving for the Birth or Adoption of a Child [TODO insert additional]</li>
            <li>Reconciliation of a Penitent</li>
            <li>Ministration to the Sick</li>
            <li>Ministration at the Time of Death</li>
            <li>
              Burial of the Dead
              <ul>
                <li>Rite One</li>
                <li>Rite Two</li>
                <li>An Order for Burial</li>
                <li>[TODO EOW forms]</li>
              </ul>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary><h2>Episcopal Services</h2></summary>
          <ul>
            <li>Ordination of a Bishop</li>
            <li>Ordination of a Priest</li>
            <li>Ordination of a Deacon</li>
            <li>Litany for Ordinations</li>
            <li>Celebration of a New Ministry</li>
            <li>Consecration of a Church or Chapel</li>
          </ul>
        </details>
      </li>
      <li>
        <h2><a href="/psalter">The Psalter, or Psalms of David</a></h2>
      </li>
      <li>
        <h2>Prayers and Thanksgivings</h2>
      </li>
      <li>
        <h2>An Outline of the Faith, or Catechism</h2>
      </li>
      <li>
        <h2>Historical Documents of the Church</h2>
      </li>
    </ul>
  </nav>
]