import { Mode } from "./mode.ts";
import { debounce } from "../../scripts/debounce.ts";

const { mode } = document.querySelector("main").dataset;

const searchbar = document.getElementById("searchbar") as HTMLInputElement,
  category = document.querySelector(".version-list");
searchbar.disabled = false;
searchbar.oninput = debounce(() => {
  const labels: Record<string, number> = {};

  for (const child of Array.from(
    category.querySelectorAll("li.document")
  ) as HTMLElement[]) {
    const { ldf, category } = child.dataset;

    // show/hide child depending on search
    if (ldf.includes(searchbar.value) || category?.includes(searchbar.value)) {
      child.style.display = "block";

      // keep track of label counts
      if (mode === Mode.Labeled && category) {
        if (labels[category]) {
          labels[category] += 1;
        } else {
          labels[category] = 1;
        }
      }
    } else {
      child.style.display = "none";
    }
  }

  // for all the labels; if there are >= 1 entries that have passed the search, then show it; otherwise, hide
  if (mode === Mode.Labeled) {
    document.querySelectorAll(".label").forEach((el: HTMLElement) => {
      console.log("el = ", el);
      const label = el.textContent;
      if (labels[label] >= 1) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });
  }
}, 100);
