// src/app/features/registrar-ocorrencia/registrar-ocorrencia.component.ts
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../mapa/components/sidebar/sidebar.component';
import {StepIndicatorComponent} from './components/step-indicator/step-indicator.component';
import {FormSectionComponent} from './components/form-section/form-section.component';
import {SummarySidebarComponent} from './components/summary-sidebar/summary-sidebar.component';

@Component({
  selector: 'app-registrar-ocorrencia-page',
  imports: [
    CommonModule,
    SidebarComponent,
    StepIndicatorComponent,
    FormSectionComponent,
    SummarySidebarComponent,
  ],
  template: `
    <div class="flex h-screen bg-gray-50 text-slate-800 overflow-hidden">
      <!-- Menu Lateral Global da Aplicação -->
      <app-sidebar />

      <!-- Conteúdo Principal -->
      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <!-- Header Superior Fictício da Conta -->
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
        <main class="flex-1 p-8 max-w-7xl mx-auto w-full">
          <!-- Topo da Sessão com Botão Voltar -->
          <div class="flex justify-between items-start mb-6">
            <div>
              <span
                class="text-xs font-semibold text-emerald-700 uppercase tracking-wider"
                >Participação cidadã</span
              >
              <h1 class="text-2xl font-bold text-slate-900">
                Conte o que precisa de atenção.
              </h1>
              <p class="text-xs text-gray-500 mt-1">
                Um registro claro ajuda a entender o problema e a acompanhar sua
                resolução.
              </p>
            </div>
            <button
              class="bg-white hover:bg-gray-50 border border-gray-200 text-slate-800 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition"
            >
              ← Voltar ao mapa
            </button>
          </div>

          <!-- Indicador de Etapas -->
          <app-step-indicator />

          <!-- Grid Principal do Formulário (2 colunas) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Esquerda: Formulário (Ocupa 2 colunas) -->
            <div class="lg:col-span-2">
              <app-form-section />
            </div>

            <!-- Direita: Resumo e Confirmação (Ocupa 1 coluna) -->
            <div>
              <app-summary-sidebar />
            </div>
          </div>

          <!-- Rodapé informativo -->
          <div class="mt-8 text-center text-xs text-gray-400 pb-4">
            Sua ocorrência ficará disponível para consulta pública. Dados da
            conta não aparecem no mapa.
          </div>
        </main>
      </div>
    </div>
  `,
})
export class RegistrarOcorrenciaPageComponent {}
