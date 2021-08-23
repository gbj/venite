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

// dismiss both menus on backdrop click
backdrop.addEventListener("click", () => {
  document.querySelector("nav.toc-menu").classList.add("hidden");
  document.querySelector("menu.display-settings").classList.add("hidden");
  backdrop.classList.remove("open");
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
