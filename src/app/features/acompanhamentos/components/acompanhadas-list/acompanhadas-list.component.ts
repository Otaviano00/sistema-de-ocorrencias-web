import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acompanhadas-list',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Ocorrências acompanhadas</h2>
        <p class="text-xs text-gray-500 mb-6">Você receberá um e-mail quando forem concluídas.</p>

        <div class="space-y-4">
          @for (item of ocorrencias(); track item.id) {
            <div class="pb-4 border-b border-gray-100 last:border-0 last:pb-0 flex justify-between items-center">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs font-mono font-bold text-gray-400">#{{ item.id }}</span>
                  <span class="text-xs bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded">⏳ {{ item.status }}</span>
                </div>
                <h3 class="font-bold text-slate-900 text-sm">{{ item.titulo }}</h3>
                <p class="text-xs text-gray-500">{{ item.categoria }} • {{ item.local }}</p>
              </div>
              <button class="text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition">
                Deixar de acompanhar
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class AcompanhadasListComponent {
  ocorrencias = signal([
    { id: '0248', titulo: 'Buraco na calçada', categoria: 'Calçadas e vias', local: 'Asa Norte', status: 'Pendente' },
    { id: '0246', titulo: 'Poste sem iluminação', categoria: 'Iluminação pública', local: 'Asa Norte', status: 'Pendente' },
    { id: '0239', titulo: 'Descarte irregular de lixo', categoria: 'Limpeza urbana', local: 'Asa Norte', status: 'Pendente' }
  ]);
}