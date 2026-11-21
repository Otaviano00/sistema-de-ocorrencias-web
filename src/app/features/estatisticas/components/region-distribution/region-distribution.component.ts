import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-region-distribution',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
      <h2 class="text-lg font-bold text-slate-900 mb-6">
        Distribuição por região
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (regiao of regioes(); track regiao.nome) {
          <div
            class="p-4 rounded-xl bg-gray-50/50 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider"
                >{{ regiao.nome }}</span
              >
              <h3 class="text-3xl font-extrabold text-slate-900 my-1">
                {{ regiao.total }}
              </h3>
            </div>
            <p
              class="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200/60"
            >
              {{ regiao.pendentes }} pendentes •
              {{ regiao.concluidas }} concluídas
            </p>
          </div>
        }
      </div>
    </div>
  `,
})
export class RegionDistributionComponent {
  regioes = signal([
    {
      nome: 'Asa Norte',
      total: 98,
      pendentes: '62 pendentes',
      concluidas: '36 concluídas',
    },
    {
      nome: 'Asa Sul',
      total: 76,
      pendentes: '44 pendentes',
      concluidas: '32 concluídas',
    },
    {
      nome: 'Lago Norte',
      total: 44,
      pendentes: '28 pendentes',
      concluidas: '16 concluídas',
    },
    {
      nome: 'Sudoeste',
      total: 30,
      pendentes: '22 pendentes',
      concluidas: '8 concluídas',
    },
  ]);
}
