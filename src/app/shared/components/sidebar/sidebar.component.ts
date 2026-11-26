import {Component, input, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

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
  imports: [RouterLink, RouterLinkActive],
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
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-emerald-50 text-emerald-800 font-semibold"
                [routerLinkActiveOptions]="{exact: false}"
                [attr.aria-current]="activeItem() === item.id ? 'page' : null"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition text-left cursor-pointer text-gray-600 hover:bg-gray-100"
              >
                <span aria-hidden="true">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </a>
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
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-emerald-50 text-emerald-800 font-semibold"
                [routerLinkActiveOptions]="{exact: false}"
                [attr.aria-current]="activeItem() === item.id ? 'page' : null"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition text-left cursor-pointer text-gray-600 hover:bg-gray-100"
              >
                <span aria-hidden="true">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </a>
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
