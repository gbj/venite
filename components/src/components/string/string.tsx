import { Component, Prop, Watch, State, Element, JSX, Event, EventEmitter, h } from '@stencil/core';
import { SelectableCitation } from '@venite/ldf';

@Component({
  tag: 'ldf-string',
  styleUrl: 'string.scss',
  shadow: false,
  scoped: true
})
export class StringComponent {
  @Element() element: HTMLElement;

  // States
  @State() processedString : (string|JSX.Element)[];

  // Properties
  /**
   * The text to be processed.
   */
  @Prop() text : string;
  @Watch('text')
  textChanged() {
    this.processString();
  }

  /**
   * Citation (used in Share and Favorite APIs)
   */
  @Prop({ reflect: true }) citation : SelectableCitation;

  /**
   * Enable, disable, or force dropcap on the first letter of the text.
   */
  @Prop() dropcap : 'enabled' | 'force' | 'disabled' = 'enabled';

  /**
   * Minimum length (in characters) a string must be to have a dropcap.
   */
  @Prop() dropcapMinLength : number = 180;

  /**
   * Enable or disable replacement of tetragrammaton.
   */
  @Prop() replaceTetragrammaton : boolean = true;

  /**
   * String's index within its parent.
   */
  @Prop() index : number;

  /** A URL fragment that can be used to access this string uniquely */
  @Prop() fragment : string | undefined;

  /** Emitted when text is clicked (used for Share/Favorite) */
  @Event({ bubbles: true }) ldfStringClicked : EventEmitter<{ target: HTMLElement; text: string; citation: SelectableCitation; fragment?: string; }>;

  // Private methods
  processString() {
    const withoutEntities : string = this.processEntities(this.text);
        let processed : JSX.Element[] = this.processMarkup(withoutEntities);
    if(this.replaceTetragrammaton) {
      processed = processed.map(node => typeof node === 'string' ? this.processTetragrammaton(node) : node).flat();
    }
    if(this.dropcap == 'force' || (this.dropcap == 'enabled' && (this.index == 0 || !this.index) && this.text && this.text.length >= this.dropcapMinLength)) {
      processed = this.processDropcap(processed);
    }
    this.processedString = processed;
  }

  processEntities(str : string) : string {
    try {
      const e = document.createElement('textarea');
      e.innerHTML = str;
      // handle case of empty input
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    } catch(e) {
      console.warn(`(processEntities) error while processing "${str}": `, e);
    }
  }

