import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {API_URL} from '../tokens/api-url.token';
import {authInterceptor} from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        {
          provide: API_URL,
          useValue: 'https://api.otav.com.br',
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('adds a bearer token from the session', () => {
    localStorage.setItem('access_token', 'token-seguro');
    http.get('https://api.otav.com.br/categories').subscribe();

    const request = controller.expectOne('https://api.otav.com.br/categories');
    expect(request.request.headers.get('Authorization')).toBe(
      'Bearer token-seguro',
    );
  });

  it('does not leak the token to another origin', () => {
    localStorage.setItem('access_token', 'token-seguro');
    http.get('https://external.example/data').subscribe();

    const request = controller.expectOne('https://external.example/data');
    expect(request.request.headers.has('Authorization')).toBe(false);
  });

  it('keeps requests unauthenticated when there is no token', () => {
    http.get('https://api.otav.com.br/categories').subscribe();

    const request = controller.expectOne('https://api.otav.com.br/categories');
    expect(request.request.headers.has('Authorization')).toBe(false);
  });
});
