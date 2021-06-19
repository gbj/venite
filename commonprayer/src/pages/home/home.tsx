import h from "https://cdn.pika.dev/vhtml@ 2.2.0";
import { PageProps } from "../../ssg/page.ts";

export default function Home(): PageProps {
  return {
    main: <main>
      <h1>Common Prayer (Online)</h1>
      <h2>An unauthorized source for The Episcopal Church’s authorized liturgies.</h2>
    </main>,
  };
}
