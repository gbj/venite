import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
//import * as conic from 'postcss-conic-gradient';

export const config: Config = {
  namespace: 'LDF',
  taskQueue: 'async',
  globalStyle: 'src/global/global.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{
        src: "**/*.i18n.*.json",
        dest: "i18n"
      }]
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      copy: [{
        src: "**/*.i18n.*.json",
        dest: "i18n"
      }],
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass()
  ],
  copy: [{
    src: "**/*.i18n.*.json",
    dest: "i18n"
  }]
};
