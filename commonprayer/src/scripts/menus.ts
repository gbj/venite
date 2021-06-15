function tableOfContents() {
  const menu = document.querySelector("nav.toc-menu"),
    btn = document.getElementById("toc-menu-button");
  btn.onclick = () => {
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      btn.classList.add("open");
    } else {
      menu.classList.add("hidden");
      btn.classList.remove("open");
    }
  };
}

function displaySettings() {
  const menu = document.querySelector("menu.display-settings"),
    btn = document.getElementById("display-menu-button");
  btn.onclick = () => {
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      btn.classList.add("open");
    } else {
      menu.classList.add("hidden");
      btn.classList.remove("open");
    }
  };
}

tableOfContents();
displaySettings();
