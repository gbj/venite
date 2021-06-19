import h from "https://cdn.pika.dev/vhtml@2.2.0";

export const TOCMenu = () => [
  <button class="menu-button" id="toc-menu-button">
    <img src="/assets/icon/books.svg"/>
    <span class="visually-hidden">Table of Contents</span>
  </button>,
  <nav class="hidden toc-menu">
    <ul>
      <li>
        <h2>Daily Office</h2>
        <ul>
          <li>Morning Prayer</li>
          <li><a href="/office/noonday-prayer">Noonday Prayer</a></li>
          <li>Evening Prayer</li>
          <li><a href="/office/compline">Compline</a></li>
        </ul>
      </li>
      <li>
      <h2><a href="/psalter">The Psalter</a></h2>
    </li>
    </ul>
  </nav>
]