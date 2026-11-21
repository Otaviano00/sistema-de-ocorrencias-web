import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule],
  template: `
    <div class="mb-6">
      <span
        class="text-xs font-semibold text-emerald-700 uppercase tracking-wider"
        >Configurações da plataforma</span
      >
      <h1 class="text-2xl font-bold text-slate-900">
        Organize o atendimento da cidade.
      </h1>
      <p class="text-xs text-gray-500 mt-1">
        Gerencie as categorias disponíveis e as regiões que recebem novos
        registros.
      </p>
    </div>

    <!-- Aviso de desativação -->
    <div
      class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 mb-6 flex items-start gap-3"
    >
      <span class="text-emerald-700 font-bold mt-0.5">✓</span>
      <div>
        <p class="text-xs font-bold text-slate-900">
          Desativar não apaga o histórico.
        </p>
        <p class="text-xs text-gray-600 mt-0.5">
          Ocorrências anteriores continuam visíveis no mapa, nas estatísticas e
          nos relatórios.
        </p>
      </div>
    </div>
  `,
})
export class AdminHeaderComponent {}
