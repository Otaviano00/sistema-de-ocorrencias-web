import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div class="flex items-center gap-4 text-sm text-gray-600">
        <span class="flex items-center gap-1 font-medium text-slate-900">📍 Brasília, DF</span>
        <span class="text-gray-300">|</span>
        <span>Plataforma de participação cidadã</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-600 cursor-pointer hover:text-black">Consulta pública</span>
        <button class="bg-gray-100 hover:bg-gray-200 text-slate-800 text-sm font-medium px-4 py-2 rounded-lg transition">
          Entrar na plataforma
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent {}