const options = document.querySelectorAll(".option");
options.forEach((option) => {
  Array.from(option.getElementsByTagName("input")).forEach((input) => {
    input.addEventListener("change", (ev: InputEvent) => {
      const target = ev.target,
        optionName = (ev.target as HTMLInputElement).name,
        newSelection =
          Number(
            (
              document.querySelector(
                `input[type='radio'][name='${optionName}']:checked`
              ) as HTMLInputElement | undefined
            )?.value
          ) ?? 0,
        parent = (target as HTMLElement).closest(".option") as HTMLElement,
        ldf = parent.dataset.ldf,
        doc = ldf ? JSON.parse(decodeURI(ldf)) : null,
        options = parent.querySelectorAll(".options > .doc");

      console.log(ev.target, "\nnewSelection = ", newSelection);

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
    input.dispatchEvent(new Event("change"));
  });
});
