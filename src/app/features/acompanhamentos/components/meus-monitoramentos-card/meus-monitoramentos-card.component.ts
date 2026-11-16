import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meus-monitoramentos-card',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 class="text-lg font-bold text-slate-900 mb-6">Seus monitoramentos</h2>

      <div class="space-y-4">
        @for (item of monitoramentos(); track item.titulo) {
          <div class="pb-4 border-b border-gray-100 last:border-0 last:pb-0 flex justify-between items-center">
            <div>
              <h3 class="font-bold text-slate-900 text-sm">{{ item.titulo }}</h3>
              <p class="text-xs text-gray-500">{{ item.descricao }}</p>
            </div>
            <button class="text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition">
              Cancelar monitoramento
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class MeusMonitoramentosCardComponent {
  monitoramentos = signal([
    { titulo: 'Asa Norte + Iluminação pública', descricao: 'Região e categoria' },
    { titulo: 'Asa Sul · Todas as categorias', descricao: 'Somente região' }
  ]);
}