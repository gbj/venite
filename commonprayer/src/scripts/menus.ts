import { debounce } from "./debounce.js";

const backdrop = document.getElementById("menu-backdrop");

function displaySettings() {
  const menu = document.querySelector("menu.display-settings"),
    btn = document.getElementById("display-menu-button"),
    closeBtn = menu.querySelector("button.close") as HTMLElement;
  btn.onclick = () => {
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      backdrop.classList.add("open");
    } else {
      menu.classList.add("hidden");
      backdrop.classList.remove("open");
    }
  };

  closeBtn.onclick = () => {
    menu.classList.add("hidden");
    backdrop.classList.remove("open");
  };
}

displaySettings();

// dismiss menu on backdrop click
backdrop.addEventListener("click", () => {
  document.querySelector("menu.display-settings").classList.add("hidden");
  backdrop.classList.remove("open");
});

// handle actual display-setting changes
const main = document.querySelector("main"),
  menu = document.querySelector("menu.display-settings"),
  psalmverses = document.getElementById("psalmverses") as HTMLInputElement,
  bibleverses = document.getElementById("bibleverses") as HTMLInputElement,
  responses = document.getElementsByName("responses");

psalmverses.addEventListener("change", () => {
  if (psalmverses.checked) {
    main.classList.add("psalmverses");
    menu.classList.add("psalmverses");
  } else {
    main.classList.remove("psalmverses");
    menu.classList.remove("psalmverses");
  }
});

bibleverses.addEventListener("change", () => {
  if (bibleverses.checked) {
    main.classList.add("bibleverses");
    menu.classList.add("bibleverses");
  } else {
    main.classList.remove("bibleverses");
    menu.classList.remove("bibleverses");
  }
});

responses.forEach((input: HTMLInputElement) => {
  input.addEventListener("change", () => {
    responses.forEach((checkInput: HTMLInputElement) => {
      if (checkInput.checked) {
        main.classList.add(checkInput.value);
        menu.classList.add(checkInput.value);
      } else {
        main.classList.remove(checkInput.value);
        menu.classList.remove(checkInput.value);
      }
    });
  });
});

// load stored preferences or defaults
psalmverses.checked = localStorage.getItem("psalmverses") === "true" || true;
bibleverses.checked = localStorage.getItem("bibleverses") === "true" || true;
psalmverses.dispatchEvent(new Event("change"));
bibleverses.dispatchEvent(new Event("change"));

const responsesValue = localStorage.getItem("responses") || "responses-bold";
responses.forEach((input: HTMLInputElement) => {
  if (input.value === responsesValue) {
    input.checked = true;
    input.dispatchEvent(new Event("change"));
  }
});

// collapse menu bar on scroll
const header = document.getElementById("menu-header");
let scrollTopPrev: number | null = null;
window.addEventListener(
  "scroll",
  debounce(() => {
    const scrollTopCurr = document.documentElement.scrollTop;

    if (scrollTopPrev && scrollTopPrev < scrollTopCurr) {
      header.classList.add("collapsed");
    } else {
      header.classList.remove("collapsed");
    }

    scrollTopPrev = scrollTopCurr;
  }, 100)
);
window.addEventListener(
  "click",
  debounce(() => {
    header.classList.remove("collapsed");
  }, 25)
);
