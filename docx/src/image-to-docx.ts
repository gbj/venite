/* TODO
 * Styling in metadata */

import { Image } from "@venite/ldf/dist/cjs";
import { Document, Media, Paragraph } from "docx";
import { DisplaySettings } from "./display-settings";
import { DocxChild } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";
import fetch from "isomorphic-fetch";
import { LDFStyles } from "./ldf-styles";

export async function imageToDocx(docxDoc : Document, doc : Image, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : Promise<DocxChild[]> {
  const buffers = await Promise.all(
    doc.value.map(async url => await fetch(url).then(r => r.arrayBuffer()))
  );

  const children : DocxChild[] = [];
  buffers.forEach(buffer => {
    const image = Media.addImage(docxDoc, buffer);
    children.push(new Paragraph({
      style: LDFStyles.Image,
      children: [image]
    }));
  })

  return children;
}
