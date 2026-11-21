import {InjectionToken} from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () =>
    typeof API_URL_BUILD === 'string' && API_URL_BUILD
      ? API_URL_BUILD
      : 'http://localhost:3000',
});
