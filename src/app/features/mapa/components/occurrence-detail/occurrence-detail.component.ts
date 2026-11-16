import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-occurrence-detail',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full overflow-y-auto">
      <div>
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Ocorrência #{{ ocorrencia().id }}</span>
          <span class="text-xs bg-amber-50 text-amber-700 font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            ⏳ {{ ocorrencia().status }}
          </span>
        </div>

        <h2 class="text-xl font-bold text-slate-900 mb-2">{{ ocorrencia().titulo }}</h2>
        
        <div class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded-md mb-6">
          ✓ Validada <span class="text-emerald-600 font-normal text-[11px] ml-1">Informações verificadas pela moderação.</span>
        </div>

        <div class="mb-6">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Descrição</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ ocorrencia().descricao }}
          </p>
        </div>

        <div class="mb-6">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Categoria</h3>
          <p class="text-sm font-semibold text-slate-800">{{ ocorrencia().categoria }}</p>
        </div>

        <div class="mb-6">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Localização</h3>
          <p class="text-sm font-semibold text-slate-800">{{ ocorrencia().local }}</p>
          <p class="text-xs text-gray-400 font-mono mt-0.5">-15.7472, -47.8821</p>
          <p class="text-xs text-gray-400 mt-2">Registrada em 12 nov. 2026, às 09:32</p>
        </div>
      </div>

      <!-- Rodapé do Detalhe -->
      <div class="pt-4 border-t border-gray-100">
        <button class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-lg text-sm shadow-sm transition mb-2">
          Acompanhar ocorrência
        </button>
        <p class="text-[11px] text-center text-gray-400">Entre para receber um e-mail na conclusão.</p>
      </div>
    </div>
  `
})
export class OccurrenceDetailComponent {
  // Recebe os dados de forma tipada usando signals input()
  ocorrencia = input.required<{
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    local: string;
    status: string;
  }>();
}