import {provideHttpClient} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RegioesApiService} from './regioes-api.service';

describe('RegioesApiService', () => {
  let service: RegioesApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RegioesApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('searches recognized regions with the encoded query', () => {
    service.search('Asa Norte').subscribe();
    const request = http.expectOne('/api/regions/search?q=Asa%20Norte');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('activates and deactivates a region', () => {
    service
      .activate({
        providerId: '123',
        name: 'Asa Norte',
        municipality: 'Brasília',
        state: 'Distrito Federal',
      })
      .subscribe();
    http.expectOne('/api/regions').flush({id: 1});

    service.deactivate(1).subscribe();
    const request = http.expectOne('/api/regions/1');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({isActive: false});
    request.flush({id: 1, isActive: false});
  });
});
