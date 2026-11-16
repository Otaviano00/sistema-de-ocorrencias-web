import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias-manager',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold text-slate-900">Categorias de ocorrência</h2>
          <span class="text-xs text-gray-400 font-medium">4 ativas • 1 inativa</span>
        </div>

        <!-- Tabela de Categorias -->
        <div class="overflow-x-auto mb-8">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th class="pb-3 font-semibold">Nome</th>
                <th class="pb-3 font-semibold text-center">Vínculos</th>
                <th class="pb-3 font-semibold text-center">Status</th>
                <th class="pb-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              @for (cat of categorias(); track cat.nome) {
                <tr class="hover:bg-gray-50/80 transition">
                  <td class="py-3.5 font-semibold text-slate-900 text-sm">{{ cat.nome }}</td>
                  <td class="py-3.5 text-center text-gray-600 text-xs">{{ cat.vinculos }}</td>
                  <td class="py-3.5 text-center">
                    @if (cat.ativa) {
                      <span class="inline-block text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded">Ativa</span>
                    } @else {
                      <span class="inline-block text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded">⚠️ Inativa</span>
                    }
                  </td>
                  <td class="py-3.5 text-right space-x-3 text-xs font-medium">
                    <button class="text-emerald-700 hover:text-emerald-800">Editar</button>
                    @if (cat.ativa) {
                      <button class="text-gray-400 hover:text-gray-600">Desativar</button>
                    } @else {
                      <button class="text-rose-600 hover:text-rose-700">Excluir...</button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Formulário Nova Categoria -->
      <div class="pt-6 border-t border-gray-100">
        <h3 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nova categoria</h3>
        <div class="flex gap-3">
          <input type="text" placeholder="Nome da categoria" class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          <button class="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2 rounded-lg text-sm shadow-sm transition">
            Adicionar
          </button>
        </div>
        <p class="text-[11px] text-gray-400 mt-2">
          Categorias novas são ativadas ao salvar. A exclusão definitiva só é permitida quando não há ocorrências vinculadas.
        </p>
      </div>
    </div>
  `
})
export class CategoriasManagerComponent {
  categorias = signal([
    { nome: 'Calçadas e vias', vinculos: 102, ativa: true },
    { nome: 'Iluminação pública', vinculos: 78, ativa: true },
    { nome: 'Limpeza urbana', vinculos: 42, ativa: true },
    { nome: 'Drenagem', vinculos: 26, ativa: true },
    { nome: 'Outros', vinculos: 0, ativa: false }
  ]);
}