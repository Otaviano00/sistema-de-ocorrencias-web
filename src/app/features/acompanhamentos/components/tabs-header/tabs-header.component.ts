import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tabs-header',
  imports: [CommonModule],
  template: `
    <div
      class="bg-white px-6 pt-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex gap-8"
    >
      <button
        class="pb-3 border-b-2 border-emerald-700 text-sm font-bold text-slate-900 flex items-center gap-2"
      >
        Ocorrências acompanhadas
        <span
          class="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium"
          >3</span
        >
      </button>
      <button
        class="pb-3 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-slate-800 flex items-center gap-2"
      >
        Monitoramentos ativos
        <span
          class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium"
          >2</span
        >
      </button>
    </div>
  `,
})
export class TabsHeaderComponent {}
