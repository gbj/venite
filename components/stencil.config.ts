import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import {
  angularOutputTarget,
  ValueAccessorConfig,
} from "@stencil/angular-output-target";

export const config: Config = {
  namespace: "LDF",
  taskQueue: "async",
  globalStyle: "src/global/global.scss",
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: "@venite/components",
      directivesProxyFile: "../angular/src/directives/proxies.ts",
      //valueAccessorConfigs: angularValueAccessorBindings,
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader",
      copy: [
        {
          src: "**/*.i18n.*.json",
          dest: "i18n",
        },
      ],
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      // uncomment lines below if we go back to fetching static JSON
      //copy: [{
      //  src: "**/*.i18n.*.json",
      //  dest: "i18n"
      //}],
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass()],
  extras: {
    experimentalImportInjection: true,
  },
  // uncomment lines below if we go back to fetching static JSON
  //copy: [{
  //  src: "**/*.i18n.*.json",
  //  dest: "i18n"
  //}]
};
