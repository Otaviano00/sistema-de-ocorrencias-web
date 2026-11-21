import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  Category,
  CategoriasApiService,
} from '../../../../core/services/categorias-api.service';

@Component({
  selector: 'app-categorias-manager',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full"
    >
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold text-slate-900">
            Categorias de ocorrência
          </h2>
          <span class="text-xs text-gray-400 font-medium"
            >{{ activeCount() }} ativas • {{ inactiveCount() }} inativas</span
          >
        </div>

        @if (loading()) {
          <p class="text-sm text-gray-500 mb-8">Carregando categorias...</p>
        } @else {
          <div class="overflow-x-auto mb-8">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr
                  class="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
                >
                  <th class="pb-3 font-semibold">Nome</th>
                  <th class="pb-3 font-semibold text-center">Status</th>
                  <th class="pb-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                @for (cat of categorias(); track cat.id) {
                  <tr class="hover:bg-gray-50/80 transition">
                    <td class="py-3.5 font-semibold text-slate-900 text-sm">
                      {{ cat.name }}
                    </td>
                    <td class="py-3.5 text-center">
                      @if (cat.isActive) {
                        <span
                          class="inline-block text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded"
                          >Ativa</span
                        >
                      } @else {
                        <span
                          class="inline-block text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded"
                          >Inativa</span
                        >
                      }
                    </td>
                    <td class="py-3.5 text-right text-xs font-medium">
                      <button
                        type="button"
                        class="text-emerald-700 hover:text-emerald-800"
                        (click)="edit(cat)"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="3" class="py-6 text-center text-gray-500">
                      Nenhuma categoria cadastrada.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <form
        class="pt-6 border-t border-gray-100"
        [formGroup]="form"
        (ngSubmit)="save()"
      >
        <h3
          class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2"
        >
          {{ editingId() ? 'Editar categoria' : 'Nova categoria' }}
        </h3>
        <div class="flex gap-3">
          <input
            id="category-name"
            type="text"
            formControlName="name"
            aria-label="Nome da categoria"
            aria-describedby="category-name-help category-name-error"
            [attr.aria-invalid]="
              form.controls.name.invalid && form.controls.name.touched
            "
            maxlength="100"
            placeholder="Nome da categoria"
            class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            [disabled]="saving()"
            class="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-medium px-5 py-2 rounded-lg text-sm shadow-sm transition"
          >
            {{
              saving() ? 'Salvando...' : editingId() ? 'Salvar' : 'Adicionar'
            }}
          </button>
          @if (editingId()) {
            <button
              type="button"
              class="px-3 py-2 text-sm text-gray-600"
              (click)="cancelEdit()"
            >
              Cancelar
            </button>
          }
        </div>
        @if (form.controls.name.invalid && form.controls.name.touched) {
          <p
            id="category-name-error"
            role="alert"
            class="text-xs text-rose-600 mt-2"
          >
            Informe um nome com até 100 caracteres.
          </p>
        }
        @if (errorMessage()) {
          <p role="alert" class="text-xs text-rose-600 mt-2">
            {{ errorMessage() }}
          </p>
        }
        <p id="category-name-help" class="text-[11px] text-gray-400 mt-2">
          Categorias novas são ativadas ao salvar. A edição preserva o estado
          atual.
        </p>
      </form>
    </div>
  `,
})
export class CategoriasManagerComponent implements OnInit {
  private readonly api = inject(CategoriasApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly categorias = signal<Category[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly errorMessage = signal('');
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
  });

  activeCount() {
    return this.categorias().filter(category => category.isActive).length;
  }

  inactiveCount() {
    return this.categorias().length - this.activeCount();
  }

  ngOnInit(): void {
    this.api.list().subscribe({
      next: categories => {
        this.categorias.set(categories);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Não foi possível carregar as categorias.');
      },
    });
  }

  edit(category: Category): void {
    this.editingId.set(category.id);
    this.form.setValue({name: category.name});
    this.errorMessage.set('');
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset({name: ''});
  }

  save(): void {
    const name = this.form.controls.name.value.trim();
    this.form.controls.name.markAsTouched();
    this.form.controls.name.setValue(name);
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    this.errorMessage.set('');
    const id = this.editingId();
    const request =
      id === null ? this.api.create(name) : this.api.update(id, name);
    request.subscribe({
      next: category => {
        this.categorias.update(categories =>
          (id === null
            ? [...categories, category]
            : categories.map(item => (item.id === id ? category : item))
          ).sort((left, right) => left.name.localeCompare(right.name, 'pt-BR')),
        );
        this.saving.set(false);
        this.cancelEdit();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.errorMessage.set(this.readApiError(error));
      },
    });
  }

  private readApiError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) return 'Sua sessão expirou. Entre novamente.';
      if (error.status === 403) {
        return 'Apenas administradores podem alterar categorias.';
      }
      if (Array.isArray(error.error?.message)) {
        return error.error.message.join(', ');
      }
    }
    if (
      typeof error === 'object' &&
      error !== null &&
      'error' in error &&
      typeof error.error === 'object' &&
      error.error !== null &&
      'message' in error.error
    ) {
      const message = error.error.message;
      if (Array.isArray(message)) return message.join(', ');
      if (typeof message === 'string') return message;
    }
    return 'Não foi possível salvar a categoria.';
  }
}
