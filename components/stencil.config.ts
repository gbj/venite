import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

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
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [ sass() ],
  copy: [{
    src: "**/*.i18n.*.json",
    dest: "i18n"
  }]
};
