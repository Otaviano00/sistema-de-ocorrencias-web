// src/app/features/moderacao/moderacao.component.ts
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {ModerationMetricsComponent} from './components/moderation-metrics/moderation-metrics.component';
import {PendingTableComponent} from './components/pending-table/pending-table.component';
import {ModerationDetailComponent} from './components/moderation-detail/moderation-detail.component';

@Component({
  selector: 'app-moderacao-page',
  imports: [
    CommonModule,
    SidebarComponent,
    ModerationMetricsComponent,
    PendingTableComponent,
    ModerationDetailComponent,
  ],
  template: `
    <div class="flex h-screen bg-gray-50 text-slate-800 overflow-hidden">
      <!-- Menu Lateral Global -->
      <app-sidebar />

      <!-- Conteúdo Principal -->
      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <!-- Header Superior -->
        <header
          class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0"
        >
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span class="flex items-center gap-1 font-medium text-slate-900"
              >📍 Brasília, DF</span
            >
            <span class="text-gray-300">|</span>
            <span>Plataforma de participação cidadã</span>
          </div>
          <div class="flex items-center gap-6">
            <span class="text-sm text-gray-600 cursor-pointer hover:text-black"
              >Área restrita</span
            >
            <div
              class="bg-gray-100 text-slate-800 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-2 border border-gray-200"
            >
              Conta de moderador
            </div>
          </div>
        </header>

        <!-- Corpo da Página -->
        <main class="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col">
          <!-- Título da Seção -->
          <div class="mb-6">
            <span
              class="text-xs font-semibold text-emerald-700 uppercase tracking-wider"
              >Painel de moderação</span
            >
            <h1 class="text-2xl font-bold text-slate-900">
              Da análise à resolução.
            </h1>
            <p class="text-xs text-gray-500 mt-1">
              Verifique os registros e conclua somente os problemas efetivamente
              solucionados.
            </p>
          </div>

          <!-- Cards de Métricas Superiores -->
          <app-moderation-metrics />

          <!-- Grid Central (Tabela à Esquerda + Detalhes à Direita) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 flex-1">
            <div class="lg:col-span-2">
              <app-pending-table />
            </div>
            <div>
              <app-moderation-detail />
            </div>
          </div>

          <!-- Rodapé informativo -->
          <div class="text-center text-xs text-gray-400 pb-4">
            A exclusão exige confirmação e remove definitivamente a ocorrência,
            a foto e os acompanhamentos.
          </div>
        </main>
      </div>
    </div>
  `,
})
export class ModeracaoPageComponent {}
