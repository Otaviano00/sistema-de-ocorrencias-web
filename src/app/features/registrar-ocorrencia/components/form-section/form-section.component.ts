import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-form-section',
  imports: [CommonModule],
  template: `
    <div
      class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6"
    >
      <div>
        <h2 class="text-xl font-bold text-slate-900">Descreva o problema</h2>
        <p class="text-xs text-gray-500 mt-0.5">
          Os campos com * são obrigatórios.
        </p>
      </div>

      <!-- Categoria -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
          >Categoria *</label
        >
        <select
          class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          <option>Calçadas e vias</option>
          <option>Iluminação pública</option>
          <option>Drenagem</option>
          <option>Limpeza urbana</option>
        </select>
        <span class="text-[11px] text-gray-400"
          >Somente categorias ativas estão disponíveis.</span
        >
      </div>

      <!-- Título -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
          >Título *</label
        >
        <input
          type="text"
          value="Buraco na calçada"
          class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
      </div>

      <!-- Descrição -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
          >Descrição *</label
        >
        <textarea
          rows="4"
          class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
        >
A calçada está danificada próximo à faixa de pedestres da SQN 208. O buraco dificulta a passagem de cadeirantes e pedestres.</textarea>
        <span class="text-[11px] text-gray-400"
          >Descreva o problema e um ponto de referência.</span
        >
      </div>

      <!-- Fotografia -->
      <div class="flex flex-col gap-1.5">
        <div class="flex justify-between items-center">
          <label
            class="text-xs font-bold text-gray-700 uppercase tracking-wider"
            >Fotografia</label
          >
          <span class="text-xs text-gray-400">Opcional</span>
        </div>
        <div
          class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-emerald-600 transition cursor-pointer bg-gray-50/50"
        >
          <span
            class="text-emerald-700 font-semibold text-sm flex items-center justify-center gap-1.5 mb-1"
          >
            ⬆️ Escolher fotografia
          </span>
          <p class="text-[11px] text-gray-400">
            O registro também pode ser enviado sem foto.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class FormSectionComponent {}
