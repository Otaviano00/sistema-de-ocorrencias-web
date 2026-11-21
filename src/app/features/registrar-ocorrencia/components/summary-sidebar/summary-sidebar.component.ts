import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-summary-sidebar',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-6">
      <!-- Card: Localização Confirmada -->
      <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div
          class="flex items-center gap-1.5 text-emerald-800 font-bold text-sm mb-1"
        >
          ✓ Localização confirmada
        </div>
        <p class="text-xs text-gray-400 mb-4">
          Obtida pelo GPS com sua permissão.
        </p>

        <div class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
          <h3 class="font-bold text-slate-900 text-base">Asa Norte</h3>
          <p class="text-xs text-gray-600 mb-2">SQN 208 • Brasília, DF</p>
          <p class="text-[11px] font-mono text-gray-500 mb-3">
            -15.7472, -47.8821
          </p>
          <div
            class="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-100/60 px-2 py-0.5 rounded"
          >
            ✓ Região ativa e atendida
          </div>
        </div>

        <p class="text-[11px] text-gray-400 mt-4 leading-relaxed">
          A localização não pode ser digitada ou arrastada. Registre o problema
          no local em que você está.
        </p>
      </div>

      <!-- Card: Antes de Enviar -->
      <div
        class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between"
      >
        <div>
          <h3 class="font-bold text-slate-900 text-sm mb-1">Antes de enviar</h3>
          <p class="text-xs text-gray-500 leading-relaxed mb-4">
            Confira a descrição e a categoria. Sua localização atual será
            vinculada ao registro.
          </p>

          <div
            class="flex items-center gap-2 text-xs text-slate-700 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6"
          >
            <span>⏳</span>
            <div>
              <span class="font-semibold">Status inicial: Pendente</span>
              <p class="text-[11px] text-gray-400 mt-0.5">
                Quem monitora esta região ou categoria receberá um aviso sobre a
                nova ocorrência.
              </p>
            </div>
          </div>
        </div>

        <button
          class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl text-sm shadow-sm transition flex items-center justify-center gap-2"
        >
          Revisar e confirmar registro ➔
        </button>
      </div>
    </div>
  `,
})
export class SummarySidebarComponent {}
