import { Injectable } from "@angular/core";
import { Media, MediaObject, MEDIA_STATUS } from "@ionic-native/media/ngx";
import { PlatformService } from "@venite/ng-platform";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  _nativePlayer: MediaObject;
  _nativeSubscriptions: Subscription[] = [];
  _webPlayer: HTMLAudioElement;

  constructor(private platform: PlatformService, private media: Media) {}

  exists(): boolean {
    if (this.platform.is("capacitor")) {
      return Boolean(this._nativePlayer);
    } else {
      return Boolean(this._webPlayer);
    }
  }

  async create(file: string, loop: boolean = true) {
    if (this.platform.is("capacitor")) {
      this._nativePlayer = this.media.create(file);
      // loop audio
      if (loop) {
        this._nativePlayer.onStatusUpdate
          .pipe(filter((status) => status === MEDIA_STATUS.STOPPED))
          .subscribe(() => {
            this._nativePlayer?.play();
          });
      } else {
        // if not looping audio, switch to looping silence
        this._nativePlayer.onStatusUpdate
          .pipe(filter((status) => status === MEDIA_STATUS.STOPPED))
          .subscribe(async () => {
            await this.create("/assets/audio/silence-short.mp3");
            await this.play();
          });
      }
      this._webPlayer = null;
    } else {
      this._webPlayer = new Audio(file);
      if (loop) {
        this._webPlayer.loop = loop;
      } else {
        this._webPlayer.addEventListener("ended", async () => {
          await this.create("/assets/audio/silence-short.mp3");
          await this.play();
        });
      }
      this._nativePlayer = null;
    }
  }

  async destroy() {
    this._nativePlayer = null;
    this._webPlayer = null;
    this._nativeSubscriptions.forEach((s) => s.unsubscribe());
  }

  async play() {
    if (this.platform.is("capacitor")) {
      this._nativePlayer?.play();
    } else {
      this._webPlayer?.play();
    }
  }

  async pause() {
    if (this.platform.is("capacitor")) {
      this._nativePlayer?.pause();
    } else {
      this._webPlayer?.pause();
    }
  }

  /** Returns duration time in seconds */
  async duration(): Promise<number> {
    if (this.platform.is("capacitor")) {
      return this._nativePlayer.getDuration();
    } else {
      return this._webPlayer.duration;
    }
  }

  /** Returns current time in seconds */
  async currentTime(): Promise<number> {
    if (this.platform.is("capacitor")) {
      return this._nativePlayer.getCurrentPosition();
    } else {
      return this._webPlayer.currentTime;
    }
  }

  async seekTo(seekToInSeconds: number) {
    if (this.platform.is("capacitor")) {
      this._nativePlayer.seekTo(seekToInSeconds * 1000);
    } else {
      this._webPlayer.currentTime = seekToInSeconds;
    }
  }

  onended(cb: () => void) {
    if (this.platform.is("capacitor")) {
      this._nativeSubscriptions.push(
        this._nativePlayer.onStatusUpdate
          .pipe(filter((status) => status === MEDIA_STATUS.STOPPED))
          .subscribe(cb)
      );
    } else {
      this._webPlayer.onended = cb;
    }
  }

  onpause(cb: () => void) {
    if (this.platform.is("capacitor")) {
      this._nativeSubscriptions.push(
        this._nativePlayer.onStatusUpdate
          .pipe(filter((status) => status === MEDIA_STATUS.PAUSED))
          .subscribe(cb)
      );
    } else {
      this._webPlayer.onpause = cb;
    }
  }

  onplay(cb: () => void) {
    if (this.platform.is("capacitor")) {
      this._nativeSubscriptions.push(
        this._nativePlayer.onStatusUpdate
          .pipe(
            filter(
              (status) =>
                status === MEDIA_STATUS.RUNNING ||
                status === MEDIA_STATUS.STARTING
            )
          )
          .subscribe(cb)
      );
    } else {
      this._webPlayer.onplay = cb;
    }
  }
}
