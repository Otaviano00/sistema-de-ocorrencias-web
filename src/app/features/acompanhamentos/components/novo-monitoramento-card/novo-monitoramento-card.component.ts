import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-novo-monitoramento-card',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Novo monitoramento</h2>
        <p class="text-xs text-gray-500 mb-6">Receba avisos de novas ocorrências.</p>

        <!-- Região -->
        <div class="flex flex-col gap-1.5 mb-4">
          <label class="text-xs font-bold text-gray-700 uppercase tracking-wider">Região</label>
          <select class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600">
            <option>Asa Norte</option>
            <option>Asa Sul</option>
            <option>Lago Norte</option>
          </select>
        </div>

        <!-- Categoria -->
        <div class="flex flex-col gap-1.5 mb-4">
          <label class="text-xs font-bold text-gray-700 uppercase tracking-wider">Categoria</label>
          <select class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600">
            <option>Iluminação pública</option>
            <option>Calçadas e vias</option>
            <option>Drenagem</option>
          </select>
        </div>

        <p class="text-[11px] text-gray-400 mb-6 leading-relaxed">
          Escolha uma região, uma categoria ou ambas. Com ambas, o aviso exige os dois critérios.
        </p>
      </div>

      <button class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl text-sm shadow-sm transition">
        Ativar monitoramento
      </button>
    </div>
  `
})
export class NovoMonitoramentoCardComponent {}