import { h } from '@stencil/core';
import { LiturgicalDocument, Text, BibleReading, Option, Meditation, Heading, ResponsivePrayer, Rubric, Psalm, Refrain, Liturgy, Image } from '@venite/ldf';
import { MenuOption } from '../../interfaces/menu-option';

export const MENU : MenuOption[] = [
  {
    label: 'alleluia',
    section: ['Liturgy'],
    /* SVG is custom */
    icon: () => (
      <svg version="1.0" width="1800pt" height="1800pt" viewBox="0 0 1791.000000 1416.000000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(0.105514, 0, 0, -0.112496, -64.363647, 1602.779419)" fill="#000000" stroke="none">
    <path d="M9674 12663 c-135 -181 -220 -321 -315 -518 -150 -313 -240 -621 -290 -995 -26 -192 -36 -581 -20 -727 47 -408 203 -768 469 -1083 251 -297 601 -465 1122 -538 103 -14 395 -16 2803 -19 l2689 -3 -49 -58 c-553 -644 -863 -1434 -957 -2438 -43 -457 -46 -1121 -7 -1789 50 -858 67 -1444 52 -1747 -18 -354 -51 -550 -112 -675 -17 -36 -27 -68 -23 -75 6 -10 105 -133 153 -190 4 -4 53 8 111 26 522 165 923 472 1221 936 237 368 367 721 400 1090 18 196 2 620 -37 975 -43 399 -95 651 -234 1141 -145 514 -201 858 -203 1254 -1 247 15 377 68 585 44 172 81 271 164 440 122 247 272 455 511 710 257 273 370 473 439 775 40 173 43 242 39 835 -4 540 -6 576 -27 685 -60 310 -179 525 -355 640 -108 71 -260 120 -487 157 -95 15 -358 17 -3114 23 l-3010 6 -87 21 c-304 75 -486 250 -561 537 l-22 86 -140 0 -140 0 -51 -67z"/>
    <path d="M2135 12450 c-277 -28 -525 -112 -719 -243 -85 -56 -263 -237 -323 -327 -205 -307 -311 -672 -343 -1180 -9 -142 -140 -4233 -140 -4371 l0 -39 233 2 232 3 887 1765 c488 971 933 1862 989 1980 211 445 351 794 417 1039 34 129 36 144 35 291 -2 550 -229 914 -644 1033 -159 46 -431 66 -624 47z"/>
    <path d="M6138 12449 c-633 -56 -1055 -390 -1258 -996 -65 -195 -106 -402 -130 -658 -5 -60 -39 -1048 -74 -2195 -36 -1147 -67 -2136 -70 -2197 l-6 -113 234 0 234 0 920 1833 c506 1007 950 1897 987 1977 232 502 358 829 407 1060 17 82 19 118 15 260 -9 242 -45 398 -133 570 -179 350 -569 509 -1126 459z"/>
    <path d="M10955 6760 c-468 -33 -847 -194 -1163 -495 -310 -295 -511 -705 -597 -1220 -46 -271 -47 -304 -55 -1420 -8 -1149 -6 -1114 -60 -1275 -36 -109 -81 -181 -162 -264 l-77 -80 72 -84 c40 -46 79 -93 88 -104 15 -19 20 -19 148 -8 352 29 716 143 1145 356 589 293 850 669 937 1349 8 61 11 237 8 545 -7 854 -5 1229 9 1350 57 482 211 787 457 905 38 18 78 36 88 39 16 5 17 20 15 163 l-3 158 -85 22 c-196 52 -527 79 -765 63z"/>
  </g>
</svg>
    ),
    template: [
      new Text({ type: 'text', style: 'text', slug: 'alleluia', lookup: { type: 'slug' } })
    ]
  },
  {
    label: 'antiphon',
    section: ['Liturgy'],
    /* SVG is custom */
    icon: () => (<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path d="M 188.161 502.694 L 0 502.694 L 0 431.913 L 35.223 426.737 L 185.061 0 L 316.258 0 L 466.448 426.737 L 501.656 431.913 L 501.656 502.694 L 313.845 502.694 L 313.845 431.913 L 346.641 425.698 L 331.45 371.147 L 169.87 371.147 L 155.365 425.698 L 188.161 431.913 L 188.161 502.694 Z M 243.064 135.686 L 195.414 286.211 L 305.556 286.211 L 256.53 133.96 L 251.003 116.357 L 248.927 116.357 L 243.064 135.686 Z"/></svg>),
    template: [
      new Refrain({ type: 'refrain', style: 'antiphon', value: [''] })
    ]
  },
  {
    label: 'anthem',
    section: ['Music'],
    /* SVG is Font Awesome 'fa-music' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>),
    template: [
      new Heading({
        "type": "heading",
        "style": "text",
        "citation": "Composer",
        "metadata": { level: 3 },
        "value": ["Anthem", "*Title*", ""]
      })
    ]
  },
  {
    label: 'prelude',
    section: ['Music'],
    /* SVG is Font Awesome 'fa-music' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>),
    template: [
      new Heading({
        "type": "heading",
        "style": "text",
        "citation": "Composer",
        "metadata": { level: 3 },
        "value": ["Prelude", "*Title*"]
      })
    ]
  },
  {
    label: 'postlude',
    section: ['Music'],
    /* SVG is Font Awesome 'fa-music' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>),
    template: [
      new Heading({
        "type": "heading",
        "style": "text",
        "citation": "Composer",
        "metadata": { level: 3 },
        "value": ["Postlude", "*Title*"]
      })
    ]
  },
  {
    label: 'bible',
    section: ['Reading'],
    /* SVG is Font Awesome 'fa-bible' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bible" class="svg-inline--fa fa-bible fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 358.4V25.6c0-16-9.6-25.6-25.6-25.6H96C41.6 0 0 41.6 0 96v320c0 54.4 41.6 96 96 96h326.4c12.8 0 25.6-9.6 25.6-25.6v-16c0-6.4-3.2-12.8-9.6-19.2-3.2-16-3.2-60.8 0-73.6 6.4-3.2 9.6-9.6 9.6-19.2zM144 144c0-8.84 7.16-16 16-16h48V80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v48h48c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-48v112c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V192h-48c-8.84 0-16-7.16-16-16v-32zm236.8 304H96c-19.2 0-32-12.8-32-32s16-32 32-32h284.8v64z"></path></svg>),
    template: [ new BibleReading({ type: 'bible-reading', style: 'long', citation: '', value: [{ book: '', chapter: '', verse: '', text: ''}] }) ],
    needsMoreInfo: 'reading'
  },
  {
    label: 'canticle',
    section: ['Propers', 'Liturgy'],
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'canticle', lookup: { type: 'slug' }}) ],
    needsMoreInfo: 'canticle'
  },
  {
    label: 'canticle-blank',
    section: ['Propers', 'Liturgy'],
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="music" class="svg-inline--fa fa-music fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'canticle', value: [{ type: 'psalm-section', value: [{ type: 'psalm-verse', number: '', verse: '', halfverse: ''}]}] }) ],
  },
  {
    label: 'collect_of_the_day',
    section: ['Propers', 'Prayer'],
    /* SVG is Font Awesome 'fa-book-reader' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book-reader" class="svg-inline--fa fa-book-reader fa-w-16" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">   <path fill="currentColor" d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z"/>   <path d="M 452.305 266.272 L 354.918 295.031 C 350.861 296.305 348.099 300.064 348.097 304.317 L 348.097 383.881 C 344.908 383.106 341.639 382.706 338.357 382.687 C 322.226 382.687 309.139 391.41 309.139 402.167 C 309.139 412.923 322.226 421.646 338.357 421.646 C 354.489 421.646 367.576 412.923 367.576 402.167 L 367.576 331.043 L 445.493 308.216 L 445.493 364.404 C 442.304 363.627 439.035 363.226 435.753 363.208 C 419.622 363.208 406.534 371.931 406.534 382.687 C 406.534 393.444 419.622 402.167 435.753 402.167 C 451.884 402.167 464.972 393.447 464.972 382.687 L 464.972 275.552 C 464.966 268.975 458.577 264.295 452.305 266.272 Z"/> </svg>),
    template: [ new Text({ type: 'text', style: 'prayer', lookup: { type: 'collect' } }) ]
  },
  {
    label: 'day',
    section: ['Heading'],
    /* SVG is Font Awesome 'fa-heading' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>),
    template: [ new Heading({ type: 'heading', style: 'day', metadata: { level: 1 }, value: ['Heading'] }) ]
  },
  {
    label: 'date',
    section: ['Heading'],
    /* SVG is Font Awesome 'fa-heading' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>),
    template: [ new Heading({ type: 'heading', style: 'date', metadata: { level: 1 }, value: [''] }) ]
  },
  {
    label: 'eucharistic-prayer',
    section: ['Liturgy', 'Eucharist'],
    /* SVG is Custom */
    icon: () => (<svg version="1.1" x="0px" y="0px" viewBox="0 0 80 100" enable-background="new 0 0 110 110" xmlns="http://www.w3.org/2000/svg">
      <path style={{'stroke': 'currentColor', 'fill': 'none', 'stroke-width': '5px'}} d="M 48.187 64.949 C 54.278 62.171 62.622 58.365 62.622 43.564 C 62.622 43.126 62.264 42.767 61.826 42.767 L 17.239 42.767 C 16.801 42.767 16.443 43.126 16.443 43.564 C 16.443 58.365 24.787 62.171 30.878 64.949 C 34.883 66.772 37.144 67.943 37.144 70.634 L 37.144 79.392 C 37.144 91.343 25.504 94.416 25.01 94.543 C 24.62 94.639 24.365 95.013 24.413 95.411 C 24.461 95.809 24.803 96.112 25.201 96.112 L 53.864 96.112 C 54.262 96.112 54.604 95.809 54.652 95.411 C 54.7 95.013 54.445 94.639 54.055 94.543 C 53.561 94.416 41.921 91.343 41.921 79.392 L 41.921 70.634 C 41.921 67.943 44.182 66.772 48.187 64.949 Z M 49.843 94.52 L 29.222 94.52 C 33.163 92.434 38.736 87.975 38.736 79.392 L 38.736 70.634 C 38.736 66.78 35.4 65.26 31.539 63.5 C 25.639 60.809 18.33 57.473 18.043 44.36 L 26.674 44.36 L 28.601 44.36 L 50.464 44.36 L 52.391 44.36 L 61.022 44.36 C 60.735 57.473 53.426 60.809 47.526 63.5 C 43.665 65.26 40.329 66.78 40.329 70.634 L 40.329 79.392 C 40.329 87.975 45.902 92.434 49.843 94.52 Z"/>
      <circle style={{'stroke': 'currentColor', 'fill': 'none', 'stroke-width': '5px'}} cx="39.227" cy="22.157" r="17.736"/>
      <g transform="matrix(0.87252, 0, 0, 0.87252, -6.447566, 2.07699)">
        <rect x="51.131" y="15.793" width="2" height="12.097" />
        <rect x="51.131" y="15.793" width="2" height="12.097" transform="matrix(0, 1, -1, 0, 74.236961, -30.674677)"/>
      </g>
    </svg>),
    template: [ new Liturgy({ type: 'liturgy', lookup: { type: 'category', rotate: true }, category: ['Eucharistic Prayer'] }) ],
    needsMoreInfo: 'category'
  },
  {
    label: 'gloria_patri',
    section: ['Liturgy'],
    /* SVG is custom */
    icon: () => (<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path d="M 266.116 500 C 215.823 500 173.267 490.209 138.449 470.627 C 103.62 451.046 77.084 423.84 58.839 389.011 C 40.595 354.192 31.474 313.865 31.474 268.03 L 31.474 245.993 C 31.474 197.708 40.483 155.094 58.501 118.155 C 76.527 81.216 102.672 52.289 136.936 31.38 C 171.209 10.46 212.597 0 261.098 0 C 294.26 0 327.529 5.065 360.907 15.195 C 394.284 25.316 423.656 41.278 449.024 63.085 L 449.024 176.9 L 365.571 176.9 L 347.888 115.159 C 340.322 107.366 329.583 100.911 315.674 95.794 C 301.765 90.676 286.136 88.117 268.788 88.117 C 242.083 88.117 219.715 94.737 201.689 107.978 C 183.67 121.218 170.153 139.63 161.135 163.218 C 152.126 186.805 147.622 214.175 147.622 245.329 L 147.622 268.03 C 147.622 297.401 152.353 322.877 161.814 344.457 C 171.266 366.047 185.112 382.736 203.357 394.524 C 221.609 406.322 244.084 412.221 270.781 412.221 C 284.803 412.221 298.712 410.775 312.508 407.882 C 326.303 404.988 337.093 401.761 344.877 398.2 L 344.877 335.454 L 290.146 328.767 L 290.146 247.999 L 462.368 247.999 L 462.368 449.595 C 436.114 466.51 406.464 479.136 373.416 487.476 C 340.378 495.826 304.61 500 266.116 500 Z"/></svg>),
    template: [
      new Refrain({ type: 'refrain', style: 'gloria', slug: 'gloria-patri', lookup: { type: 'slug' } })
    ]
  },
  {
    label: 'heading',
    section: ['Liturgy', 'Heading'],
    /* SVG is Font Awesome 'fa-heading' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heading" class="svg-inline--fa fa-heading fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>),
    template: [ new Heading({ type: 'heading', style: 'text', metadata: { level: 1 }, value: [''] }) ]
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
    label: 'image',
    section: ['Content'],
    /* SVG is Font Awesome 'fa-image' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" class="svg-inline--fa fa-image fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>),
    template: [
      new Image({ type: 'image', value: ['']})
    ],
    needsMoreInfo: 'image'
  },
  {
    label: 'invitatory',
    section: ['Liturgy'],
    icon: () => (<svg version="1.0" width="1065.000000pt" height="1280.000000pt" viewBox="0 0 1065.000000 1280.000000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">    <path d="M 2020 12790 C 1990 12785 1918 12777 1860 12770 C 1623 12744 672.669 12273.564 523 12002 C 316.287 11626.935 -405 9634.932 1000 5598.932 C 1837 3196.932 3560 15 3560 10 C 3560 -3 5211 101 5487 166 C 5827 246 6072 380 6161 534 C 6189 583 9162 2764 9755 3855 C 10133 4550 10348 5103 10493 5760 C 10635 6399 10683 7382 10609 8140 C 10541 8842 10287 9670 9914 10400 C 9873 10480 9840 10548 9840 10551 C 9840 10555 9870 10580 9907 10607 C 10066 10723 10186 10867 10280 11051 L 10333 11156 L 9885 11810 C 9639 12170 9429 12473 9420 12484 C 9403 12501 9399 12499 9314 12418 C 9075 12191 8794 12040 8305 11874 C 7675 11659 7197 11560 6790 11560 C 6350 11560 5829 11648 5170 11835 C 4824 11933 4715 11976 3895 12342 C 3247 12632 2966 12722 2576 12765 C 2499 12774 2402 12785 2362 12790 C 2278 12802 2100 12801 2020 12790 Z M 2236.679 11071.163 C 2314.679 11050.163 3527.302 10462.707 3527.302 10450.707 C 3527.302 10427.707 2669.082 8800 2657.082 8800 C 2651.082 8800 2030.847 9568.173 2000 10084.133 C 1982.133 10382.989 2124.679 11102.163 2236.679 11071.163 Z M 4424 10170 C 4424 10170 5001 10049.652 5000 10027.652 C 5000 9996.652 3551.769 7151.685 3536.769 7151.685 C 3526.769 7151.685 3234 7780 3215 7841 C 3209 7860 4408 10172 4424 10170 Z M 6063 9808 C 6141 9796 6762.015 9806 6764.015 9800 C 6767.015 9793 4380.708 5056.389 4374.708 5058.389 C 4369.708 5060.389 4120 5839 4084 5918 L 4020 6060 C 4020 6060 5983 9800 6000 9800 C 6011 9800 5987 9820 6063 9808 Z M 8060 9680 C 8060 9680 8285 9211 8335 8965 C 8429 8497 8435 7764 8348 7230 C 8264 6707 8090 6270 7707 5610 C 7490 5238 7153 4748 6946 4505 C 6481 3958 5998 3541 5472 3230 C 5367 3169 5346 3160 5335 3171 C 5319 3187 5000 3782 5000 3800 C 5000 3807 7817.247 9800 7817.247 9800 L 8060 9680 Z"/>  </g></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'psalm', lookup: { type: 'slug' }, value: [ { type: 'psalm-section', label: '', value: [{ type: 'psalm-verse', number: '', verse: '', halfverse: '' }]}]}) ],
    needsMoreInfo: 'invitatory'
  },
  {
    label: 'meditation',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-sun' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" class="svg-inline--fa fa-sun fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>),
    template: [ new Meditation({ type: 'meditation', metadata: { length: 300, delay: 0 } }) ]
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
    template: [ new ResponsivePrayer({ type: 'responsive', style: 'litany', value: [ { label: '', text: '', response: '' } ] }) ],
    needsMoreInfo: 'response'
  },
  {
    label: 'liturgy',
    section: ['Liturgy'],
    /* SVG is Font Awesome 'fa-document-medical' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-medical" class="svg-inline--fa fa-file-medical fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 160v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8z"></path></svg>),
    template: [ new Liturgy({}) ],
    needsMoreInfo: 'liturgy-inline'
  },
  {
    label: 'liturgy-template',
    section: ['For Creating Templates'],
    /* SVG is Font Awesome 'fa-document-medical' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-medical" class="svg-inline--fa fa-file-medical fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 160v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8z"></path></svg>),
    template: [ new Liturgy({}) ],
    needsMoreInfo: 'liturgy'
  },
  {
    label: 'offertory-sentence',
    section: ['Liturgy', 'Eucharist'],
    /* SVG is Font Awesome 'fa-comments' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>),
    template: [ new BibleReading({ type: 'bible-reading', style: 'short', lookup: { type: 'category', rotate: true }, category: ['offertory_sentence'] }) ],
    needsMoreInfo: 'category'
  },
  {
    label: 'opening-sentence',
    section: ['Liturgy'],
    /* SVG is Font Awesome 'fa-comments' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>),
    template: [ new BibleReading({ type: 'bible-reading', style: 'short', lookup: { type: 'category', filter: 'seasonal', rotate: true }, category: ['Opening Sentence'] }) ],
    needsMoreInfo: 'category'
  },
  {
    label: 'our-father',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-praying-hands' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="praying-hands" class="svg-inline--fa fa-praying-hands fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M272 191.91c-17.6 0-32 14.4-32 32v80c0 8.84-7.16 16-16 16s-16-7.16-16-16v-76.55c0-17.39 4.72-34.47 13.69-49.39l77.75-129.59c9.09-15.16 4.19-34.81-10.97-43.91-14.45-8.67-32.72-4.3-42.3 9.21-.2.23-.62.21-.79.48l-117.26 175.9C117.56 205.9 112 224.31 112 243.29v80.23l-90.12 30.04A31.974 31.974 0 0 0 0 383.91v96c0 10.82 8.52 32 32 32 2.69 0 5.41-.34 8.06-1.03l179.19-46.62C269.16 449.99 304 403.8 304 351.91v-128c0-17.6-14.4-32-32-32zm346.12 161.73L528 323.6v-80.23c0-18.98-5.56-37.39-16.12-53.23L394.62 14.25c-.18-.27-.59-.24-.79-.48-9.58-13.51-27.85-17.88-42.3-9.21-15.16 9.09-20.06 28.75-10.97 43.91l77.75 129.59c8.97 14.92 13.69 32 13.69 49.39V304c0 8.84-7.16 16-16 16s-16-7.16-16-16v-80c0-17.6-14.4-32-32-32s-32 14.4-32 32v128c0 51.89 34.84 98.08 84.75 112.34l179.19 46.62c2.66.69 5.38 1.03 8.06 1.03 23.48 0 32-21.18 32-32v-96c0-13.77-8.81-25.99-21.88-30.35z"></path></svg>),
    template: [ new Option({
      "value": [
        new Text({
          "type": "text",
          "version_label": "Traditional",
          "display_format": "unison",
          "category": [],
          "value": [
            "Our Father, who art in heaven,\n\thallowed be thy Name,\n\tthy kingdom come,\n\tthy will be done,\n\ton earth as it is in heaven.\nGive us this day our daily bread.\nAnd forgive us our trespasses,\n\tas we forgive those\n\twho trespass against us.\nAnd lead us not into temptation,\n\tbut deliver us from evil.\nFor thine is the kingdom,\n\tand the power, and the glory,\n\tfor ever and ever."
          ],
          "label": "The Lord’s Prayer",
          "source": {
            "citation": "",
            "api": "",
            "source": ""
          },
          "hidden": false,
          "style": "prayer"
        }),
        new Text({
          "style": "prayer",
          "category": [],
          "display_format": "unison",
          "value": [
            "Our Father in heaven,\n\thallowed be your Name,\n\tyour kingdom come,\n\tyour will be done,\n\ton earth as in heaven.\nGive us today our daily bread.\nForgive us our sins,\n\tas we forgive those\n\twho sin against us.\nSave us from the time of trial,\n\tand deliver us from evil.\nFor the kingdom, the power,\n\tand the glory are yours,\n\tnow and for ever."
          ],
          "label": "The Lord’s Prayer",
          "type": "text",
          "hidden": false,
          "version_label": "Contemporary"
        })
      ],
      "metadata": {
        "editor_selected": 0,
        "selected": 0
      },
      "hidden": false,
      "type": "option"
    }) ]
  },
  {
    label: 'closing-sentence',
    section: ['Liturgy'],
    /* SVG is Font Awesome 'fa-comments' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>),
    template: [ new BibleReading({ type: 'bible-reading', style: 'short', lookup: { type: 'category', rotate: true }, category: ['Closing Sentence'] }) ],
    needsMoreInfo: 'category'
  },
  {
    label: 'prayers-of-the-people',
    section: ['Prayer', 'Eucharist'],
    /* SVG is Font Awesome 'fa-comments' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg>),
    template: [ new ResponsivePrayer({ type: 'responsive', style: 'responsive', lookup: { type: 'category', rotate: true }, category: ['Prayers of the People'] }) ],
    needsMoreInfo: 'category'
  },
  {
    label: 'prayer',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-praying-hands' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="praying-hands" class="svg-inline--fa fa-praying-hands fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M272 191.91c-17.6 0-32 14.4-32 32v80c0 8.84-7.16 16-16 16s-16-7.16-16-16v-76.55c0-17.39 4.72-34.47 13.69-49.39l77.75-129.59c9.09-15.16 4.19-34.81-10.97-43.91-14.45-8.67-32.72-4.3-42.3 9.21-.2.23-.62.21-.79.48l-117.26 175.9C117.56 205.9 112 224.31 112 243.29v80.23l-90.12 30.04A31.974 31.974 0 0 0 0 383.91v96c0 10.82 8.52 32 32 32 2.69 0 5.41-.34 8.06-1.03l179.19-46.62C269.16 449.99 304 403.8 304 351.91v-128c0-17.6-14.4-32-32-32zm346.12 161.73L528 323.6v-80.23c0-18.98-5.56-37.39-16.12-53.23L394.62 14.25c-.18-.27-.59-.24-.79-.48-9.58-13.51-27.85-17.88-42.3-9.21-15.16 9.09-20.06 28.75-10.97 43.91l77.75 129.59c8.97 14.92 13.69 32 13.69 49.39V304c0 8.84-7.16 16-16 16s-16-7.16-16-16v-80c0-17.6-14.4-32-32-32s-32 14.4-32 32v128c0 51.89 34.84 98.08 84.75 112.34l179.19 46.62c2.66.69 5.38 1.03 8.06 1.03 23.48 0 32-21.18 32-32v-96c0-13.77-8.81-25.99-21.88-30.35z"></path></svg>),
    template: [ new LiturgicalDocument({ type: 'text', style: 'prayer', value: [''] }) ]
  },
  {
    label: 'authorized-prayers',
    section: ['Prayer'],
    /* SVG is Font Awesome 'fa-praying-hands' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="praying-hands" class="svg-inline--fa fa-praying-hands fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M272 191.91c-17.6 0-32 14.4-32 32v80c0 8.84-7.16 16-16 16s-16-7.16-16-16v-76.55c0-17.39 4.72-34.47 13.69-49.39l77.75-129.59c9.09-15.16 4.19-34.81-10.97-43.91-14.45-8.67-32.72-4.3-42.3 9.21-.2.23-.62.21-.79.48l-117.26 175.9C117.56 205.9 112 224.31 112 243.29v80.23l-90.12 30.04A31.974 31.974 0 0 0 0 383.91v96c0 10.82 8.52 32 32 32 2.69 0 5.41-.34 8.06-1.03l179.19-46.62C269.16 449.99 304 403.8 304 351.91v-128c0-17.6-14.4-32-32-32zm346.12 161.73L528 323.6v-80.23c0-18.98-5.56-37.39-16.12-53.23L394.62 14.25c-.18-.27-.59-.24-.79-.48-9.58-13.51-27.85-17.88-42.3-9.21-15.16 9.09-20.06 28.75-10.97 43.91l77.75 129.59c8.97 14.92 13.69 32 13.69 49.39V304c0 8.84-7.16 16-16 16s-16-7.16-16-16v-80c0-17.6-14.4-32-32-32s-32 14.4-32 32v128c0 51.89 34.84 98.08 84.75 112.34l179.19 46.62c2.66.69 5.38 1.03 8.06 1.03 23.48 0 32-21.18 32-32v-96c0-13.77-8.81-25.99-21.88-30.35z"></path></svg>),
    template: [ new LiturgicalDocument({ type: 'text', style: 'authorized-prayers' }) ]
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
    label: 'proper-preface',
    section: ['Liturgy'],
    icon: () => (<svg viewBox="0 -192 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m320 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0"/><path d="m128 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0"/><path d="m512 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0"/></svg>),
    template: [ new Text({ type: 'text', style: 'text', lookup: { type: 'slug', filter: 'seasonal', rotate: true }, slug: 'proper_preface' }) ],
    needsMoreInfo: 'slug'
  },
  {
    label: 'psalm',
    section: ['Liturgy', 'Reading'],
    icon: () => (<svg version="1.0" width="1065.000000pt" height="1280.000000pt" viewBox="0 0 1065.000000 1280.000000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">    <path d="M 2020 12790 C 1990 12785 1918 12777 1860 12770 C 1623 12744 672.669 12273.564 523 12002 C 316.287 11626.935 -405 9634.932 1000 5598.932 C 1837 3196.932 3560 15 3560 10 C 3560 -3 5211 101 5487 166 C 5827 246 6072 380 6161 534 C 6189 583 9162 2764 9755 3855 C 10133 4550 10348 5103 10493 5760 C 10635 6399 10683 7382 10609 8140 C 10541 8842 10287 9670 9914 10400 C 9873 10480 9840 10548 9840 10551 C 9840 10555 9870 10580 9907 10607 C 10066 10723 10186 10867 10280 11051 L 10333 11156 L 9885 11810 C 9639 12170 9429 12473 9420 12484 C 9403 12501 9399 12499 9314 12418 C 9075 12191 8794 12040 8305 11874 C 7675 11659 7197 11560 6790 11560 C 6350 11560 5829 11648 5170 11835 C 4824 11933 4715 11976 3895 12342 C 3247 12632 2966 12722 2576 12765 C 2499 12774 2402 12785 2362 12790 C 2278 12802 2100 12801 2020 12790 Z M 2236.679 11071.163 C 2314.679 11050.163 3527.302 10462.707 3527.302 10450.707 C 3527.302 10427.707 2669.082 8800 2657.082 8800 C 2651.082 8800 2030.847 9568.173 2000 10084.133 C 1982.133 10382.989 2124.679 11102.163 2236.679 11071.163 Z M 4424 10170 C 4424 10170 5001 10049.652 5000 10027.652 C 5000 9996.652 3551.769 7151.685 3536.769 7151.685 C 3526.769 7151.685 3234 7780 3215 7841 C 3209 7860 4408 10172 4424 10170 Z M 6063 9808 C 6141 9796 6762.015 9806 6764.015 9800 C 6767.015 9793 4380.708 5056.389 4374.708 5058.389 C 4369.708 5060.389 4120 5839 4084 5918 L 4020 6060 C 4020 6060 5983 9800 6000 9800 C 6011 9800 5987 9820 6063 9808 Z M 8060 9680 C 8060 9680 8285 9211 8335 8965 C 8429 8497 8435 7764 8348 7230 C 8264 6707 8090 6270 7707 5610 C 7490 5238 7153 4748 6946 4505 C 6481 3958 5998 3541 5472 3230 C 5367 3169 5346 3160 5335 3171 C 5319 3187 5000 3782 5000 3800 C 5000 3807 7817.247 9800 7817.247 9800 L 8060 9680 Z"/>  </g></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'psalm', lookup: { type: 'slug' }, value: [ { type: 'psalm-section', label: '', value: [{ type: 'psalm-verse', number: '', verse: '', halfverse: '' }]}]}) ],
    needsMoreInfo: 'psalm'
  },
  {
    label: 'psalm-template',
    section: ['For Creating Templates'],
    icon: () => (<svg version="1.0" width="1065.000000pt" height="1280.000000pt" viewBox="0 0 1065.000000 1280.000000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">  <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">    <path d="M 2020 12790 C 1990 12785 1918 12777 1860 12770 C 1623 12744 672.669 12273.564 523 12002 C 316.287 11626.935 -405 9634.932 1000 5598.932 C 1837 3196.932 3560 15 3560 10 C 3560 -3 5211 101 5487 166 C 5827 246 6072 380 6161 534 C 6189 583 9162 2764 9755 3855 C 10133 4550 10348 5103 10493 5760 C 10635 6399 10683 7382 10609 8140 C 10541 8842 10287 9670 9914 10400 C 9873 10480 9840 10548 9840 10551 C 9840 10555 9870 10580 9907 10607 C 10066 10723 10186 10867 10280 11051 L 10333 11156 L 9885 11810 C 9639 12170 9429 12473 9420 12484 C 9403 12501 9399 12499 9314 12418 C 9075 12191 8794 12040 8305 11874 C 7675 11659 7197 11560 6790 11560 C 6350 11560 5829 11648 5170 11835 C 4824 11933 4715 11976 3895 12342 C 3247 12632 2966 12722 2576 12765 C 2499 12774 2402 12785 2362 12790 C 2278 12802 2100 12801 2020 12790 Z M 2236.679 11071.163 C 2314.679 11050.163 3527.302 10462.707 3527.302 10450.707 C 3527.302 10427.707 2669.082 8800 2657.082 8800 C 2651.082 8800 2030.847 9568.173 2000 10084.133 C 1982.133 10382.989 2124.679 11102.163 2236.679 11071.163 Z M 4424 10170 C 4424 10170 5001 10049.652 5000 10027.652 C 5000 9996.652 3551.769 7151.685 3536.769 7151.685 C 3526.769 7151.685 3234 7780 3215 7841 C 3209 7860 4408 10172 4424 10170 Z M 6063 9808 C 6141 9796 6762.015 9806 6764.015 9800 C 6767.015 9793 4380.708 5056.389 4374.708 5058.389 C 4369.708 5060.389 4120 5839 4084 5918 L 4020 6060 C 4020 6060 5983 9800 6000 9800 C 6011 9800 5987 9820 6063 9808 Z M 8060 9680 C 8060 9680 8285 9211 8335 8965 C 8429 8497 8435 7764 8348 7230 C 8264 6707 8090 6270 7707 5610 C 7490 5238 7153 4748 6946 4505 C 6481 3958 5998 3541 5472 3230 C 5367 3169 5346 3160 5335 3171 C 5319 3187 5000 3782 5000 3800 C 5000 3807 7817.247 9800 7817.247 9800 L 8060 9680 Z"/>  </g></svg>),
    template: [ new Psalm({ type: 'psalm', style: 'psalm', slug: 'psalm_', lookup: { type: 'slug' }, version: { preference: "psalterVersion" } }) ],
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
    label: 'rich-text',
    section: ['Content'],
    /* SVG is Font Awesome 'fa-file' */
    icon: () => (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file" class="svg-inline--fa fa-file fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>),
    template: [ new Text({ type: 'text', style: 'markdown', value: [''] })]
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
