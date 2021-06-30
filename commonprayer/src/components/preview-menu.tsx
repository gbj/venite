import h from "https://cdn.skypack.dev/vhtml@2.2.0";

type PreviewMenuProps = {
  hidden?: boolean;
}

export function PreviewMenu({ hidden } : PreviewMenuProps) {
  return <menu id="preview-menu" class={hidden ? "hidden" : ""}>
      Preview for <input type="date" id="preview-date"/>
      <button id="preview-today-btn">Today</button>
    </menu>
}