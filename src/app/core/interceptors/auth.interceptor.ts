import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {API_URL} from '../tokens/api-url.token';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('access_token');
  const apiOrigin = new URL(inject(API_URL)).origin;
  let requestOrigin: string;

  try {
    requestOrigin = new URL(request.url, apiOrigin).origin;
  } catch {
    return next(request);
  }

  if (!token || requestOrigin !== apiOrigin) return next(request);
  return next(
    request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    }),
  );
};
