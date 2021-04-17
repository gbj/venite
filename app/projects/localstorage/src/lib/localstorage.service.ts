import { Injectable, Inject } from "@angular/core";
import { Storage } from "@capacitor/storage";
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
    Storage.migrate();
  }

  async set(key: string, data: any): Promise<void> {
    if (!this.platform.is("server")) {
      return Storage.set({ key, value: JSON.stringify(data) });
    }
  }

  async get(key: string): Promise<any> {
    if (!this.platform.is("server")) {
      return JSON.parse((await Storage.get({ key })).value);
    }
  }

  async remove(key: string): Promise<void> {
    if (!this.platform.is("server")) {
      return Storage.remove({ key });
    }
  }

  async clear(): Promise<void> {
    if (!this.platform.is("server")) {
      return Storage.clear();
    }
  }

  async keys(): Promise<string[]> {
    if (!this.platform.is("server")) {
      const { keys } = await Storage.keys();
      return keys;
    }
  }
}
