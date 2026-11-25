import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import {Router} from '@angular/router';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {MapViewComponent} from './components/map-view/map-view.component';
import {OccurrenceDetailComponent} from './components/occurrence-detail/occurrence-detail.component';

export interface OccurrenceItem {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  local: string;
  status: string;
}

@Component({
  selector: 'app-mapa-page',
  imports: [
    SidebarComponent,
    HeaderComponent,
    MapViewComponent,
    OccurrenceDetailComponent,
  ],
  template: `
    <div class="flex h-screen bg-gray-50 text-slate-800 overflow-hidden">
      <app-sidebar activeItem="mapa" (navigate)="navigateTo($event)" />

      <div class="flex-1 flex flex-col min-w-0">
        <app-header />

        <main class="flex-1 p-6 overflow-y-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div class="lg:col-span-2 h-full">
              <app-map-view (occurrenceSelected)="selectOccurrence($event)" />
            </div>

            <div class="h-full">
              <app-occurrence-detail [ocorrencia]="activeOccurrence()" />
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class MapaPageComponent {
  private router = inject(Router);

  ocorrenciaId = input<string | undefined>(undefined);

  occurrences = signal<OccurrenceItem[]>([
    {
      id: '0248',
      titulo: 'Buraco na calçada',
      descricao:
        'A calçada está danificada próximo à faixa de pedestres da SQN 208. O buraco dificulta a passagem de cadeirantes e pedestres.',
      categoria: 'Calçadas e vias',
      local: 'Asa Norte • Brasília, DF',
      status: 'Pendente',
    },
    {
      id: '0246',
      titulo: 'Poste sem iluminação',
      descricao:
        'Poste apagado na quadra, reduzindo a visibilidade noturna para pedestres.',
      categoria: 'Iluminação pública',
      local: 'Asa Norte • Brasília, DF',
      status: 'Pendente',
    },
  ]);

  selectedId = linkedSignal(() => this.ocorrenciaId() ?? '0248');

  activeOccurrence = computed<OccurrenceItem>(() => {
    const id = this.selectedId();
    return (
      this.occurrences().find(item => item.id === id) ?? this.occurrences()[0]
    );
  });

  selectOccurrence(idOrEvent: string | Event) {
    const id = typeof idOrEvent === 'string' ? idOrEvent : '0248';
    this.selectedId.set(id);
    this.router.navigate(['/mapa', id]);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
