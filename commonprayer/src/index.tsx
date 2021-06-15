import typesVhtml from "https://cdn.skypack.dev/@types/vhtml";
import h from "https://cdn.pika.dev/vhtml@ 2.2.0";
import { Page } from "./ssg/page.ts";

function linksFromHTML(main : string) : string[] {
  try {
    return (main.match(/<a\s+(?:[^>]*?\s*)?href="\/([^>"]*)"/g) || []).map((match : string) => match.split('href="')[1].replace("\"", ""));
  } catch(e) {
    console.error("Error in linksFromHTML: ", e);
    return [];
  }
}

const TOCMenu = () => [
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

const DisplaySettings = () => [
  <input class="display-setting" type="checkbox" id="psalmverses" checked/>,
  <input class="display-setting" type="checkbox" id="bibleverses" checked/>,
  <button class="menu-button" id="display-menu-button">
    <img src="/assets/icon/cog-solid.svg"/>
    <span class="visually-hidden">Display Settings</span>
  </button>,
  <menu class="hidden display-settings">
    <h2>Display Settings</h2>
    <label for="psalmverses" aria-role="button" class="display-setting-button">
      Psalm Verse Numbers
    </label>
    <label for="bibleverses" aria-role="button" class="display-setting-button">
      Bible Verse Numbers
    </label>
  </menu>
]

export function Index({ main, script, style, head }: Page, isDev = false): string {
  const body = (<body>
    <TOCMenu/>
    <DisplaySettings/>
    <main dangerouslySetInnerHTML={{__html: main.replace("<main>", "").replace("</main>", "")}}></main>
    <template id="cp-doc-menu">
      <header class="cp-doc-header">
        <menu class="cp-doc-menu">
          <li>
            <button class="clipboard">
              <img src="/assets/icon/clipboard-regular.svg" />
              <label>Copy Text</label>
            </button>
          </li>
          <li>
            <button class="venite">
              <img src="/assets/icon/venite.svg" />
              <label>Copy to Venite</label>
            </button>
          </li>
          <li>
            <button class="word">
              <img src="/assets/icon/file-word-regular.svg" />
              <label>Open in Word</label>
            </button>
          </li>
        </menu>
      </header>
    </template>
  </body>);

  const links = linksFromHTML(body);

  const page = <html dir="ltr" lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Common Prayer Online</title>
      <meta name="Description" content="An unofficial source for The Episcopal Church's authorized liturgies." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#16161d" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta http-equiv="x-ua-compatible" content="IE=Edge" />
    
      <link href="/style.css" rel="stylesheet"/>
    
      <link rel="apple-touch-icon" href="/assets/icon/icon.png" />
      <link rel="icon" type="image/x-icon" href="/assets/icon/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preload" href="/assets/fonts/Sabon_Roman.ttf" as="font" type="font/ttf"/>
      {style && <style>{style}</style>}
      {head}
      {isDev && <script src="/scripts/dev-socket.js"></script>}
      {links.map(link => <link rel="prefetch" href={link}/>)}
    </head>
    {body}
    {script && <script>${script}</script>}
    <script type="module" src="/scripts/cp-doc.js"></script>
    <script type="module" src="/scripts/menus.js"></script>
  </html>;

  return `<!DOCTYPE html>${page}`
}