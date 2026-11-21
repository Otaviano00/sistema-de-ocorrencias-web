import {HttpErrorResponse} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {CategoriasApiService} from '../../../../core/services/categorias-api.service';
import {CategoriasManagerComponent} from './categorias-manager.component';

describe('CategoriasManagerComponent', () => {
  let fixture: ComponentFixture<CategoriasManagerComponent>;
  let component: CategoriasManagerComponent;
  const api = {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    api.list.mockReturnValue(of([{id: 1, name: 'Iluminação', isActive: true}]));
    await TestBed.configureTestingModule({
      imports: [CategoriasManagerComponent],
      providers: [{provide: CategoriasApiService, useValue: api}],
    }).compileComponents();
    fixture = TestBed.createComponent(CategoriasManagerComponent);
    component = fixture.componentInstance;
  });

  it('loads categories on initialization', () => {
    fixture.detectChanges();

    expect(api.list).toHaveBeenCalledOnce();
    expect(component.categorias()).toEqual([
      {id: 1, name: 'Iluminação', isActive: true},
    ]);
  });

  it('does not submit an empty or overlong name', () => {
    fixture.detectChanges();
    component.form.setValue({name: '   '});
    component.save();
    expect(api.create).not.toHaveBeenCalled();

    component.form.setValue({name: 'a'.repeat(101)});
    component.save();
    expect(api.create).not.toHaveBeenCalled();
    expect(component.form.controls.name.invalid).toBe(true);
  });

  it('associates validation errors with the category field', () => {
    fixture.detectChanges();
    component.form.controls.name.markAsTouched();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('#category-name');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain(
      'category-name-error',
    );
    expect(
      fixture.nativeElement.querySelector('#category-name-error').textContent,
    ).toContain('Informe um nome');
  });

  it('creates a category and refreshes the list', () => {
    api.create.mockReturnValue(of({id: 2, name: 'Drenagem', isActive: true}));
    fixture.detectChanges();
    component.form.setValue({name: ' Drenagem '});

    component.save();

    expect(api.create).toHaveBeenCalledExactlyOnceWith('Drenagem');
    expect(component.categorias()).toEqual([
      {id: 2, name: 'Drenagem', isActive: true},
      {id: 1, name: 'Iluminação', isActive: true},
    ]);
    expect(component.form.controls.name.value).toBe('');
  });

  it('edits a category and keeps its active state', () => {
    api.update.mockReturnValue(
      of({id: 1, name: 'Iluminação pública', isActive: true}),
    );
    fixture.detectChanges();
    component.edit({id: 1, name: 'Iluminação', isActive: true});
    component.form.setValue({name: 'Iluminação pública'});

    component.save();

    expect(api.update).toHaveBeenCalledExactlyOnceWith(1, 'Iluminação pública');
    expect(component.categorias()).toEqual([
      {id: 1, name: 'Iluminação pública', isActive: true},
    ]);
  });

  it('shows a validation error from the API next to the field', () => {
    api.create.mockReturnValue(
      throwError(() => ({
        status: 400,
        error: {message: ['name deve ser válido']},
      })),
    );
    fixture.detectChanges();
    component.form.setValue({name: 'Inválida'});

    component.save();

    expect(component.errorMessage()).toBe('name deve ser válido');
  });

  it.each([
    [401, 'Sua sessão expirou. Entre novamente.'],
    [403, 'Apenas administradores podem alterar categorias.'],
  ])('shows authorization error for HTTP %s', (status, message) => {
    api.create.mockReturnValue(
      throwError(() => new HttpErrorResponse({status, error: {}})),
    );
    fixture.detectChanges();
    component.form.setValue({name: 'Buraco'});

    component.save();

    expect(component.errorMessage()).toBe(message);
  });

  it('shows load failures without replacing existing state with mocks', () => {
    api.list.mockReturnValue(throwError(() => new Error('offline')));

    fixture.detectChanges();

    expect(component.errorMessage()).toBe(
      'Não foi possível carregar as categorias.',
    );
  });
});
