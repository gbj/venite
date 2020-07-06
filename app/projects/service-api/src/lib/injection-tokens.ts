import { InjectionToken } from '@angular/core';
import { PlatformServiceInterface } from './platform-service.interface';
import { BibleServiceInterface } from './bible-service.interface';
import { LocalStorageServiceInterface } from './localstorage-service.interface';
import { PreferencesServiceInterface } from './preferences-service.interface';

export const BIBLE_SERVICE = new InjectionToken<BibleServiceInterface>('Bible');
export const LOCAL_STORAGE = new InjectionToken<LocalStorageServiceInterface>('LocalStorage');
export const PLATFORM_SERVICE = new InjectionToken<PlatformServiceInterface>('PlatformService');
export const PREFERENCES_SERVICE = new InjectionToken<PreferencesServiceInterface>('PreferencesService');
