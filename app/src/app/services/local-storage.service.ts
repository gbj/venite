import { Injectable, Inject } from "@angular/core";
import { Preferences } from "@capacitor/preferences";
import {
  LocalStorageServiceInterface,
  PlatformServiceInterface,
  PLATFORM_SERVICE,
} from "@venite/ng-service-api";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService implements LocalStorageServiceInterface {
  constructor(
    @Inject(PLATFORM_SERVICE) private platform: PlatformServiceInterface
  ) {
    //Preferences.migrate();
  }

  async set(key: string, data: any): Promise<void> {
    console.log("Storage.set()");
    if (!this.platform.is("server")) {
      return Preferences.set({ key, value: JSON.stringify(data) });
    }
  }

  async get(key: string): Promise<any> {
    console.log("Storage.get()");
    if (!this.platform.is("server")) {
      try {
        return JSON.parse((await Preferences.get({ key }))?.value);
      } catch (e) {
        console.warn(e);
        return undefined;
      }
    }
  }

  async remove(key: string): Promise<void> {
    console.log("Storage.remove()");
    if (!this.platform.is("server")) {
      return Preferences.remove({ key });
    }
  }

  async clear(): Promise<void> {
    console.log("Storage.clear()");
    if (!this.platform.is("server")) {
      return Preferences.clear();
    }
  }

  async keys(): Promise<string[]> {
    console.log("Storage.keys()");
    if (!this.platform.is("server")) {
      const { keys } = await Preferences.keys();
      return keys;
    }
  }
}
