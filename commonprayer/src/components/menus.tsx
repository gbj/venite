import h from "https://cdn.pika.dev/vhtml@2.2.0";
import { DisplaySettings } from "./display-settings.tsx";
import { DocActionMenu } from "./doc-action-menu.tsx";
import { TOCMenu } from "./toc-menu.tsx";

export default function Menus() {
  return [
    <header id="menu-header">
      <button class="menu-button" id="toc-menu-button">
        <img src="/assets/icon/books.svg"/>
        <span class="visually-hidden">Table of Contents</span>
      </button>
      <DocActionMenu hidden={true} />
      <button class="menu-button" id="display-menu-button">
        <img src="/assets/icon/cog-solid.svg"/>
        <span class="visually-hidden">Display Settings</span>
      </button>
    </header>,
    <TOCMenu/>,
    <DisplaySettings/>,
    <div id="menu-backdrop"></div>
  ]
}