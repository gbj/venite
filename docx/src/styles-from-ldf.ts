import { LiturgicalDocument } from "@venite/ldf/dist/cjs";
import { AlignmentType, IStylesOptions } from "docx";
import { LDFStyles } from "./ldf-styles";

export function stylesFromLDF(inDoc : LiturgicalDocument) : IStylesOptions {
  return STYLES;
}

const STYLES = {
  characterStyles: [
    {
      id: LDFStyles.Response,
      name: 'Response',
      run: {
        bold: true
      }
    },
    {
      id: LDFStyles.Citation,
      name: 'Citation',
      run: {
        italics: true
      }
    },
    {
      id: 'ResponsivePrayerLabel',
      name: 'Responsive Prayer Label',
      run: {
        italics: true
      }
    },
    {
      id: 'VerseNumber',
      name: 'Verse Number',
      run: {
        superScript: true
      }
    }
  ],
  paragraphStyles: [
    {
      id: LDFStyles.Normal,
      name: 'Normal',
      run: {
        font: 'Garamond',
        size: 24
      },
      paragraph: {
          spacing: {
              after: 120
          }
      }
    },
    {
      id: 'Antiphon',
      name: 'Antiphon',
      run: {
        font: 'Garamond',
        size: 24,
        italics: true
      },
      paragraph: {
          spacing: {
              after: 120
          }
      }
    },
    {
      id: 'Title',
      name: 'Title',
      run: {
        font: 'Garamond',
        size: 56,
        color: '000000',
      },
      paragraph: {
          spacing: {
              after: 240
          },
          alignment: AlignmentType.CENTER
      }
    },
    {
      id: 'Heading_1',
      name: 'Heading 1',
      run: {
        font: 'Garamond',
        size: 32,
        color: '000000',
        bold: true
      },
      paragraph: {
          spacing: {
              after: 240,
              before: 240
          }
      }
    },
    {
      id: 'Heading_2',
      name: 'Heading 2',
      run: {
        font: 'Garamond',
        size: 24,
        color: '000000',
        bold: true
      },
      paragraph: {
          spacing: {
              after: 240,
              before: 240
          }
      }
    },
    {
      id: 'Heading_3',
      name: 'Heading 3',
      run: {
        font: 'Garamond',
        size: 24,
        color: '000000',
        italics: true
      },
      paragraph: {
          spacing: {
              after: 240
          }
      }
    },
    {
      id: LDFStyles.Response,
      name: 'Response',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        bold: true
      }
    },
    {
      id: 'Rubric',
      name: 'Rubric',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        italics: true,
        color: 'CC0000'
      },
      paragraph: {
          spacing: {
              after: 120
          }
      }
    },
    {
      id: 'Psalm',
      name: 'Psalm',
      basedOn: 'Normal',
      next: 'Normal',
      paragraph: {
          indent: {
              left: 240,
              hanging: 240
          },
          spacing: {
              after: 0
          }
      }
    },
    {
      id: 'Gloria',
      name: 'Gloria Patri',
      basedOn: 'Normal',
      next: 'Normal',
      paragraph: {
          indent: {
              left: 240,
              hanging: 240
          },
          spacing: {
              after: 0
          }
      }
    }
  ]
}