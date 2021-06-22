import { LiturgicalDocument } from "/ldf.js";

// Listen for all clicks in the window, and if the target is a descendant of an
// element with cp-doc class or with data-ldf set, then toggle buttons
window.addEventListener("click", (ev) => {
  const target = ev.target as HTMLElement,
    parent = target.closest(".cp-doc"),
    local = target.closest("[data-ldf]") || target.closest("[data-slug]");
  if (parent) {
    handle(parent);
  }
  if (local && parent !== local) {
    handle(local);
  }
});

const handle = (el: HTMLElement, force: boolean | undefined = undefined) => {
  if (force !== undefined) {
    el.dataset.toggled = force.toString();
  } else {
    el.dataset.toggled =
      el.dataset.toggled == undefined || el.dataset.toggled === "false"
        ? "true"
        : "false";
  }

  if (el.dataset.toggled === "true") {
    const menu = (document.getElementById("cp-doc-menu") as HTMLTemplateElement)
        .content,
      menuNode = document.importNode(menu, true);
    el.parentNode.insertBefore(menuNode, el);

    el.parentNode.querySelector("button.clipboard").onclick = (
      ev: MouseEvent
    ) => copyText(ev, el);
    el.parentNode.querySelector("button.venite").onclick = (ev: MouseEvent) =>
      copyLDF(ev, el);
    el.parentNode.querySelector("button.word").onclick = (ev: MouseEvent) =>
      exportWord(ev, el);
  } else {
    for (const menu of el.parentNode.querySelectorAll("menu")) {
      menu.remove();
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

// Copy text to clipboard
async function copyText(ev: MouseEvent, el: HTMLElement) {
  const target = ev.target as HTMLElement,
    btn =
      target.tagName.toLowerCase() === "button"
        ? target
        : (target.closest("button") as HTMLElement),
    text = el.innerText;
  try {
    await navigator.clipboard.writeText(text);
    setStatus(btn, "success");
  } catch (e) {
    console.warn(e);
    setStatus(btn, "error");
  }
}

// Copy LDF JSON to clipboard
async function copyLDF(ev: MouseEvent, el: HTMLElement) {
  const target = ev.target as HTMLElement,
    btn =
      target.tagName.toLowerCase() === "button"
        ? target
        : (target.closest("button") as HTMLElement);
  try {
    const doc = await loadDoc(el),
      json = JSON.stringify(doc);
    navigator.clipboard.writeText(json);
    setStatus(btn, "success");
  } catch (e) {
    console.warn(e);
    setStatus(btn, "error");
  }
}

// Export document to Word
async function exportWord(ev: MouseEvent, el: HTMLElement) {
  const target = ev.target as HTMLElement,
    btn =
      target.tagName.toLowerCase() === "button"
        ? target
        : (target.closest("button") as HTMLElement),
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
    const { slug } = el.dataset,
      doc = await loadDoc(el),
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
