// src/app/features/administracao/administracao.component.ts
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../mapa/components/sidebar/sidebar.component';
import {AdminHeaderComponent} from './components/admin-header/admin-header.component';
import {CategoriasManagerComponent} from './components/categorias-manager/categorias-manager.component';
import {RegioesManagerComponent} from './components/regioes-manager/regioes-manager.component';

@Component({
  selector: 'app-administracao-page',
  imports: [
    CommonModule,
    SidebarComponent,
    AdminHeaderComponent,
    CategoriasManagerComponent,
    RegioesManagerComponent,
  ],
  template: `
    <div class="flex h-screen bg-gray-50 text-slate-800 overflow-hidden">
      <!-- Menu Lateral Global (já com Administração atualizado) -->
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
              Conta de administrador
            </div>
          </div>
        </header>

        <!-- Corpo da Página -->
        <main class="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col">
          <!-- Cabeçalho e Aviso da Página -->
          <app-admin-header />

          <!-- Grid Central (Categorias Esquerda + Regiões Direita) -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 flex-1">
            <app-categorias-manager />
            <app-regioes-manager />
          </div>

          <!-- Rodapé informativo -->
          <div class="text-center text-xs text-gray-400 pb-4">
            Ações administrativas são restritas à conta de administrador.
          </div>
        </main>
      </div>
    </div>
  `,
})
export class AdministracaoPageComponent {}
