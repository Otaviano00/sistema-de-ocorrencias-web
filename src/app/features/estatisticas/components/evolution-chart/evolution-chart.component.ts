import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-evolution-chart',
  imports: [CommonModule],
  template: `
    <div
      class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full"
    >
      <div>
        <div class="flex justify-between items-center mb-1">
          <h2 class="text-lg font-bold text-slate-900">
            Evolução dos registros
          </h2>
          <div class="flex items-center gap-4 text-xs font-medium">
            <span class="flex items-center gap-1.5 text-amber-700"
              ><span
                class="w-2.5 h-2.5 rounded bg-amber-600 inline-block"
              ></span>
              Pendentes</span
            >
            <span class="flex items-center gap-1.5 text-emerald-800"
              ><span
                class="w-2.5 h-2.5 rounded bg-emerald-700 inline-block"
              ></span>
              Concluídas</span
            >
          </div>
        </div>
        <p class="text-xs text-gray-400 mb-6">
          Por data de criação - status atual de cada ocorrência
        </p>

        <!-- Simulação visual do gráfico de barras -->
        <div
          class="h-56 flex items-end justify-between gap-4 border-b border-gray-200 pb-2 px-2 relative"
        >
          @for (col of chartData(); track col.periodo) {
            <div
              class="flex-1 flex flex-col items-center h-full justify-end gap-1 group"
            >
              <span class="text-[11px] font-bold text-slate-700">{{
                col.total
              }}</span>
              <!-- Barra empilhada -->
              <div
                class="w-full max-w-[48px] bg-amber-600 rounded-t flex flex-col justify-end overflow-hidden"
                [style.height.px]="col.alturaPendente"
              >
                <div
                  class="bg-emerald-700 w-full"
                  [style.height.px]="col.alturaConcluida"
                ></div>
              </div>
              <span class="text-[11px] text-gray-400 mt-2 whitespace-nowrap">{{
                col.periodo
              }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class EvolutionChartComponent {
  chartData = signal([
    {periodo: '1–2 nov.', total: 30, alturaPendente: 60, alturaConcluida: 35},
    {periodo: '3–4 nov.', total: 38, alturaPendente: 75, alturaConcluida: 42},
    {periodo: '5–6 nov.', total: 45, alturaPendente: 85, alturaConcluida: 50},
    {periodo: '7–8 nov.', total: 40, alturaPendente: 75, alturaConcluida: 45},
    {periodo: '9–10 nov.', total: 51, alturaPendente: 95, alturaConcluida: 55},
    {periodo: '11–12 nov.', total: 44, alturaPendente: 80, alturaConcluida: 50},
  ]);
}
