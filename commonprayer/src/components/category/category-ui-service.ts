import { Mode } from "./mode.ts";

function debounce<T extends Function>(f: T, delay = 250) {
  let timer: number;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => f(...args), delay);
  };
}

const { mode } = document.querySelector("main").dataset;

const searchbar = document.getElementById("searchbar") as HTMLInputElement,
  category = document.querySelector(".version-list");
searchbar.disabled = false;
searchbar.oninput = debounce(() => {
  if (mode === Mode.Embedded) {
    for (const child of Array.from(category.querySelectorAll("li.document"))) {
      if (child.textContent.includes(searchbar.value)) {
        child.querySelector("details").open = true;
      } else {
        child.querySelector("details").open = false;
      }
    }
  } else {
    console.log(searchbar.value);
    for (const child of Array.from(
      category.querySelectorAll("li.document")
    ) as HTMLElement[]) {
      const { ldf } = child.dataset;
      console.log(ldf.slice(0, 100), ldf.includes(searchbar.value));
      if (ldf.includes(searchbar.value)) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
    }
  }
}, 100);
