// src/app/features/estatisticas/estatisticas.component.ts
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {FiltersBarComponent} from './components/filters-bar/filters-bar.component';
import {MetricsCardsComponent} from './components/metrics-cards/metrics-cards.component';
import {EvolutionChartComponent} from './components/evolution-chart/evolution-chart.component';
import {CategoryBreakdownComponent} from './components/category-breakdown/category-breakdown.component';
import {RegionDistributionComponent} from './components/region-distribution/region-distribution.component';

@Component({
  selector: 'app-estatisticas-page',
  imports: [
    CommonModule,
    SidebarComponent,
    FiltersBarComponent,
    MetricsCardsComponent,
    EvolutionChartComponent,
    CategoryBreakdownComponent,
    RegionDistributionComponent,
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
              >Consulta pública</span
            >
            <button
              class="bg-gray-100 hover:bg-gray-200 text-slate-800 text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Entrar na plataforma
            </button>
          </div>
        </header>

        <!-- Corpo da Página -->
        <main class="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col">
          <!-- Título da Seção -->
          <div class="mb-6">
            <span
              class="text-xs font-semibold text-emerald-700 uppercase tracking-wider"
              >Transparência em números</span
            >
            <h1 class="text-2xl font-bold text-slate-900">
              Uma visão de como a cidade está.
            </h1>
            <p class="text-xs text-gray-500 mt-1">
              Distribuição e evolução das ocorrências • Dados de demonstração
            </p>
          </div>

          <!-- Barra de Filtros -->
          <app-filters-bar />

          <!-- Cards de Métricas Principais (3 colunas) -->
          <app-metrics-cards />

          <!-- Grid Central (Gráfico de Evolução Esquerda + Categorias Direita) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="lg:col-span-2">
              <app-evolution-chart />
            </div>
            <div>
              <app-category-breakdown />
            </div>
          </div>

          <!-- Distribuição por Região (Cards Inferiores) -->
          <app-region-distribution />

          <!-- Rodapé informativo -->
          <div class="text-center text-xs text-gray-400 pb-4">
            Critério: data de criação e status atual. Ocorrências excluídas não
            entram nas contagens.
          </div>
        </main>
      </div>
    </div>
  `,
})
export class EstatisticasPageComponent {}
