function debounce<T extends Function>(f: T, delay = 250) {
  let timer: number;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => f(...args), delay);
  };
}

const searchbar: HTMLInputElement = document.getElementById("searchbar"),
  category = document.getElementById("category-list");
searchbar.disabled = false;
searchbar.oninput = debounce(() => {
  for (const child of category.children) {
    if (child.textContent.includes(searchbar.value)) {
      child.querySelector("details").open = true;
    } else {
      child.querySelector("details").open = false;
    }
  }
}, 100);
