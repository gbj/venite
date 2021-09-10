import h from "https://cdn.skypack.dev/vhtml@ 2.2.0";
import { PageProps } from "../../ssg/page.ts";

export default function Collects(): PageProps {
  return {
    style: ".collects { list-style-type: none; }",
    main: <main>
      <h1>The Collects</h1>
      <ul class="collects">
        <li>
          <a href="/collect-of-the-day/Rite-I">Collects: Traditional</a>
        </li>
        <li>
          <a href="/collect-of-the-day/Rite-II">Collects: Contemporary</a>
        </li>
      </ul>
    </main>
  };
}
