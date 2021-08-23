const options = document.querySelectorAll(".option");
options.forEach((option) => {
  Array.from(option.getElementsByTagName("input")).forEach((input) => {
    input.addEventListener("change", (ev: InputEvent) => {
      const target = ev.target,
        newSelection = Number((ev.target as HTMLInputElement).value),
        parent = (target as HTMLElement).closest(".option") as HTMLElement,
        ldf = parent.dataset.ldf,
        doc = ldf ? JSON.parse(decodeURI(ldf)) : null,
        options = parent.querySelectorAll(".options .doc");

      // update selection in data-ldf field
      if (doc) {
        parent.dataset.ldf = encodeURI(
          JSON.stringify({
            ...doc,
            metadata: { ...doc.metadata, selected: newSelection },
          })
        );
      }
      // show newly selected document
      options.forEach((option, optionIndex) => {
        if (optionIndex === newSelection) {
          option.classList.remove("hidden");
        } else {
          option.classList.add("hidden");
        }
      });
    });
  });
});
