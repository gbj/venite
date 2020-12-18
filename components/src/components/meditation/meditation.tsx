import { Component, Prop, Watch, State, Method, Element, Event, EventEmitter, Host, JSX, h } from '@stencil/core';
import { Meditation } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './meditation.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-meditation',
  styleUrl: 'meditation.scss',
  shadow: true
})
export class MeditationComponent {
  @Element() element: HTMLElement;

  // States
  @State() obj : Meditation;
  @State() localeStrings: { [x: string]: string; };
  @State() secondsRemaining : number;
  @State() started : boolean = false;
  @State() paused : boolean = false;

  timerId;

  // Properties
  /**
   * An LDF Meditation object.
   */
  @Prop() doc : Meditation | string;
  @Watch('doc')
  docChanged(newDoc : Meditation | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Meditation(JSON.parse(newDoc));
      } else {
        this.obj = new Meditation(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Meditation();
    }
  }

  /**
   * A JSON Pointer that points to the Meditation being edited
   */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  /** Liturgical color to use in display */
  @Prop() color : string = "#3333ff";

  /** Whether the timer should start playing automatically */
  @Prop() autostart : boolean;

  // Events
  /* onTimerChanged -- use this to communicate with listeners so they can do other things in response
   * 'start': starting timer for first time, do something like ring a bell
   * 'pause': do something like pause music controls
   * 'resume': do something like resume music controls
   * 'stop': do something like stop opening audio from playing
   * 'complete': do something like play a closing bell
   * number: this is the number of seconds remaining; update media control position
   */
  @Event() timerChanged : EventEmitter<'start' | 'pause' | 'resume' | 'rewind' | 'complete' | number>;

  // Lifecycle events
  async componentWillLoad() {
    // parse doc we're passed
    this.docChanged(this.doc);

    this.loadLocaleStrings();

    // start the timer
    if(this.autostart) {
      this.secondsRemaining = this.obj.metadata.length;
      this.start();
    }
  }

  // Public methods
  /** Start the timer, either with a given value of seconds or with the number passed in the Meditation object metadata */
  @Method()
  async start(value : number = undefined) {
    const metadata = this.obj?.metadata ?? { length: 300, delay: 0},
          seconds : number = value || metadata.length,
          delay : number = metadata.delay;
    this.secondsRemaining = seconds;

    // Start the timer after the delay
    setTimeout(() => {
      this.startTimer();
      this.started = true;
    }, delay);

    // Emit event that it's running, after the delay
    setTimeout(() => {
      this.timerChanged.emit('start');
    }, delay);
  }

  /** Pause the timer */
  @Method()
  async pause() {
    this.paused = true;
    this.stopTimer();
  }

  /** Resume the timer */
  @Method()
  async resume() {
    this.paused = false;
    this.startTimer();
    this.timerChanged.emit('resume');
  }

  /** Rewind the timer to its initial value and restart it */
  @Method()
  async rewind() {
    this.pause(); // pause and clear the timer
    this.stopTimer();
    this.start(); // starts with the value passed
    this.timerChanged.emit('rewind');
  }

  // Private methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  minutesSeconds(value : number) : string {
    const negative : boolean = value < 0,
          minutes : number = Math.floor(Math.abs(value / 60));
    return `${negative ? '-': ''}${minutes.toString().padStart(2, '0')}:${Math.abs((value - minutes * 60)).toString().padStart(2, '0')}`;
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.secondsRemaining--;
      if(this.secondsRemaining == 0) {
        this.timerChanged.emit('complete');
      } else {
        this.timerChanged.emit(this.secondsRemaining);
      }
    }, 1000);
  }

  stopTimer() {
    if(this.timerId) {
      clearInterval(this.timerId);
    }
    // tell the listener to stop audio, controls, etc.
    this.timerChanged.emit('pause');
  }

  handleControlSubmit(e : Event) {
    e.preventDefault();
  }

  handleControlValue(e) {
    // Blank values are bad -- replace with 0
    let value : string = e.target.value;
    if(value == '') {
      value = '0';
    }

    // Apply directly to the object and refresh display
    Object.assign(
      this.obj,
      {
        metadata: {
          ... this.obj.metadata,
          length: parseInt(value) * 60
        }
      }
    );
    this.obj = new Meditation(this.obj);
    this.secondsRemaining = this.obj?.metadata?.length ?? 0;
  }

  buttonNode(handler, label : string, icon : string, fill : 'clear' | 'outline' | 'solid' | 'default' = 'clear', size : 'default' | 'large' | 'small' = 'large') : JSX.Element {
    const localeStrings = this.localeStrings || {};

    if(customElements && !!customElements.get('ion-button')) {
      return (
        <ion-button onClick={handler} fill={fill} size={size}>
          <ion-icon name={icon} slot='start'></ion-icon>
          <ion-label>{localeStrings[label]}</ion-label>
        </ion-button>
      );
    } else {
      return (
        <button onClick={handler} class={fill} style={{color: this.color}}>
          {localeStrings[label]}
        </button>
      );
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    const length = this.obj?.metadata?.length ?? 300,
      progressAmount : number = this.secondsRemaining / length,
      progressPercent : number = progressAmount * 100;
  
    //console.log('meditation', length, progressAmount, progressPercent)

    return (
      this.editable
      ? <Host>
          <form class='controls' onSubmit={(e) => this.handleControlSubmit(e)}>
            <span>{localeStrings.meditate}</span>
            <ldf-editable-text
              inputType="number"
              short={true}
              path={`${this.path}/metadata/length`}
              text={(this.obj?.metadata?.length ?? 300)?.toString()}
            ></ldf-editable-text>
            <span>{localeStrings.seconds}</span>
            <span>({Math.floor(length / 60)}:{Math.floor(length % 60).toString().padStart(2, '0')})</span>
        </form>
      </Host>
      : <Host>
        <div class={{'control-container': true, 'hidden': !!this.secondsRemaining}}>
          <form class='controls' onSubmit={(e) => this.handleControlSubmit(e)}>
            {this.buttonNode(() => this.start(), 'meditate', 'sunny', 'solid', 'small')}
            <input type='number' value={length / 60} onInput={(e) => this.handleControlValue(e)} />
            <span>{localeStrings.minutes}</span>
          </form>
        </div>

        {/* Progress Circle */}
        <div class={{'hidden': !this.secondsRemaining}}>
          <div class='progress-circle-container'>
            <div class='progress-circle'
              style={{background: `conic-gradient(${this.color} ${100 - progressPercent}%, 0, #ecf0f1 ${progressPercent}%)`}}>
              <div class='circle-overlay'>
                <div class='seconds'>
                  {/* Number label remaining */}
                  {this.minutesSeconds(this.secondsRemaining)}
                </div>
                {/* Controls */}
                <div class='controls'>
                  {!this.started && this.buttonNode(() => this.start(), 'start', 'start')}
                  {this.started && !this.paused && this.buttonNode(() => this.pause(), 'pause', 'pause')}
                  {this.started && this.paused && this.buttonNode(() => this.resume(), 'resume', 'play')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
