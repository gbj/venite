import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { PlatformService } from '../services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private platform : PlatformService) { }

  async set(key: string, data: any): Promise<void> {
    if(!this.platform.is('server')) {
      return Storage.set({key, value: JSON.stringify(data)});
    }
  }

  async get(key: string) : Promise<any> {
    if(!this.platform.is('server')) {
      return JSON.parse((await Storage.get({ key })).value);
    }
  }

  async remove(key : string) : Promise<void> {
    if(!this.platform.is('server')) {
      return Storage.remove({ key })
    }
  }

  async clear() : Promise<void> {
    if(!this.platform.is('server')) {
      return Storage.clear();
    }
  }

  async keys() : Promise<string[]> {
    if(!this.platform.is('server')) {
      return Storage.keys();
    }
  }
}
