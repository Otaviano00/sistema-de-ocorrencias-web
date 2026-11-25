import {Component, output, signal} from '@angular/core';

interface MapPin {
  id: string;
  label: string;
  status: 'Pendente' | 'Concluída';
  xPercent: number;
  yPercent: number;
}

@Component({
  selector: 'app-map-view',
  template: `
    <div
      class="bg-white border border-gray-200 rounded-2xl p-5 h-full flex flex-col justify-between"
    >
      <div class="flex items-center justify-between mb-4">
        <div>
          <span
            class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block"
          >
            Mapa interativo
          </span>
          <h2 class="text-base font-bold text-slate-900">
            Ocorrências em Brasília, DF
          </h2>
        </div>
        <span class="text-xs text-gray-500">
          Clique em um marcador para inspecionar
        </span>
      </div>

      <div
        class="relative flex-1 min-h-[340px] rounded-xl bg-[#e9efe9] border border-emerald-900/10 overflow-hidden p-4"
      >
        @for (pin of pins(); track pin.id) {
          <button
            type="button"
            (click)="onSelectPin(pin.id)"
            [style.left.%]="pin.xPercent"
            [style.top.%]="pin.yPercent"
            class="absolute -translate-x-1/2 -translate-y-1/2 bg-white hover:bg-emerald-50 border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition text-left cursor-pointer"
          >
            <p class="text-xs font-bold text-slate-900 whitespace-nowrap">
              {{ pin.label }}
            </p>
            <p class="text-[11px] text-gray-500 mt-0.5">
              #{{ pin.id }} · {{ pin.status }}
            </p>
          </button>
        }
      </div>
    </div>
  `,
})
export class MapViewComponent {
  occurrenceSelected = output<string>();

  pins = signal<MapPin[]>([
    {
      id: '0248',
      label: 'Buraco na calçada',
      status: 'Pendente',
      xPercent: 32,
      yPercent: 38,
    },
    {
      id: '0246',
      label: 'Poste sem iluminação',
      status: 'Pendente',
      xPercent: 66,
      yPercent: 58,
    },
  ]);

  onSelectPin(id: string) {
    this.occurrenceSelected.emit(id);
  }
}
