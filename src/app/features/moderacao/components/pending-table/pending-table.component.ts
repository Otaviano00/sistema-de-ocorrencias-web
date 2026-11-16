import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-table',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold text-slate-900">Ocorrências pendentes</h2>
          <span class="text-xs text-gray-500 cursor-pointer flex items-center gap-1 font-medium">
            Mais recentes <span>↓</span>
          </span>
        </div>

        <!-- Tabela -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th class="pb-3 font-semibold">Ocorrência</th>
                <th class="pb-3 font-semibold">Região</th>
                <th class="pb-3 font-semibold text-right">Validação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              @for (item of ocorrencias(); track item.id) {
                <tr class="hover:bg-gray-50/80 transition cursor-pointer" [class.bg-emerald-50/40]="item.selecionada">
                  <td class="py-3.5 pr-4">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono text-gray-400 font-bold">#{{ item.id }}</span>
                      <div>
                        <p class="font-bold text-slate-900 text-sm">{{ item.titulo }}</p>
                        <p class="text-xs text-gray-500">{{ item.categoria }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 text-xs text-gray-600 font-medium">{{ item.regiao }}</td>
                  <td class="py-3.5 text-right">
                    @if (item.validada) {
                      <span class="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md">
                        ✓ Validada
                      </span>
                    } @else {
                      <span class="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md">
                        Não validada
                      </span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class PendingTableComponent {
  ocorrencias = signal([
    { id: '0248', titulo: 'Buraco na calçada', categoria: 'Calçadas e vias', regiao: 'Asa Norte', validada: true, selecionada: true },
    { id: '0246', titulo: 'Poste sem iluminação', categoria: 'Iluminação pública', regiao: 'Asa Norte', validada: false, selecionada: false },
    { id: '0244', titulo: 'Lixo em área verde', categoria: 'Limpeza urbana', regiao: 'Asa Sul', validada: false, selecionada: false },
    { id: '0242', titulo: 'Bueiro obstruído', categoria: 'Drenagem', regiao: 'Lago Norte', validada: true, selecionada: false },
    { id: '0241', titulo: 'Rampa de acesso danificada', categoria: 'Calçadas e vias', regiao: 'Sudoeste', validada: true, selecionada: false },
    { id: '0240', titulo: 'Lâmpada intermitente', categoria: 'Iluminação pública', regiao: 'Asa Sul', validada: true, selecionada: false },
    { id: '0239', titulo: 'Descarte irregular de lixo', categoria: 'Limpeza urbana', regiao: 'Asa Norte', validada: false, selecionada: false },
    { id: '0238', titulo: 'Pavimento danificado', categoria: 'Calçadas e vias', regiao: 'Asa Sul', validada: true, selecionada: false }
  ]);
}