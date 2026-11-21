import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-info-avisos-card',
  imports: [CommonModule],
  template: `
    <div
      class="bg-emerald-50/40 p-6 rounded-xl border border-emerald-100 shadow-sm flex flex-col justify-between"
    >
      <div>
        <h2 class="text-lg font-bold text-slate-900 mb-4">
          Dois tipos de aviso. Você escolhe.
        </h2>

        <div class="space-y-4 text-xs text-slate-700">
          <div>
            <p class="font-bold text-slate-900 mb-0.5">
              Acompanhar uma ocorrência
            </p>
            <p class="text-gray-500">
              Avisa na conclusão e encerra o acompanhamento.
            </p>
          </div>
          <div>
            <p class="font-bold text-slate-900 mb-0.5">
              Monitorar uma região ou categoria
            </p>
            <p class="text-gray-500">
              Avisa sobre novos registros, sem acompanhar automaticamente cada
              ocorrência.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InfoAvisosCardComponent {}
