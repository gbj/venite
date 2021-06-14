import h from "https://cdn.pika.dev/vhtml@ 2.2.0";
import { Page } from "../../ssg/page.ts";

export default function Home(): Page {
  return {
    main: <main>
      <h1>Common Prayer (Online)</h1>
    </main>,
  };
}
