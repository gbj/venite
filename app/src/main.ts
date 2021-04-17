import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import "@capacitor/core";

// Note: loader import location set using "esmLoaderPath" within the output target config
import {
  applyPolyfills,
  defineCustomElements,
} from "@venite/components/loader";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  /*.then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('./ngsw-worker.js');
    }
  })*/
  .catch((err) => console.warn(err));

// load Venite custom elements
applyPolyfills().then(() => {
  defineCustomElements();
});
