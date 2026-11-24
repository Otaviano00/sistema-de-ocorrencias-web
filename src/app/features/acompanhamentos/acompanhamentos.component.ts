// src/app/features/acompanhamentos/acompanhamentos.component.ts
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {TabsHeaderComponent} from './components/tabs-header/tabs-header.component';
import {AcompanhadasListComponent} from './components/acompanhadas-list/acompanhadas-list.component';
import {NovoMonitoramentoCardComponent} from './components/novo-monitoramento-card/novo-monitoramento-card.component';
import {MeusMonitoramentosCardComponent} from './components/meus-monitoramentos-card/meus-monitoramentos-card.component';
import {InfoAvisosCardComponent} from './components/info-avisos-card/info-avisos-card.component';

@Component({
  selector: 'app-acompanhamentos-page',
  imports: [
    CommonModule,
    SidebarComponent,
    TabsHeaderComponent,
    AcompanhadasListComponent,
    NovoMonitoramentoCardComponent,
    MeusMonitoramentosCardComponent,
    InfoAvisosCardComponent,
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
              >Área do cidadão</span
            >
            <div
              class="bg-gray-100 text-slate-800 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-2 border border-gray-200"
            >
              <span>Minha conta</span> • <span>Cidadão</span>
            </div>
          </div>
        </header>

        <!-- Corpo da Página -->
        <main class="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col">
          <!-- Título da Seção -->
          <div class="mb-6">
            <span
              class="text-xs font-semibold text-emerald-700 uppercase tracking-wider"
              >Sua participação</span
            >
            <h1 class="text-2xl font-bold text-slate-900">
              Fique por dentro das mudanças.
            </h1>
            <p class="text-xs text-gray-500 mt-1">
              Escolha o que acompanhar e quais novos registros você quer receber
              por e-mail.
            </p>
          </div>

          <!-- Abas de Navegação -->
          <app-tabs-header />

          <!-- Grid Superior (Lista Esquerda + Novo Monitoramento Direita) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="lg:col-span-2">
              <app-acompanhadas-list />
            </div>
            <div>
              <app-novo-monitoramento-card />
            </div>
          </div>

          <!-- Grid Inferior (Meus Monitoramentos Esquerda + Info Direita) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="lg:col-span-2">
              <app-meus-monitoramentos-card />
            </div>
            <div>
              <app-info-avisos-card />
            </div>
          </div>

          <!-- Rodapé informativo -->
          <div class="text-center text-xs text-gray-400 pb-4">
            Cancelar um monitoramento não altera seus acompanhamentos
            individuais.
          </div>
        </main>
      </div>
    </div>
  `,
})
export class AcompanhamentosPageComponent {}
