import h from "https://cdn.pika.dev/vhtml@2.2.0";
import { MenuHeader } from "./menu-header.tsx";

export const DisplaySettings = () => [
  <input class="display-setting" type="checkbox" id="psalmverses" checked/>,
  <input class="display-setting" type="checkbox" id="bibleverses" checked/>,
  <input class="display-setting" type="radio" id="responses-bold" name="responses" checked/>,
  <input class="display-setting" type="radio" id="responses-italic" name="responses"/>,
  <menu class="hidden display-settings">
    <MenuHeader title="Display Settings" />
    <label for="psalmverses" aria-role="button" class="display-setting-button">
      Psalm Verse Numbers
    </label>
    <label for="bibleverses" aria-role="button" class="display-setting-button">
      Bible Verse Numbers
    </label>
    <div class="multiple">
      <label for="responses-bold" aria-role="button" class="display-setting-button multiple">
        Responses in Bold
      </label>
      <label for="responses-italic" aria-role="button" class="display-setting-button multiple">
        Responses in Italics
      </label>
    </div>
  </menu>
]