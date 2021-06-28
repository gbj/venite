const backdrop = document.getElementById("menu-backdrop");

function tableOfContents() {
  const menu = document.querySelector("nav.toc-menu"),
    btn = document.getElementById("toc-menu-button"),
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

tableOfContents();
displaySettings();

// dismiss both menus on backdrop click
backdrop.addEventListener("click", () => {
  document.querySelector("nav.toc-menu").classList.add("hidden");
  document.querySelector("menu.display-settings").classList.add("hidden");
  backdrop.classList.remove("open");
});
