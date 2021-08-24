import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import { MenuHeader } from "./menu-header.tsx";

export const DisplaySettings = () => 
  <menu class="hidden display-settings">
    <MenuHeader title="Display Settings" />
    <label for="psalmverses" aria-role="button" class="display-setting-button">
      Psalm Verse Numbers
      <input class="display-setting" type="checkbox" id="psalmverses" checked/>
    </label>
    <label for="bibleverses" aria-role="button" class="display-setting-button">
      Bible Verse Numbers
      <input class="display-setting" type="checkbox" id="bibleverses" checked/>
    </label>
    <div class="multiple">
      <label for="responses-bold" aria-role="button" class="display-setting-button multiple">
        Responses in Bold
        <input class="display-setting" type="radio" id="responses-bold" name="responses" value="responses-bold" checked/>
      </label>
      <label for="responses-italic" aria-role="button" class="display-setting-button multiple">
        Responses in Italics
        <input class="display-setting" type="radio" id="responses-italic" name="responses" value="responses-italic" />
      </label>
    </div>
  </menu>
