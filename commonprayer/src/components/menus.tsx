import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import { DisplaySettings } from "./display-settings.tsx";
import { DocActionMenu } from "./doc-action-menu.tsx";
import { PreviewMenu } from "./preview-menu.tsx";
import { TOCMenu } from "./toc-menu.tsx";

export default function Menus() {
  return [
    <header id="menu-header">
      <a class="menu-button" id="toc-menu-button" href="/">
        <img src="/assets/icon/books.svg"/>
        <span class="visually-hidden">Table of Contents</span>
      </a>
      <PreviewMenu hidden={true} />
      <DocActionMenu hidden={true} />
      <button class="menu-button" id="display-menu-button">
        <img src="/assets/icon/cog-solid.svg"/>
        <span class="visually-hidden">Display Settings</span>
      </button>
    </header>,
    <DisplaySettings/>,
    <div id="menu-backdrop"></div>
  ]
}