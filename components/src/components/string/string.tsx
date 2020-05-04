import { Component, Prop, Watch, State, Element, JSX, h } from '@stencil/core';
import { SelectableCitation } from '../../../../ldf/src/citation';

@Component({
  tag: 'ldf-string',
  styleUrl: 'string.scss',
  shadow: true
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
  @Prop() citation : string | SelectableCitation;

  /**
   * Enable, disable, or force dropcap on the first letter of the text.
   */
  @Prop() dropcap : 'enabled' | 'force' | 'disabled' = 'enabled';

  /**
   * Minimum length (in characters) a string must be to have a dropcap.
   */
  @Prop() dropcapMinLength : number = 200;

  /**
   * Enable or disable replacement of tetragrammaton.
   */
  @Prop() replaceTetragrammaton : boolean = true;

  /**
   * String's index within its parent.
   */
  @Prop() index : number;

  // Private methods
  processString() {
    let processed : (string|JSX.Element)[] = new Array(this.text);
    if(this.replaceTetragrammaton) {
      processed = this.processTetragrammaton(this.text);
    }
    if(this.dropcap == 'force' || (this.dropcap == 'enabled' && (this.index == 0 || !this.index) && this.text && this.text.length > this.dropcapMinLength)) {
      processed = this.processDropcap(processed);
    }
    this.processedString = processed;
  }

  processTetragrammaton(s : string) : (string|JSX.Element)[] {
    if(s) {
      const replacements = {
        '\n': <br/>,
        'LORD’S': 'LORD’s',
        "LORD'S": 'LORD’s',
        'LORD': <span class="tetragrammaton">Lord</span>,
        'Lord GOD': <span>Lord <span class="tetragrammaton">God</span></span>,
        'GOD': <span class="tetragrammaton">God</span>,
        'YHWH': <span class="tetragrammaton">Yhwh</span>,
        'Yhwh': <span class="tetragrammaton">Yhwh</span>,
        'YAHWEH': <span class="tetragrammaton">Yhwh</span>,
        'Yahweh': <span class="tetragrammaton">Yhwh</span>
      };

      const split = s.split(/(\n|LORD[\'’]S|LORD|Lord GOD|GOD|YHWH|YAHWEH|Yhwh|Yahweh)/g);
      return split.map(phrase => replacements.hasOwnProperty(phrase) ? replacements[phrase] : phrase);
    } else {
      return new Array();
    }
  }

  processDropcap(processed : (string|JSX.Element)[]) : (string|JSX.Element)[] {
    const firstChunk = processed[0];
    if(typeof firstChunk === 'string') {
      const splitTest = (firstChunk || '').split(/[\s.!?\\-]/),
            firstWord : string = splitTest ? splitTest[0] : '',
            re : RegExp = firstWord.length > 2 ? /^([\w\u0590-\u05ff\u0370-\u03ff])([\w\u0590-\u05ff\u0370-\u03ff]*)/ : /^([\w\u0590-\u05ff\u0370-\u03ff])([\w\u0590-\u05ff\u0370-\u03ff]*[\s.!?\\-]*[\w\u0590-\u05ff\u0370-\u03ff]*)/,
            buffer : boolean = firstWord.length == 1,
            split = firstChunk.split(re).filter(s => s !== ''),
            [match1, match2, nextWord] = split;

      processed = new Array(
        <span class='firstword'><span class={buffer ? 'drop buffered-drop' : 'drop'}>{match1}</span>{match2}</span>
      )
        .concat(nextWord)
        .concat(processed.slice(1));
    }
    return processed;
  }

  // Lifecycle events
  componentWillLoad() {
    this.processString();
  }

  // Render
  render() {
    return (
      <span>{this.processedString}</span>
    );
  }
}
