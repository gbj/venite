import h from "https://cdn.pika.dev/vhtml@2.2.0";

type DocActionMenuProps = {
  hidden?: boolean;
}

export function DocActionMenu({ hidden } : DocActionMenuProps) {
  return <header id="cp-doc-header" class={hidden ? "hidden" : ""}>
      <menu class="cp-doc-menu">
        <li>
          <button class="venite">
            <img src="/assets/icon/venite.svg" />
            <label>Copy to Venite</label>
          </button>
        </li>
        <li>
          <button class="word">
            <img src="/assets/icon/file-word-regular.svg" />
            <label>Open in Word</label>
          </button>
        </li>
      </menu>
    </header>
}