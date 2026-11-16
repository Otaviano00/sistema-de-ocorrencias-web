import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moderation-detail',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full overflow-y-auto">
      <div>
        <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span class="font-mono font-bold">#{{ ocorrencia().id }} - {{ ocorrencia().data }}</span>
        </div>

        <h2 class="text-xl font-bold text-slate-900 mb-3">{{ ocorrencia().titulo }}</h2>

        <!-- Tags de Status -->
        <div class="flex items-center gap-2 mb-6">
          <span class="text-xs bg-amber-50 text-amber-700 font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            ⏳ {{ ocorrencia().status }}
          </span>
          <span class="text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            ✓ Validada
          </span>
        </div>

        <div class="mb-6">
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ ocorrencia().descricao }}
          </p>
        </div>

        <div class="mb-6 p-4 rounded-xl bg-gray-50/60 border border-gray-100">
          <h3 class="font-bold text-slate-900 text-sm mb-0.5">{{ ocorrencia().local }}</h3>
          <p class="text-xs text-gray-500 mb-1">{{ ocorrencia().categoria }} • <span class="font-mono">{{ ocorrencia().coordenadas }}</span></p>
        </div>

        <!-- Botões de Ação Secundária -->
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button class="bg-white hover:bg-gray-50 border border-gray-200 text-slate-800 font-medium py-2 px-3 rounded-lg text-xs shadow-sm transition">
            Editar dados
          </button>
          <button class="bg-white hover:bg-gray-50 border border-gray-200 text-slate-800 font-medium py-2 px-3 rounded-lg text-xs shadow-sm transition flex items-center justify-center gap-1">
            Ver no mapa ↗
          </button>
        </div>

        <!-- Card Informativo de Validação -->
        <div class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 mb-6">
          <div class="flex items-center gap-1.5 text-emerald-800 font-bold text-xs mb-1">
            ✓ Informações validadas
          </div>
          <p class="text-xs text-gray-500">A validação não conclui a ocorrência.</p>
        </div>
      </div>

      <!-- Rodapé com Ação Crítica -->
      <div class="pt-4 border-t border-gray-100 flex flex-col gap-3">
        <button class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl text-sm shadow-sm transition flex items-center justify-center gap-2">
          Confirmar resolução e concluir
        </button>
        <p class="text-[11px] text-center text-gray-400">
          A conclusão envia um e-mail aos acompanhantes e encerra os acompanhamentos ativos.
        </p>
        <button class="text-xs font-semibold text-rose-600 hover:text-rose-700 text-center mt-2 transition">
          Excluir conteúdo inadequado...
        </button>
      </div>
    </div>
  `
})
export class ModerationDetailComponent {
  ocorrencia = input({
    id: '0248',
    data: '12 nov. 2026, 09:32',
    titulo: 'Buraco na calçada',
    status: 'Pendente',
    descricao: 'A calçada está danificada próximo à faixa de pedestres da SQN 208. O buraco dificulta a passagem de cadeirantes e pedestres.',
    local: 'Asa Norte • Brasília, DF',
    categoria: 'Calçadas e vias',
    coordenadas: '-15.7472, -47.8821'
  });
}