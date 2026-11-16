import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  template: `
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4 shrink-0 h-full">
      <div>
        <!-- Logo -->
        <div class="flex items-center gap-2 mb-8 px-2">
          <div class="bg-emerald-700 text-white p-2 rounded-lg font-bold">Z</div>
          <span class="text-xl font-bold tracking-tight">zelar</span>
        </div>

        <!-- Menu Principal -->
        <div class="mb-6">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Principal</p>
          <nav class="space-y-1">
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium text-sm">
              🗺️ Mapa de ocorrências
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">
              ➕ Registrar ocorrência
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">
              🔔 Acompanhamentos
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">
              📊 Estatísticas
            </a>
          </nav>
        </div>

        <!-- Menu Gestão -->
        <div class="mb-6">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Gestão</p>
        <nav class="space-y-1">
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">🛡️ Moderação</a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">📈 Relatórios</a>
            <!-- Alterado de Configurações para Administração -->
            <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium text-sm">⚙️ Administração</a>
        </nav>
        </div>
      </div>

      <!-- Rodapé da Sidebar -->
      <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
        <p class="text-xs font-bold text-emerald-900 mb-1">Uma cidade melhor começa com você.</p>
        <p class="text-[11px] text-emerald-700">Registre. Acompanhe. Faça parte da mudança.</p>
      </div>
    </aside>
  `
})
export class SidebarComponent {}