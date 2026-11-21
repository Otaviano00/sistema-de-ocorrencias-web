import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-category-breakdown',
  imports: [CommonModule],
  template: `
    <div
      class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full"
    >
      <div>
        <h2 class="text-lg font-bold text-slate-900 mb-6">Por categoria</h2>

        <div class="space-y-5">
          @for (cat of categorias(); track cat.nome) {
            <div>
              <div
                class="flex justify-between items-center text-xs font-semibold mb-1.5"
              >
                <span class="text-slate-800">{{ cat.nome }}</span>
                <span class="text-slate-900">{{ cat.valor }}</span>
              </div>
              <div
                class="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden"
              >
                <div
                  class="bg-emerald-700 h-full rounded-full"
                  [style.width.%]="cat.porcentagem"
                ></div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class CategoryBreakdownComponent {
  categorias = signal([
    {nome: 'Calçadas e vias', valor: 102, porcentagem: 100},
    {nome: 'Iluminação pública', valor: 78, porcentagem: 76},
    {nome: 'Limpeza urbana', valor: 42, porcentagem: 41},
    {nome: 'Drenagem', valor: 26, porcentagem: 25},
  ]);
}
