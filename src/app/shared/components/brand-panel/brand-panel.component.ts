import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-panel',
  template: `
    <aside class="w-full lg:w-[44%] bg-emerald-50/70 border-b lg:border-b-0 lg:border-r border-emerald-100 p-8 lg:p-12 flex flex-col justify-between shrink-0">
      <div>
        <div class="flex items-center gap-2.5 mb-12">
          <div class="bg-emerald-700 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg shadow-xs">
            Z
          </div>
          <span class="text-2xl font-bold tracking-tight text-slate-900">zelar</span>
        </div>

        <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-3">
          Cidade em comum
        </span>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          Uma cidade melhor começa com você.
        </h1>
        <p class="text-sm text-gray-600 leading-relaxed max-w-md mb-10">
          Registre problemas de infraestrutura, acompanhe a resolução e participe das melhorias da sua região.
        </p>

        <div class="bg-[#e9efe9] border border-emerald-900/10 rounded-2xl p-5 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
          <div class="grid grid-cols-4 gap-2.5 opacity-60 pointer-events-none select-none">
            <div class="h-12 bg-emerald-800/10 rounded-md"></div>
            <div class="h-12 bg-emerald-800/10 rounded-md"></div>
            <div class="h-12 bg-emerald-800/10 rounded-md"></div>
            <div class="h-12 bg-emerald-800/10 rounded-md"></div>
          </div>

          <div class="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 max-w-[210px] z-10 mt-2">
            <p class="text-xs font-bold text-slate-900">Buraco na calçada</p>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700 mt-1">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              Pendente
            </span>
          </div>

          <div class="self-center -my-2 z-10 w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center shadow-md ring-4 ring-white/80">
            !
          </div>

          <div class="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 max-w-[220px] self-end z-10">
            <p class="text-xs font-bold text-slate-900">Iluminação restabelecida</p>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 mt-1">
              ✓ Concluída
            </span>
          </div>
        </div>
      </div>

      <p class="text-[11px] text-gray-500 mt-8">
        Mapa ilustrativo · A participação faz a diferença.
      </p>
    </aside>
  `
})
export class BrandPanelComponent {}