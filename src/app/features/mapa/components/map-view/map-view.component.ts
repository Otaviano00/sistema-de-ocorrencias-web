import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-map-view',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col h-full gap-6">
      <!-- Título e Botão de Ação -->
      <div class="flex justify-between items-center shrink-0">
        <div>
          <span
            class="text-xs font-semibold text-emerald-700 uppercase tracking-wider"
            >Explore sua cidade</span
          >
          <h1 class="text-2xl font-bold text-slate-900">
            Cada ponto, uma melhoria possível.
          </h1>
        </div>
        <button
          class="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition"
        >
          + Registrar ocorrência
        </button>
      </div>

      <!-- Barra de Filtros -->
      <div
        class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-center shrink-0"
      >
        <input
          type="text"
          placeholder="Buscar região ou ocorrência"
          class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <select
          class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option>Todas as categorias</option>
        </select>
        <select
          class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option>Todos os status</option>
        </select>
        <select
          class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option>Brasília, DF</option>
        </select>
      </div>

      <!-- Caixa do Mapa Interativo -->
      <div
        class="flex-1 bg-emerald-50/20 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex items-center justify-center min-h-[450px]"
      >
        <div class="text-center p-6">
          <span class="text-5xl mb-3 block">🗺️</span>
          <p class="font-bold text-slate-700 text-lg">
            Área do Mapa Interativo
          </p>
          <p class="text-xs text-gray-500 max-w-sm mt-1">
            Integração pronta para exibir os marcadores em cima do espaço
            expandido.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class MapViewComponent {}
