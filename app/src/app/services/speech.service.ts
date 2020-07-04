import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor() { }

  getNationality(voice : SpeechSynthesisVoice) : string {
    return voice.lang;
  }

  // TODO need to handle all SpeechService preferences
}
