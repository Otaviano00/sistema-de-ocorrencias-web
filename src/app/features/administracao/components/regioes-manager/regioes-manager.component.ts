import {CommonModule} from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import {
  ManagedRegion,
  RecognizedRegion,
  RegioesApiService,
} from '../../../../core/services/regioes-api.service';

@Component({
  selector: 'app-regioes-manager',
  imports: [CommonModule],
  template: `
    <div
      class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full"
    >
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-slate-900">Regiões atendidas</h2>
          <span class="text-xs text-gray-400">{{ activeCount() }} ativas</span>
        </div>
        <p class="text-xs text-gray-400 mb-4">
          Resultados reconhecidos pela API de mapas, sem desenho manual.
        </p>

        <form class="mb-4 flex gap-2" (submit)="search($event)">
          <label class="sr-only" for="region-search">Buscar região</label>
          <input
            id="region-search"
            type="search"
            [value]="query()"
            (input)="query.set(readValue($event))"
            placeholder="Buscar bairro reconhecido"
            minlength="3"
            class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            [disabled]="loading() || query().trim().length < 3"
            class="bg-emerald-700 disabled:opacity-50 text-white px-4 rounded-lg text-sm"
          >
            Buscar
          </button>
        </form>

        @if (error()) {
          <p role="alert" class="mb-3 text-xs text-rose-700">{{ error() }}</p>
        }
        @if (loading()) {
          <p class="mb-3 text-xs text-gray-500">Consultando regiões...</p>
        }
        @if (results().length) {
          <ul class="mb-5 divide-y divide-gray-100 border rounded-lg">
            @for (result of results(); track result.providerId) {
              <li class="p-3 flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold text-slate-900">
                    {{ result.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ context(result) }}
                  </p>
                </div>
                <button
                  type="button"
                  [disabled]="savingProviderId() === result.providerId"
                  (click)="activate(result)"
                  class="text-xs font-semibold text-emerald-700 disabled:opacity-50"
                >
                  Ativar
                </button>
              </li>
            }
          </ul>
        }

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase"
              >
                <th class="pb-3">Região</th>
                <th class="pb-3 text-right">Atendimento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              @for (region of regioes(); track region.id) {
                <tr>
                  <td class="py-3.5">
                    <p class="font-bold text-slate-900">{{ region.name }}</p>
                    <p class="text-xs text-gray-400">{{ context(region) }}</p>
                  </td>
                  <td class="py-3.5 text-right space-x-3 text-xs">
                    @if (region.isActive) {
                      <span
                        class="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded"
                        >Ativa</span
                      >
                      <button
                        type="button"
                        (click)="deactivate(region)"
                        class="text-gray-500"
                      >
                        Desativar
                      </button>
                    } @else {
                      <span
                        class="bg-amber-50 text-amber-700 px-2 py-0.5 rounded"
                        >Inativa</span
                      >
                      <button
                        type="button"
                        (click)="reactivate(region)"
                        class="text-emerald-700 font-semibold"
                      >
                        Ativar
                      </button>
                    }
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="2" class="py-4 text-xs text-gray-500">
                    Nenhuma região cadastrada.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div class="pt-4 border-t border-gray-100">
        <h3 class="text-xs font-bold text-slate-900 mb-1">
          Sem desenho manual de áreas
        </h3>
        <p class="text-xs text-gray-500">
          Regiões são reconhecidas pelo município e estado. Uma região inativa
          bloqueia novos registros e preserva os existentes.
        </p>
      </div>
    </div>
  `,
})
export class RegioesManagerComponent implements OnInit {
  private readonly api = inject(RegioesApiService);
  readonly query = signal('');
  readonly results = signal<RecognizedRegion[]>([]);
  readonly regioes = signal<ManagedRegion[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly savingProviderId = signal<string | null>(null);

  ngOnInit() {
    this.api.list().subscribe({
      next: regions => this.regioes.set(regions),
      error: () => this.error.set('Não foi possível carregar as regiões.'),
    });
  }

  activeCount() {
    return this.regioes().filter(region => region.isActive).length;
  }

  search(event?: Event) {
    event?.preventDefault();
    const query = this.query().trim();
    if (query.length < 3) return;
    this.loading.set(true);
    this.error.set('');
    this.results.set([]);
    this.api.search(query).subscribe({
      next: results => {
        this.results.set(results);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Não foi possível buscar regiões reconhecidas.');
      },
    });
  }

  activate(region: RecognizedRegion) {
    this.savingProviderId.set(region.providerId);
    this.error.set('');
    this.api.activate(region).subscribe({
      next: saved => this.merge(saved),
      error: () => {
        this.savingProviderId.set(null);
        this.error.set('Não foi possível ativar a região.');
      },
    });
  }

  deactivate(region: ManagedRegion) {
    this.api.deactivate(region.id).subscribe({
      next: saved => this.merge(saved),
      error: () => this.error.set('Não foi possível desativar a região.'),
    });
  }

  reactivate(region: ManagedRegion) {
    this.api.reactivate(region.id).subscribe({
      next: saved => this.merge(saved),
      error: () => this.error.set('Não foi possível ativar a região.'),
    });
  }

  context(region: RecognizedRegion) {
    return [region.municipality, region.state].filter(Boolean).join(', ');
  }

  readValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  private merge(region: ManagedRegion) {
    this.regioes.update(regions =>
      [...regions.filter(item => item.id !== region.id), region].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );
    this.results.update(results =>
      results.filter(item => item.providerId !== region.providerId),
    );
    this.savingProviderId.set(null);
  }
}
