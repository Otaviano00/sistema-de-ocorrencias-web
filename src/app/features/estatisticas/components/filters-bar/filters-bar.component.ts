import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters-bar',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 mb-6 items-center">
      <select class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 flex-1 min-w-[200px]">
        <option>Todas as regiões</option>
      </select>
      <select class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 flex-1 min-w-[200px]">
        <option>01 a 12 nov. 2026</option>
      </select>
      <select class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 flex-1 min-w-[200px]">
        <option>Todos os status</option>
      </select>
      <button class="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-2.5 rounded-lg text-sm shadow-sm transition">
        Aplicar filtros
      </button>
    </div>
  `
})
export class FiltersBarComponent {}