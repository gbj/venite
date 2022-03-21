import * as fs from "fs";
import { Packer } from "docx";
import { LiturgicalDocument } from "@venite/ldf";
import { ldfToDocx } from "../src/ldf-to-docx";
import { DisplaySettings } from "../src/display-settings";

try {
  const displaySettings = new DisplaySettings();
  displaySettings.bibleVerses = true;
  displaySettings.psalmVerses = true;

  const data = fs.readFileSync("./candlemas.json", "utf8"),
    inDoc: LiturgicalDocument = JSON.parse(data);

  ldfToDocx(inDoc, displaySettings).then((outDoc) => {
    Packer.toBuffer(outDoc).then((buffer) =>
      fs.writeFileSync("./candlemas.docx", buffer)
    );
  });
} catch (err) {
  console.error(err);
}
