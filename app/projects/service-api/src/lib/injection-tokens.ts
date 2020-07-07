import { InjectionToken } from '@angular/core';
import { PlatformServiceInterface } from './platform-service.interface';
import { BibleServiceInterface } from './bible-service.interface';
import { LocalStorageServiceInterface } from './localstorage-service.interface';
import { PreferencesServiceInterface } from './preferences-service.interface';
import { AuthServiceInterface } from './auth-service.interface';
import { CalendarServiceInterface } from './calendar-service.interface';
import { DocumentServiceInterface } from './document-service.interface';
import { LectionaryServiceInterface } from './lectionary-service.interface';

export const AUTH_SERVICE = new InjectionToken<AuthServiceInterface>('AuthService');
export const BIBLE_SERVICE = new InjectionToken<BibleServiceInterface>('BibleService');
export const CALENDAR_SERVICE = new InjectionToken<CalendarServiceInterface>('CalendarService');
export const DOCUMENT_SERVICE = new InjectionToken<DocumentServiceInterface>('DocumentService');
export const LECTIONARY_SERVICE = new InjectionToken<LectionaryServiceInterface>('LectionaryService');
export const LOCAL_STORAGE = new InjectionToken<LocalStorageServiceInterface>('LocalStorage');
export const PLATFORM_SERVICE = new InjectionToken<PlatformServiceInterface>('PlatformService');
export const PREFERENCES_SERVICE = new InjectionToken<PreferencesServiceInterface>('PreferencesService');
