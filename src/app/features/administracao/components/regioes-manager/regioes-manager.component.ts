import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

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
        </div>
        <p class="text-xs text-gray-400 mb-4">
          Brasília, DF • Identificadas pela API de mapas
        </p>

        <!-- Barra de Busca -->
        <div class="mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar região reconhecida"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <!-- Tabela de Regiões -->
        <div class="overflow-x-auto mb-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
              >
                <th class="pb-3 font-semibold">Região</th>
                <th class="pb-3 font-semibold text-right">Atendimento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              @for (reg of regioes(); track reg.nome) {
                <tr class="hover:bg-gray-50/80 transition">
                  <td class="py-3.5">
                    <p class="font-bold text-slate-900 text-sm">
                      {{ reg.nome }}
                    </p>
                    <p class="text-[11px] text-gray-400">{{ reg.detalhe }}</p>
                  </td>
                  <td class="py-3.5 text-right space-x-3 text-xs font-medium">
                    @if (reg.ativa) {
                      <span
                        class="inline-block text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded"
                        >Ativa</span
                      >
                      <button class="text-gray-400 hover:text-gray-600">
                        Desativar
                      </button>
                    } @else {
                      <span
                        class="inline-block text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded"
                        >⚠️ Inativa</span
                      >
                      <button
                        class="text-emerald-700 hover:text-emerald-800 font-semibold"
                      >
                        Ativar
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Nota de rodapé sobre áreas -->
      <div class="pt-4 border-t border-gray-100">
        <h3 class="text-xs font-bold text-slate-900 mb-1">
          Sem desenho manual de áreas
        </h3>
        <p class="text-xs text-gray-500 leading-relaxed">
          O bairro é reconhecido a partir do GPS. Uma região inativa bloqueia
          novos registros, mas mantém as ocorrências existentes.
        </p>
      </div>
    </div>
  `,
})
export class RegioesManagerComponent {
  regioes = signal([
    {nome: 'Asa Norte', detalhe: 'Brasília, Distrito Federal', ativa: true},
    {nome: 'Asa Sul', detalhe: 'Brasília, Distrito Federal', ativa: true},
    {nome: 'Lago Norte', detalhe: 'Brasília, Distrito Federal', ativa: true},
    {nome: 'Sudoeste', detalhe: 'Brasília, Distrito Federal', ativa: true},
    {
      nome: 'Setor Noroeste',
      detalhe: 'Brasília, Distrito Federal',
      ativa: false,
    },
  ]);
}
