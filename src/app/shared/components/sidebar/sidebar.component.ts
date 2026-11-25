import {Component, input, output, signal} from '@angular/core';

export type NavItemId =
  | 'mapa'
  | 'registrar'
  | 'acompanhamentos'
  | 'estatisticas'
  | 'moderacao'
  | 'administracao';

interface NavItem {
  id: NavItemId;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  template: `
    <aside
      class="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4 shrink-0 h-full"
    >
      <div>
        <div class="flex items-center gap-2.5 mb-8 px-2">
          <div
            class="bg-emerald-700 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
          >
            Z
          </div>
          <div>
            <span
              class="text-xl font-bold tracking-tight text-slate-900 block leading-none"
              >zelar</span
            >
            <span
              class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
              >Cidade em comum</span
            >
          </div>
        </div>

        <div class="mb-6">
          <p
            class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2"
          >
            Principal
          </p>
          <nav aria-label="Menu principal" class="space-y-1">
            @for (item of principalItems(); track item.id) {
              <button
                type="button"
                (click)="navigate.emit(item.route)"
                [attr.aria-current]="activeItem() === item.id ? 'page' : null"
                [class.bg-emerald-50]="activeItem() === item.id"
                [class.text-emerald-800]="activeItem() === item.id"
                [class.font-semibold]="activeItem() === item.id"
                [class.text-gray-600]="activeItem() !== item.id"
                [class.hover:bg-gray-100]="activeItem() !== item.id"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition text-left cursor-pointer"
              >
                <span aria-hidden="true">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </button>
            }
          </nav>
        </div>

        <div>
          <p
            class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2"
          >
            Gestão
          </p>
          <nav aria-label="Menu de gestão" class="space-y-1">
            @for (item of gestaoItems(); track item.id) {
              <button
                type="button"
                (click)="navigate.emit(item.route)"
                [attr.aria-current]="activeItem() === item.id ? 'page' : null"
                [class.bg-emerald-50]="activeItem() === item.id"
                [class.text-emerald-800]="activeItem() === item.id"
                [class.font-semibold]="activeItem() === item.id"
                [class.text-gray-600]="activeItem() !== item.id"
                [class.hover:bg-gray-100]="activeItem() !== item.id"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition text-left cursor-pointer"
              >
                <span aria-hidden="true">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </button>
            }
          </nav>
        </div>
      </div>

      <div class="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
        <p class="text-xs font-bold text-emerald-950 mb-1">
          Uma cidade melhor começa com você.
        </p>
        <p class="text-[11px] text-emerald-800 leading-relaxed">
          Registre. Acompanhe. Faça parte da mudança.
        </p>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  activeItem = input<NavItemId>('mapa');
  navigate = output<string>();

  principalItems = signal<NavItem[]>([
    {id: 'mapa', label: 'Mapa de ocorrências', icon: '🗺️', route: '/mapa'},
    {
      id: 'registrar',
      label: 'Registrar ocorrência',
      icon: '➕',
      route: '/registrar-ocorrencia',
    },
    {
      id: 'acompanhamentos',
      label: 'Acompanhamentos',
      icon: '🔔',
      route: '/acompanhamentos',
    },
    {
      id: 'estatisticas',
      label: 'Estatísticas',
      icon: '📊',
      route: '/estatisticas',
    },
  ]);

  gestaoItems = signal<NavItem[]>([
    {id: 'moderacao', label: 'Moderação', icon: '🛡️', route: '/moderacao'},
    {
      id: 'administracao',
      label: 'Administração',
      icon: '⚙️',
      route: '/administracao',
    },
  ]);
}
