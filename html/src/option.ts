import { Option, LiturgicalDocument } from "@venite/ldf/dist/cjs";
import { ldfToHTML } from "..";
import { LDFToHTMLConfig } from "./config";

function lowQualityUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function optionToHTML(doc: Option, config: LDFToHTMLConfig): string {
  const uid = lowQualityUUID(),
    opt = new Option(doc),
    selected = doc.metadata?.selected ?? doc.metadata?.editor_selected ?? 0;

  const buttons = (doc.value || []).map(
    (sub: LiturgicalDocument, subIndex) => `<label for="${uid}-${subIndex}">
      ${opt.getVersionLabel(sub)}
      <input type="radio" id="${uid}-${subIndex}" name="${uid}" value="${subIndex}"${
      subIndex === Number(selected) ? " checked" : ""
    }>
    </label>`
  );

  const docs = (doc.value || []).map((sub: LiturgicalDocument, subIndex) =>
    ldfToHTML(
      new LiturgicalDocument({ ...sub, hidden: subIndex !== Number(selected) }),
      { ...config, includeLDF: true }
    )
  );

  return `<article class="option" data-ldf="${encodeURI(
    JSON.stringify(doc)
  )}">${[
    `<section class="option-labels">${buttons.join("\n")}</section>`,
    `<section class="options">${docs.join("\n")}</section>`,
  ].join("\n")}</article>`;
}
