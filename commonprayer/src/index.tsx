import h from "https://cdn.skypack.dev/vhtml@ 2.2.0";
import Menus from "./components/menus.tsx";
import { PageProps } from "./ssg/page.ts";

function linksFromHTML(main : string) : string[] {
  try {
    return (main.match(/<a\s+(?:[^>]*?\s*)?href="\/([^>"]*)"/g) || []).map((match : string) => match.split('href="')[1].replace("\"", ""));
  } catch(e) {
    console.error("Error in linksFromHTML: ", e);
    return [];
  }
}

export async function Index({ main, script, style, head, styles, scripts }: PageProps, isDev = false): Promise<string> {
  const mainHTML = await main,
    menus = <Menus/>;
  
  const body = <body dangerouslySetInnerHTML={{__html: `${menus}${mainHTML}`}}></body>;

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
      {styles && styles.map(url => <link rel="stylesheet" href={url}/>)}
      {style && <style>{style}</style>}
      {head}
      {isDev && <script src="/scripts/dev-socket.js"></script>}
      {links.map(link => <link rel="prefetch" href={link}/>)}
    </head>
    {body}
    {script && <script>${script}</script>}
    <script type="module" src="/scripts/menus.js"></script>
    {scripts && scripts.map(url => <script type="module" src={url}></script>)}
    <script type="module" src="/scripts/cp-doc.js"></script>
  </html>;

  return `<!DOCTYPE html>${page}`
}