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
  const uuid = lowQualityUUID(),
    opt = new Option(doc),
    selected = doc.metadata?.selected ?? doc.metadata?.editor_selected ?? 0;

  const buttons = (doc.value || []).map(
    (sub: LiturgicalDocument, subIndex) =>
      `<input type="radio" name="${uuid}" class="option-button" id="${uuid}-${subIndex}" value="${subIndex}"${
        subIndex === selected ? " checked" : ""
      }>`
  );

  const labels = (doc.value || []).map(
    (sub: LiturgicalDocument, subIndex) =>
      `<label for="${uuid}-${subIndex}">${opt.getVersionLabel(sub)}</label>`
  );

  const docs = (doc.value || []).map((sub: LiturgicalDocument) =>
    ldfToHTML(sub, { ...config, includeLDF: true })
  );

  return `<article class="option">${[
    ...buttons,
    `<section class="option-labels">${labels.join("\n")}</section>`,
    `<section class="options">${docs.join("\n")}</section>`,
  ].join("\n")}</article>`;
}