  processMarkup(s : string) : JSX.Element[] {
    const nodes = s
      .replace(/^([A-Z]{2,})/, (match) => this.maintainCasing(match) ? match : match[0] + match.slice(1).toLowerCase())
      .replace(/([A-Z]{2,})/g, '^$1^') // all caps => ^...^; don't match if first word, as these should become dropcaps
      .replace(/\[\*/g, '__BRACKET_ASTERISK')
      .split(/([\*\^\%][^\*\^\%]*[\*\^\%])/g)  // markdown ** => italics
      .map(node => {
        if(node == '-') {
          return '';
        } else if((node.startsWith('*') && node.endsWith('*')) || node.startsWith('%') && node.endsWith('%')) {
          return <em>{node.slice(1, node.length - 1)}</em>;
        } else if(node.startsWith('^') && node.endsWith('^')) {
          if(this.maintainCasing(node)) {
            return node.replace(/\^/g, '');
          } else {
            return <span class="sc">{node[1]}{node.slice(2, node.length - 1).toLowerCase()}</span>;
          }
        } else {
          return node.replace(/__BRACKET_ASTERISK/g, '[*');
        }
      });
    return nodes;
  }

  processTetragrammaton(s : string) : JSX.Element {
    if(s) {
      const replacements = {
        '\n': () => <br/>,
        '’S': () => '’s',
        '\'S': () => '’s',
        'LORD’S': () => 'LORD’s',
        "LORD'S": () => 'LORD’s',
        'LORD': () => <span class="sc">Lord</span>,
        'Lord GOD': () => <span>Lord <span class="sc">God</span></span>,
        'GOD': () => <span class="sc">God</span>,
        'YHWH': () => <span class="sc">Yhwh</span>,
        'Yhwh': () => <span class="sc">Yhwh</span>,
        'YAHWEH': () => <span class="sc">Yhwh</span>,
        'Yahweh': () => <span class="sc">Yhwh</span>,
        '\t': () => <span class='tab'>&nbsp;</span>,
        '  ': () => <span class='half-tab'>&nbsp;</span>
      };

      const split = s.split(/((  )|\n|LORD[\'’]S|[\'’]S|LORD|Lord GOD|GOD|YHWH|YAHWEH|Yhwh|Yahweh|\t)/g);
      return split.map(phrase => replacements.hasOwnProperty(phrase) ? replacements[phrase]() : phrase);
    } else {
      return new Array();
    }
  }

  maintainCasing(st : string | undefined) : boolean {
    if(!st) {
      return true;
    } else {
      const s = st.replace(/\^/g, '');
      // don't lower-case if only the first letter is capitalized but others aren't (e.g., God, Lord)
      return !(s.split("").map(char => char >= 'A' && char <= 'Z').reduce((a, b) => a && b, true))
        // or if it's a Roman numeral
        || Boolean((s?.match(/^I+$/) || [])[0]) || ['IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(s)
        // or if it's the word "I"
        || s?.toLowerCase() == 'i ';
    }
  }

  processDropcap(processed : JSX.Element[]) : JSX.Element[] {
    const first = processed[0],
          firstChunk = typeof first === 'string' ? first : '';
    let final = processed;

    if(firstChunk) {
      const splitTest = (firstChunk || '').split(/[\s.!?\\]/);
      const 
            firstWord = splitTest ? splitTest[0] : '',
            re = firstWord.length > 2
              ? /^ ?([\"\'“”‘’\-–—¡\!\?¿\[\]\(\)\,\wñáéíóúÁÉÍÓÚ\u0590-\u05ff\u0370-\u03ff\u1400-\u167F])([\wñáéíóúÁÉÍÓÚ\u0590-\u05ff\u0370-\u03ff\u1400-\u167F\,]*)/
              : /^ ?([\"\'“”‘’\-–—¡\!\?¿\[\]\(\)\,\wñáéíóúÁÉÍÓÚ\u0590-\u05ff\u0370-\u03ff\u1400-\u167F])([\wñáéíóúÁÉÍÓÚ\u0590-\u05ff\u0370-\u03ff\u1400-\u167F\,]*[\s.!?]*[\wñáéíóúÁÉÍÓÚ\u0590-\u05ff\u0370-\u03ff]*)/,
            reIncludingPunctuation = firstWord[0]?.match(/[\"\'“”‘’¡\!\?¿\[\]\(\)]/)
              ? /^ ?([\"\'“”‘’\-–—¡\!\?¿\[\]\(\)\,\wñáéíóúÁÉÍÓÚ\u0590-\u05ff\u0370-\u03ff\u1400-\u167F]{2})\s*([\wñáéíóúÁÉÍÓÚ\u0590-\u05ff\u0370-\u03ff\u1400-\u167F]*)/
              : re,
            buffer = firstWord.length == 1,
            split = firstChunk.split(reIncludingPunctuation).filter(s => s !== ''),
            [match1, match2, nextWord] = split;

      final = new Array(
        <span class='firstword'><span class={buffer ? `drop buffered-drop drop-${match1}` : `drop drop-${match1}`}>{match1}</span>{this.maintainCasing(match2) ? match2 : match2?.toLowerCase()}</span>
      )
        .concat(nextWord)
        .concat(processed.slice(1));
    }

    if (typeof first === 'string' && first.match(/[\u0e00-\u0e5b]/)) {
      return processed;
    } else {
      return final;
    }
  }

  // Lifecycle events
  componentWillLoad() {
    this.processString();
  }

  // Render
  render() {
    return this.text && <span onClick={() => this.ldfStringClicked.emit({ target: this.element, text: this.text, citation: this.citation, fragment: this.fragment })}>
      {this.processedString}
    </span>;
  }
}
