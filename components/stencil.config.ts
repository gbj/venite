import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
//import * as conic from 'postcss-conic-gradient';

export const config: Config = {
  namespace: 'LDF',
  taskQueue: 'async',
  globalStyle: 'src/global/global.scss',
  /*commonjs: {
    namedExports: {
      '@venite/ldf': [
          'BibleReading', 'BibleReadingVerse',
          'HolyDay', 'LiturgicalColor', 'LiturgicalDay', 'LiturgicalWeek', 'Proper',
          'Citation', 'SelectableCitation', 'Source',
          'Change', 'Cursor', 'User',
          'ClientPreferences', 'Liturgy', 'Preference',
          'Sharing',
          'Category', 'Condition', 'Heading', 'LiturgicalDocument', 'Option', 'Psalm',
          'Refrain', 'ResponsivePrayer', 'Rubric', 'Text'
      ]
    }
  },*/
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
    sass(),
    /*postcss({
      plugins: [conic()]
    })*/
  ],
  copy: [{
    src: "**/*.i18n.*.json",
    dest: "i18n"
  }]
};
