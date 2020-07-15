import { h } from '@stencil/core';
import { LiturgicalDocument, Text, BibleReading, Meditation, Heading, ResponsivePrayer, Rubric, Psalm, Refrain } from '@venite/ldf';
import { MenuOption } from '../../interfaces/menu-option';

export const MENU : MenuOption[] = [
  {
    label: 'alleluia',
    section: ['Liturgy'],
    /* SVG is custom */
    icon: () => (<svg></svg>),
    template: [
      new Text({ type: 'text', style: 'text', slug: 'alleluia', lookup: { type: 'slug' } })
    ]
  },
  {
    label: 'anthem',
    section: ['Music'],
    /* SVG is Font Awesome 'fa-music' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>),
    template: [
      new Heading({ type: 'heading', label: 'Anthem', citation: '', value: [''] }),
      new Text({ type: 'text', metadata: { response: '', omit_response: true }, value: [''] })
    ]
  },
  {
    label: 'bible',
    section: ['Reading'],
    /* SVG is Font Awesome 'fa-bible' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bible" class="svg-inline--fa fa-bible fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 358.4V25.6c0-16-9.6-25.6-25.6-25.6H96C41.6 0 0 41.6 0 96v320c0 54.4 41.6 96 96 96h326.4c12.8 0 25.6-9.6 25.6-25.6v-16c0-6.4-3.2-12.8-9.6-19.2-3.2-16-3.2-60.8 0-73.6 6.4-3.2 9.6-9.6 9.6-19.2zM144 144c0-8.84 7.16-16 16-16h48V80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v48h48c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-48v112c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V192h-48c-8.84 0-16-7.16-16-16v-32zm236.8 304H96c-19.2 0-32-12.8-32-32s16-32 32-32h284.8v64z"></path></svg>),
    template: [ new BibleReading({ type: 'bible-reading', style: 'long', value: [] }) ]
  },
  {
    label: 'canticle',
    section: ['Liturgy', 'Propers'],
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'canticle' }) ],
    needsMoreInfo: 'canticle'
  },
  {
    label: 'collect_of_the_day',
    section: ['Propers', 'Prayer'],
    /* SVG is Font Awesome 'fa-book-reader' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book-reader" class="svg-inline--fa fa-book-reader fa-w-16" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">   <path fill="currentColor" d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z"/>   <path d="M 452.305 266.272 L 354.918 295.031 C 350.861 296.305 348.099 300.064 348.097 304.317 L 348.097 383.881 C 344.908 383.106 341.639 382.706 338.357 382.687 C 322.226 382.687 309.139 391.41 309.139 402.167 C 309.139 412.923 322.226 421.646 338.357 421.646 C 354.489 421.646 367.576 412.923 367.576 402.167 L 367.576 331.043 L 445.493 308.216 L 445.493 364.404 C 442.304 363.627 439.035 363.226 435.753 363.208 C 419.622 363.208 406.534 371.931 406.534 382.687 C 406.534 393.444 419.622 402.167 435.753 402.167 C 451.884 402.167 464.972 393.447 464.972 382.687 L 464.972 275.552 C 464.966 268.975 458.577 264.295 452.305 266.272 Z"/> </svg>),
    template: [ new Text({ type: 'text', style: 'prayer', lookup: { type: 'collect' } }) ]
  },
  {
    label: 'gloria_patri',
    section: ['Liturgy'],
    /* SVG is custom */
    icon: () => (<svg></svg>),
    template: [
      new Refrain({ type: 'refrain', style: 'gloria', slug: 'gloria-patri', lookup: { type: 'slug' } })
    ]
  },
  {
    label: 'heading',
    section: ['Liturgy'],
    /* SVG is Font Awesome 'fa-heading' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heading" class="svg-inline--fa fa-heading fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>),
    template: [ new Heading({ type: 'heading', metadata: { level: 1 }, label: '', citation: '', value: [''] }) ]
  },
  {
    label: 'hymn',
    section: ['Music'],
    /* SVG is Font Awesome 'fa-bible' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book-reader" class="svg-inline--fa fa-book-reader fa-w-16" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z"/>
      <path d="M 452.305 266.272 L 354.918 295.031 C 350.861 296.305 348.099 300.064 348.097 304.317 L 348.097 383.881 C 344.908 383.106 341.639 382.706 338.357 382.687 C 322.226 382.687 309.139 391.41 309.139 402.167 C 309.139 412.923 322.226 421.646 338.357 421.646 C 354.489 421.646 367.576 412.923 367.576 402.167 L 367.576 331.043 L 445.493 308.216 L 445.493 364.404 C 442.304 363.627 439.035 363.226 435.753 363.208 C 419.622 363.208 406.534 371.931 406.534 382.687 C 406.534 393.444 419.622 402.167 435.753 402.167 C 451.884 402.167 464.972 393.447 464.972 382.687 L 464.972 275.552 C 464.966 268.975 458.577 264.295 452.305 266.272 Z" style={{'mix-blend-mode': 'exclusion', 'fill': 'rgb(255, 255, 255)'}}/>
    </svg>),
    template: [
      new Heading({ type: 'heading', label: 'Hymn', citation: '', value: [''] })
    ],
    needsMoreInfo: 'hymn'
  },
  {
    label: 'meditation',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-sun' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" class="svg-inline--fa fa-sun fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>),
    template: [ new Meditation({ type: 'meditation', metadata: { length: 10, delay: 0 } }) ]
  },
  {
    label: 'lectionary-reading',
    section: ['Propers', 'Reading'],
    /* SVG is Font Awesome 'fa-bible' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bible" class="svg-inline--fa fa-bible fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 358.4V25.6c0-16-9.6-25.6-25.6-25.6H96C41.6 0 0 41.6 0 96v320c0 54.4 41.6 96 96 96h326.4c12.8 0 25.6-9.6 25.6-25.6v-16c0-6.4-3.2-12.8-9.6-19.2-3.2-16-3.2-60.8 0-73.6 6.4-3.2 9.6-9.6 9.6-19.2zM144 144c0-8.84 7.16-16 16-16h48V80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v48h48c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-48v112c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V192h-48c-8.84 0-16-7.16-16-16v-32zm236.8 304H96c-19.2 0-32-12.8-32-32s16-32 32-32h284.8v64z"></path></svg>),
    template: [ new BibleReading({ type: 'bible-reading', style: 'long', lookup: { type: 'lectionary', table: { preference: 'lectionary' }, item: 'first_reading' } }) ],
    needsMoreInfo: 'lectionary'
  },
  {
    label: 'litany',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-comments' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>),
    template: [ new ResponsivePrayer({ type: 'responsive', style: 'litany', value: [ { label: '', text: '', response: '' } ] }) ]
  },
  {
    label: 'opening-sentence',
    section: ['Liturgy'],
    /* SVG is Font Awesome 'fa-comments' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>),
    template: [ new BibleReading({ type: 'bible-reading', style: 'short', lookup: { type: 'category', filter: 'seasonal', rotate: true }, category: ['Opening Sentence'] }) ]
  },
  {
    label: 'prayer',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-praying-hands' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="praying-hands" class="svg-inline--fa fa-praying-hands fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M272 191.91c-17.6 0-32 14.4-32 32v80c0 8.84-7.16 16-16 16s-16-7.16-16-16v-76.55c0-17.39 4.72-34.47 13.69-49.39l77.75-129.59c9.09-15.16 4.19-34.81-10.97-43.91-14.45-8.67-32.72-4.3-42.3 9.21-.2.23-.62.21-.79.48l-117.26 175.9C117.56 205.9 112 224.31 112 243.29v80.23l-90.12 30.04A31.974 31.974 0 0 0 0 383.91v96c0 10.82 8.52 32 32 32 2.69 0 5.41-.34 8.06-1.03l179.19-46.62C269.16 449.99 304 403.8 304 351.91v-128c0-17.6-14.4-32-32-32zm346.12 161.73L528 323.6v-80.23c0-18.98-5.56-37.39-16.12-53.23L394.62 14.25c-.18-.27-.59-.24-.79-.48-9.58-13.51-27.85-17.88-42.3-9.21-15.16 9.09-20.06 28.75-10.97 43.91l77.75 129.59c8.97 14.92 13.69 32 13.69 49.39V304c0 8.84-7.16 16-16 16s-16-7.16-16-16v-80c0-17.6-14.4-32-32-32s-32 14.4-32 32v128c0 51.89 34.84 98.08 84.75 112.34l179.19 46.62c2.66.69 5.38 1.03 8.06 1.03 23.48 0 32-21.18 32-32v-96c0-13.77-8.81-25.99-21.88-30.35z"></path></svg>),
    template: [ new LiturgicalDocument({ type: 'text', style: 'prayer', value: [''] }) ]
  },
  {
    label: 'preces',
    section: ['Prayer'],
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heading" class="svg-inline--fa fa-heading fa-w-16" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M 300 417.636 L 321.64 478.088 C 312.803 478.088 172 478.448 172 478.448 C 163.163 478.448 156 471.285 156 462.448 L 156 430.448 C 156 421.611 163.163 414.448 172 414.448 L 204 414.448 L 64 96 L 32 96 C 23.163 96 16 88.837 16 80 L 16 48 C 16 39.163 23.163 32 32 32 L 192 32 C 200.837 32 208 39.163 208 48 L 208 80 C 208 88.837 200.837 96 192 96 L 160 96 L 300 417.636 Z"/>
        <path d="M 478.36 92.37 L 338.36 414.006 L 370.36 414.006 C 379.197 414.006 386.36 421.169 386.36 430.006 L 386.36 462.006 C 386.36 470.843 379.197 478.006 370.36 478.006 L 210.36 478.006 C 201.523 478.006 194.36 470.843 194.36 462.006 L 194.36 430.006 C 194.36 421.169 201.523 414.006 210.36 414.006 L 242.36 414.006 L 382.36 95.558 L 350.36 95.558 C 341.523 95.558 334.36 88.395 334.36 79.558 L 334.36 47.558 C 334.36 38.721 341.523 31.558 350.36 31.558 C 350.36 31.558 491.163 31.918 500 31.918 L 478.36 92.37 Z" transform="matrix(-1, 0, 0, -1, 694.360016, 509.563999)"/>
      </g>
      <rect x="34.732" y="241.922" width="37.032" height="421.205" transform="matrix(0.933762, 0.357895, -0.39883, 0.918072, 315.298737, -194.739899)"/>
    </svg>),
    template: [ new ResponsivePrayer({ type: 'responsive', style: 'preces', value: [ { label: '', text: '', response: '' } ] }) ]
  },
  {
    label: 'psalm',
    section: ['Liturgy', 'Reading'],
    icon: () => (<svg version="1.0" width="1065.000000pt" height="1280.000000pt" viewBox="0 0 1065.000000 1280.000000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">    <path d="M 2020 12790 C 1990 12785 1918 12777 1860 12770 C 1623 12744 672.669 12273.564 523 12002 C 316.287 11626.935 -405 9634.932 1000 5598.932 C 1837 3196.932 3560 15 3560 10 C 3560 -3 5211 101 5487 166 C 5827 246 6072 380 6161 534 C 6189 583 9162 2764 9755 3855 C 10133 4550 10348 5103 10493 5760 C 10635 6399 10683 7382 10609 8140 C 10541 8842 10287 9670 9914 10400 C 9873 10480 9840 10548 9840 10551 C 9840 10555 9870 10580 9907 10607 C 10066 10723 10186 10867 10280 11051 L 10333 11156 L 9885 11810 C 9639 12170 9429 12473 9420 12484 C 9403 12501 9399 12499 9314 12418 C 9075 12191 8794 12040 8305 11874 C 7675 11659 7197 11560 6790 11560 C 6350 11560 5829 11648 5170 11835 C 4824 11933 4715 11976 3895 12342 C 3247 12632 2966 12722 2576 12765 C 2499 12774 2402 12785 2362 12790 C 2278 12802 2100 12801 2020 12790 Z M 2236.679 11071.163 C 2314.679 11050.163 3527.302 10462.707 3527.302 10450.707 C 3527.302 10427.707 2669.082 8800 2657.082 8800 C 2651.082 8800 2030.847 9568.173 2000 10084.133 C 1982.133 10382.989 2124.679 11102.163 2236.679 11071.163 Z M 4424 10170 C 4424 10170 5001 10049.652 5000 10027.652 C 5000 9996.652 3551.769 7151.685 3536.769 7151.685 C 3526.769 7151.685 3234 7780 3215 7841 C 3209 7860 4408 10172 4424 10170 Z M 6063 9808 C 6141 9796 6762.015 9806 6764.015 9800 C 6767.015 9793 4380.708 5056.389 4374.708 5058.389 C 4369.708 5060.389 4120 5839 4084 5918 L 4020 6060 C 4020 6060 5983 9800 6000 9800 C 6011 9800 5987 9820 6063 9808 Z M 8060 9680 C 8060 9680 8285 9211 8335 8965 C 8429 8497 8435 7764 8348 7230 C 8264 6707 8090 6270 7707 5610 C 7490 5238 7153 4748 6946 4505 C 6481 3958 5998 3541 5472 3230 C 5367 3169 5346 3160 5335 3171 C 5319 3187 5000 3782 5000 3800 C 5000 3807 7817.247 9800 7817.247 9800 L 8060 9680 Z"/>  </g></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'psalm', value: [ { type: 'psalm-section', label: '', value: [{ type: 'psalm-verse', number: '', verse: '', halfverse: '' }]}]}) ],
    needsMoreInfo: 'psalm'
  },
  {
    label: 'psalter',
    section: ['Liturgy', 'Propers', 'Reading'],
    icon: () => (<svg version="1.0" width="1065.000000pt" height="1280.000000pt" viewBox="0 0 1065.000000 1280.000000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">    <path d="M 2020 12790 C 1990 12785 1918 12777 1860 12770 C 1623 12744 672.669 12273.564 523 12002 C 316.287 11626.935 -405 9634.932 1000 5598.932 C 1837 3196.932 3560 15 3560 10 C 3560 -3 5211 101 5487 166 C 5827 246 6072 380 6161 534 C 6189 583 9162 2764 9755 3855 C 10133 4550 10348 5103 10493 5760 C 10635 6399 10683 7382 10609 8140 C 10541 8842 10287 9670 9914 10400 C 9873 10480 9840 10548 9840 10551 C 9840 10555 9870 10580 9907 10607 C 10066 10723 10186 10867 10280 11051 L 10333 11156 L 9885 11810 C 9639 12170 9429 12473 9420 12484 C 9403 12501 9399 12499 9314 12418 C 9075 12191 8794 12040 8305 11874 C 7675 11659 7197 11560 6790 11560 C 6350 11560 5829 11648 5170 11835 C 4824 11933 4715 11976 3895 12342 C 3247 12632 2966 12722 2576 12765 C 2499 12774 2402 12785 2362 12790 C 2278 12802 2100 12801 2020 12790 Z M 2236.679 11071.163 C 2314.679 11050.163 3527.302 10462.707 3527.302 10450.707 C 3527.302 10427.707 2669.082 8800 2657.082 8800 C 2651.082 8800 2030.847 9568.173 2000 10084.133 C 1982.133 10382.989 2124.679 11102.163 2236.679 11071.163 Z M 4424 10170 C 4424 10170 5001 10049.652 5000 10027.652 C 5000 9996.652 3551.769 7151.685 3536.769 7151.685 C 3526.769 7151.685 3234 7780 3215 7841 C 3209 7860 4408 10172 4424 10170 Z M 6063 9808 C 6141 9796 6762.015 9806 6764.015 9800 C 6767.015 9793 4380.708 5056.389 4374.708 5058.389 C 4369.708 5060.389 4120 5839 4084 5918 L 4020 6060 C 4020 6060 5983 9800 6000 9800 C 6011 9800 5987 9820 6063 9808 Z M 8060 9680 C 8060 9680 8285 9211 8335 8965 C 8429 8497 8435 7764 8348 7230 C 8264 6707 8090 6270 7707 5610 C 7490 5238 7153 4748 6946 4505 C 6481 3958 5998 3541 5472 3230 C 5367 3169 5346 3160 5335 3171 C 5319 3187 5000 3782 5000 3800 C 5000 3807 7817.247 9800 7817.247 9800 L 8060 9680 Z"/>  </g></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'psalm', lookup: { type: 'lectionary', table: { preference: 'psalter' }, item: 'morning_psalms' } }) ],
    needsMoreInfo: 'lectionary'
  },
  {
    label: 'responsive',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-align-left', inverted */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-left" class="svg-inline--fa fa-align-left fa-w-14" role="img" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M 12.83 160 L 275.17 160 C 282.258 159.994 288.006 165.742 288 172.83 L 288 211.17 C 288.006 218.258 282.258 224.006 275.17 224 L 12.83 224 C 5.742 224.006 -0.006 218.258 0 211.17 L 0 172.83 C -0.006 165.742 5.742 159.994 12.83 160 Z M 12.83 416 L 275.17 416 C 282.258 415.994 288.006 421.742 288 428.83 L 288 467.17 C 288.006 474.258 282.258 480.006 275.17 480 L 12.83 480 C 5.742 480.006 -0.006 474.258 0 467.17 L 0 428.83 C -0.006 421.742 5.742 415.994 12.83 416 Z M 432 352 L 16 352 C 7.163 352 0 344.837 0 336 L 0 304 C 0 295.163 7.163 288 16 288 L 432 288 C 440.837 288 448 295.163 448 304 L 448 336 C 448 344.837 440.837 352 432 352 Z M 432 96 L 16 96 C 7.163 96 0 88.837 0 80 L 0 48 C 0 39.163 7.163 32 16 32 L 432 32 C 440.837 32 448 39.163 448 48 L 448 80 C 448 88.837 440.837 96 432 96 Z"/>
    </svg>),
    template: [ new ResponsivePrayer({ type: 'responsive', style: 'responsive', value: [ { label: '', text: '', response: '' } ] }) ]
  },
  {
    label: 'rubric',
    section: ['Liturgy'],
    /* SVG is Font Awesome 'fa-directions' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="directions" class="svg-inline--fa fa-directions fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z"></path></svg>),
    template: [ new Rubric({ type: 'rubric', value: [''] }) ]
  },
  {
    label: 'text',
    section: ['Liturgy'],
    /* SVG is Font Awesome 'fa-paragraph' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paragraph" class="svg-inline--fa fa-paragraph fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 48v32a16 16 0 0 1-16 16h-48v368a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V96h-32v368a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V352h-32a160 160 0 0 1 0-320h240a16 16 0 0 1 16 16z"></path></svg>),
    template: [ new Text({ type: 'text', style: 'text', value: [''] }) ]
  },
]
