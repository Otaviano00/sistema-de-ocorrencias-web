import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metrics-cards',
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Card 1 -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Ocorrências registradas</span>
          <span class="w-3 h-3 rounded-full bg-slate-900 inline-block"></span>
        </div>
        <div>
          <h2 class="text-4xl font-extrabold text-slate-900 mb-1">248</h2>
          <p class="text-xs text-gray-400">Criadas no período selecionado</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Pendentes</span>
          <span class="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
        </div>
        <div>
          <h2 class="text-4xl font-extrabold text-amber-700 mb-1">156</h2>
          <p class="text-xs text-gray-400">Aguardando resolução</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Concluídas</span>
          <span class="w-3 h-3 rounded-full bg-emerald-700 inline-block"></span>
        </div>
        <div>
          <h2 class="text-4xl font-extrabold text-emerald-800 mb-1">92</h2>
          <p class="text-xs text-gray-400">37,1% dos registros do período</p>
        </div>
      </div>
    </div>
  `
})
export class MetricsCardsComponent {}