import { LiturgicalDocument } from './liturgical-document';
import { BibleReading } from './bible-reading/bible-reading';
import { versionToString } from './utils/version-to-string';
import { BibleReadingVerse } from './bible-reading/bible-reading-verse';

const VERSIONS: { [x: string]: string } = {
  ip: 'IP',
  bcp1979: 'Rite II',
  bcp1979_psalm: '1979',
  eow: 'EOW',
  coverdale: 'Coverdale',
  rite_i: 'Rite I',
};

function modifiedVersion(option: LiturgicalDocument): string | { preference: string } {
  return option.type === 'psalm' && option.style === 'psalm' && option.version === 'bcp1979'
    ? 'bcp1979_psalm'
    : option.version;
}

export class Option extends LiturgicalDocument {
  type: 'option';

  metadata: {
    /** The nth item in `this.value` is displayed; the others are alternative options */
    selected: number;

    /** Can be used to mark which field is being edited, without overwriting which one is selected by default
     * Prevents the editor from flipping continuously back and forth between fields */
    editor_selected?: number;
  };

  value: LiturgicalDocument[];

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Option> = {}) {
    super(data);
  }

  availableDisplayFormats() {
    return [];
  }

  uniqueVersions(): number {
    return (this.value || [])
      .map((o) => versionToString(o.version))
      .reduce((uniques, item) => (uniques.includes(item) ? uniques : [...uniques, item]), [] as string[]).length;
  }

  uniqueLabels(): number {
    return (this.value || [])
      .map((o) => o.label)
      .reduce((uniques, item) => (uniques.includes(item) ? uniques : [...uniques, item]), [] as string[]).length;
  }

  uniqueCitations(): number {
    return (this.value || [])
      .map((o) => (o.citation ? o.citation.toString() : ''))
      .filter((citation) => !!citation)
      .reduce((uniques, item) => (uniques.includes(item) ? uniques : [...uniques, item]), [] as string[]).length;
  }

  uniqueCanticleNumbers(): number {
    return Array.from(
      new Set((this.value || []).map((o) => (o.style === 'canticle' ? o.metadata?.number : o.slug || Math.random()))),
    ).length;
  }

  /** Gives an appropriate version label for the document given */
  getVersionLabel(option: LiturgicalDocument, maxLength: number = 50): string {
    const uniqueVersions = this.uniqueVersions(),
      uniqueLabels = this.uniqueLabels(),
      uniqueCitations = this.uniqueCitations(),
      uniqueCanticleNumbers = this.uniqueCanticleNumbers();

    let label: string = '';

    if (option.type == 'liturgy') {
      label = option.label || option.version_label || 'Option';
    }
    // Psalm 119 parts => Psalm 119: Aleph
    else if (
      option.type == 'psalm' &&
      uniqueVersions == 1 &&
      option.label &&
      (option.slug?.match(/psalm_119_/) || option.citation?.toString().match(/Ps[^\d]+119/))
    ) {
      label = option.label;
    }
    // Other psalms: Psalm 121
    else if (
      option.type == 'psalm' &&
      option.style == 'psalm' &&
      (option.citation || option.metadata?.number) &&
      uniqueVersions == 1
    ) {
      label = option.citation ? option.citation.toString() : `Psalm ${option.metadata.number}`;
    }
    // Readings of many citations => include truncated text
    else if (
      option.type == 'bible-reading' &&
      uniqueCitations > 1 &&
      option.citation &&
      option.value &&
      option.value.length > 0
    ) {
      const text: string = (option as BibleReading).value
        .map((v) => (v.hasOwnProperty('text') ? (v as BibleReadingVerse).text : v.toString()))
        .join(' ');

      const formattedText = option.style == 'short' ? ` (“${text}”)` : '';

      if (uniqueVersions > 1) {
        label = `${option.citation.toString()} (${option.version})${formattedText}`;
      } else {
        label = `${option.citation.toString()}${formattedText}`;
      }
    }
    // Readings with one version => John 1:1-4
    else if (option.type == 'bible-reading' && option.citation && uniqueVersions == 1) {
      label = option.citation.toString();
    }
    // Readings with multiple versions => John 1:1-4
    else if (option.type == 'bible-reading' && option.citation && uniqueVersions > 1) {
      label = `${option.citation.toString()} (${option.version})`;
    }
    // Canticles, if only one version
    else if (
      uniqueVersions == 1 &&
      option.type == 'psalm' &&
      option.style == 'canticle' &&
      option.metadata &&
      option.metadata.localname
    ) {
      label = option.metadata.localname;
    }
    // Canticles, if multiple options for same number
    else if (uniqueVersions > 1 && uniqueCanticleNumbers === 1) {
      label = VERSIONS[versionToString(modifiedVersion(option))];
    }
    // Canticles and invitatories, if multiple options => Venite (EOW)
    else if (uniqueVersions > 1 && option.metadata && option.metadata.hasOwnProperty('localname') && option.version) {
      label = `${option.metadata.localname} (${VERSIONS[versionToString(modifiedVersion(option))]})`;
    }
    // Version label other than BCP 1979 => EOW
    else if (option.version_label && option.version_label !== 'bcp1979') {
      label = option.version_label;
    }
    // If multiple labels, then label => Trisagion, Gloria in Excelsis, Kyrie
    else if (option.label && uniqueLabels > 1 && uniqueVersions == 1) {
      label = option.label;
    }
    // If multiple labels and version, then label (version) => Trisagion (BCP), Gloria in Excelsis (EOW)
    else if (option.label && uniqueLabels > 1 && uniqueVersions > 1) {
      label = `${option.label} (${VERSIONS[versionToString(modifiedVersion(option))]})`;
    }
    // Local name but no version (or version is BCP) => 'The Song of Mary'
    else if (
      option.metadata &&
      option.metadata.hasOwnProperty('localname') &&
      (!option.version_label || option.version_label == 'bcp1979')
    ) {
      label = option.metadata.localname;
    }
    // Fall back to a version label
    else if (uniqueVersions > 1 && option.version) {
      label = VERSIONS[versionToString(modifiedVersion(option))];
    }
    // Fall back to a citation
    else if (option.citation) {
      label = option.citation.toString();
    }
    // Fallback: stripped version of JSON of value
    else if (option.value) {
      label = `“${JSON.stringify(option.value)
        .replace(/[\[\]\{\}\"\'\:]/g, ' ')
        .replace(/\\n/g, ' ')
        .trim()}”`;
    } else {
      throw `Unable to generate a label from ${JSON.stringify(option)}`;
    }

    return label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
  }
}
