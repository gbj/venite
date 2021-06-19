import h from "https://cdn.pika.dev/vhtml@2.2.0";

export function DocActionMenu() {
  return <template id="cp-doc-menu">
    <header class="cp-doc-header">
      <menu class="cp-doc-menu">
        <li>
          <button class="clipboard">
            <img src="/assets/icon/clipboard-regular.svg" />
            <label>Copy Text</label>
          </button>
        </li>
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
  </template>
}