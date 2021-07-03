import { CompileService, CompileMode } from "./services.bundle.js";

// Elements
const previewMenu = document.getElementById("preview-menu"),
  previewDate = document.getElementById("preview-date") as HTMLInputElement,
  todayBtn = document.getElementById("preview-today-btn");

// On a doc page, automatically show the "Preview" menu
previewMenu.classList.remove("hidden");

// Utility function to format setting `previewDate.value` correctly
function dateToInputValueString(d: Date) {
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}

// Today button handler
todayBtn.onclick = () => {
  const today = new Date(),
    value = dateToInputValueString(today);
  previewDate.value = value;

  // setting value does not trigger change event, so call manually
  compileForDate(value);
};

// Date change handler
previewDate.onchange = (ev: InputEvent) => {
  compileForDate((ev.target as HTMLInputElement).value);
};

function compileForDate(ymd: string) {
  const rootEl = document.querySelector("main");
  if (ymd) {
    CompileService.compileInDOM(ymd, rootEl, CompileMode.Preview);
  } else {
    CompileService.clear(rootEl);
  }
}
