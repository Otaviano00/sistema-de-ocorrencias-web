// src/app/features/mapa/mapa.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { OccurrenceDetailComponent } from './components/occurrence-detail/occurrence-detail.component';

@Component({
  selector: 'app-mapa-page',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    MapViewComponent,
    OccurrenceDetailComponent
  ],
  template: `
    <div class="flex h-screen bg-gray-50 text-slate-800 overflow-hidden">
      
      <!-- Menu Lateral -->
      <app-sidebar />

      <!-- Conteúdo Principal -->
      <div class="flex-1 flex flex-col min-w-0">
        
        <!-- Header Superior -->
        <app-header />

        <!-- Corpo com Grid entre Mapa e Detalhes -->
        <main class="flex-1 p-6 overflow-y-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            
            <!-- Mapa ocupa 2 colunas -->
            <div class="lg:col-span-2 h-full">
              <app-map-view />
            </div>

            <!-- Detalhes da Ocorrência na coluna da direita -->
            <div class="h-full">
              <app-occurrence-detail [ocorrencia]="selectedOccurrence()" />
            </div>

          </div>
        </main>

      </div>

    </div>
  `
})
export class MapaPageComponent {
  // Estado local gerenciado via signals
  selectedOccurrence = signal({
    id: '0248',
    titulo: 'Buraco na calçada',
    descricao: 'A calçada está danificada próximo à faixa de pedestres da SQN 208. O buraco dificulta a passagem de cadeirantes e pedestres.',
    categoria: 'Calçadas e vias',
    local: 'Asa Norte • Brasília, DF',
    status: 'Pendente'
  });
}