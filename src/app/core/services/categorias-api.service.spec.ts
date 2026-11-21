import {provideHttpClient} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {API_URL} from '../tokens/api-url.token';
import {CategoriasApiService} from './categorias-api.service';

describe('CategoriasApiService', () => {
  let service: CategoriasApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: API_URL, useValue: 'https://api.example.test'},
      ],
    });
    service = TestBed.inject(CategoriasApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists categories from the public endpoint', () => {
    const categories = [{id: 1, name: 'Iluminação', isActive: true}];
    service.list().subscribe(result => expect(result).toEqual(categories));

    const request = http.expectOne('https://api.example.test/categories');
    expect(request.request.method).toBe('GET');
    request.flush(categories);
  });

  it('creates an active category through the authenticated endpoint', () => {
    service.create(' Iluminação ').subscribe();

    const request = http.expectOne('https://api.example.test/categories');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({name: 'Iluminação'});
    request.flush({id: 1, name: 'Iluminação', isActive: true});
  });

  it('updates a category by id', () => {
    service.update(7, ' Drenagem ').subscribe();

    const request = http.expectOne('https://api.example.test/categories/7');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({name: 'Drenagem'});
    request.flush({id: 7, name: 'Drenagem', isActive: false});
  });
});
