import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of, Subject, throwError} from 'rxjs';
import {RegioesApiService} from '../../../../core/services/regioes-api.service';
import {RegioesManagerComponent} from './regioes-manager.component';

describe('RegioesManagerComponent', () => {
  let fixture: ComponentFixture<RegioesManagerComponent>;
  const api = {
    list: vi.fn(),
    search: vi.fn(),
    activate: vi.fn(),
    deactivate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    api.list.mockReturnValue(of([]));
    api.search.mockReturnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [RegioesManagerComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: RegioesApiService, useValue: api},
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RegioesManagerComponent);
  });

  it('loads active regions and maps the geographic context', async () => {
    api.list.mockReturnValue(
      of([
        {
          id: 1,
          providerId: '123',
          name: 'Asa Norte',
          municipality: 'Brasília',
          state: 'Distrito Federal',
          isActive: true,
        },
      ]),
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.regioes()).toEqual([
      expect.objectContaining({name: 'Asa Norte', isActive: true}),
    ]);
  });

  it('does not activate an unrecognized result', () => {
    fixture.detectChanges();
    fixture.componentInstance.query.set('x');
    fixture.componentInstance.search();
    expect(api.search).not.toHaveBeenCalled();
  });

  it('shows loading and errors while searching', () => {
    const result = new Subject<never>();
    api.search.mockReturnValue(result);
    fixture.componentInstance.query.set('asa');
    fixture.componentInstance.search();
    expect(fixture.componentInstance.loading()).toBe(true);

    result.error(new Error('unavailable'));
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.error()).toContain('buscar');
  });

  it('keeps a failed activation visible as an error', () => {
    api.activate.mockReturnValue(throwError(() => new Error('failed')));
    fixture.componentInstance.activate({
      providerId: '123',
      name: 'Asa Norte',
      municipality: 'Brasília',
      state: 'Distrito Federal',
    });
    expect(fixture.componentInstance.error()).toContain('ativar');
  });
});
