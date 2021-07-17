import { LiturgicalDocument } from "https://cdn.skypack.dev/@venite/ldf@^0.20.5?dts";

// List of selected subdocs to export
type Selection = {
  el: HTMLElement;
  ldf: Promise<LiturgicalDocument>;
};

const selections: Selection[] = [];

// Menu button handlers
const menu = document.getElementById("cp-doc-header");
(menu.querySelector("button.venite") as HTMLButtonElement).onclick = (
  ev: MouseEvent
) => copyLDF(ev);
(menu.querySelector("button.word") as HTMLButtonElement).onclick = (
  ev: MouseEvent
) => exportWord(ev);

// Listen for all clicks in the window, and if the target is a descendant of an
// element with cp-doc class or with data-ldf set, then toggle buttons

// Then add the actual click listener
window.addEventListener("click", (ev) => {
  // Don't activate this if the click is part of a text selection
  const cellText = document.getSelection();
  if (cellText.type === "Range") {
    ev.stopPropagation();
  } else {
    const target = ev.target as HTMLElement,
      local: HTMLElement = target.closest(".doc"); // || target.closest("[data-slug]");
    if (local) {
      const { copyable } = local.dataset;
      if (copyable !== "false") {
        handle(local);
      }
    }
  }
});

const handle = (el: HTMLElement) => {
  el.dataset.toggled =
    el.dataset.toggled == undefined || el.dataset.toggled === "false"
      ? "true"
      : "false";

  // toggled
  if (el.dataset.toggled === "true") {
    // highlight the element
    el.classList.add("selected");

    // add to selections
    selections.push({ el, ldf: loadDoc(el) });

    // make it draggable
    el.draggable = true;

    // show menu
    if (selections.length > 0) {
      menu.classList.remove("hidden");
    }
  }
  // untoggled
  else {
    // remove highlight on element
    el.classList.remove("selected");

    // remove this element from selections
    const entry = selections.find((e) => e.el == el),
      i = selections.indexOf(entry);
    selections.splice(i, 1);

    // no longer draggable
    el.draggable = false;

    // if there are now no selections, hide the menu
    if (selections.length === 0) {
      menu.classList.add("hidden");
    }
  }
};

// Set status classes on buttons
function setStatus(el: HTMLElement, className: string, time: number = 1000) {
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), time);
}

// Load document, either from URL or from local data-ldf attribute
async function loadDoc(el: HTMLElement): Promise<LiturgicalDocument> {
  const { ldf, category, slug } = el.dataset;
  try {
    if (ldf) {
      return JSON.parse(decodeURI(ldf));
    } else {
      const resp = await fetch(`/assets/liturgy/${category}/${slug}.json`),
        data = await resp.json();
      return data.data ? data.data[0] : data;
    }
  } catch (e) {
    console.warn(e);
    setStatus(el, "error");
  }
}

// Copy LDF JSON to clipboard
async function copyLDF(_ev: MouseEvent) {
  const btn = menu.querySelector("button.venite") as HTMLElement;
  try {
    const value = await Promise.all(selections.map((e) => e.ldf)),
      doc = value.length > 1 ? { type: "liturgy", value } : value[0],
      json = JSON.stringify(doc);
    navigator.clipboard.writeText(json);
    setStatus(btn, "success");
  } catch (e) {
    console.warn(e);
    setStatus(btn, "error");
  }
}

// Export document to Word
async function exportWord(ev: MouseEvent) {
  const target = ev.target as HTMLElement,
    btn = menu.querySelector("button.word") as HTMLElement,
    label =
      target.tagName.toLowerCase() === "label"
        ? target
        : (btn.querySelector("label") as HTMLElement),
    width = label.clientWidth,
    innerText = label.innerText;
  label.innerText = "...";
  label.style.width = `${width}px`;
  label.style.paddingLeft = "0";
  label.style.paddingRight = "0";

  try {
    const value = await Promise.all(selections.map((e) => e.ldf)),
      doc = value.length > 1 ? { type: "liturgy", value } : value[0],
      { slug } = selections[0]?.el.dataset,
      settings = {
        psalmVerses: (
          document.getElementById("psalmverses") as HTMLInputElement
        ).checked,
      };
    console.log({ doc, settings });
    const resp = await fetch(
      `https://us-central1-venite-2.cloudfunctions.net/docx`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          doc,
          settings,
        }),
      }
    );
    if (resp.ok) {
      try {
        const blob = await resp.blob(),
          url = URL.createObjectURL(blob),
          a = document.createElement("a");
        a.href = url;
        a.download = `${slug || new Date()}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setStatus(btn, "success");
      } catch (e) {
        console.warn(e);
        setStatus(btn, "error");
      }
    } else {
      setStatus(btn, "error");
    }
  } catch (e) {
    console.warn(e);
    setStatus(btn, "error");
  }
  label.innerText = innerText;
  label.style.width = "";
  label.style.paddingLeft = "";
  label.style.paddingRight = "";
}

// Drag and drop support
document.querySelectorAll(".doc").forEach((el: HTMLElement) => {
  el.addEventListener("dragstart", async (ev) => {
    const doc = await loadDoc(el);
    ev.dataTransfer.setData("application/json", JSON.stringify(doc));
    ev.dataTransfer.setData("text/html", el.innerHTML);
    ev.dataTransfer.setData("text/plain", el.innerText);
  });
});
