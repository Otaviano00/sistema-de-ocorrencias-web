import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  imports: [CommonModule],
  template: `
    <div
      class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between mb-6"
    >
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <span
          class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold"
          >✓</span
        >
        <span class="text-gray-500">Localização confirmada</span>
      </div>
      <div class="h-px bg-gray-200 flex-1 mx-4"></div>
      <div
        class="flex items-center gap-2 text-sm font-semibold text-emerald-700"
      >
        <span
          class="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs"
          >2</span
        >
        <span>Descreva o problema</span>
      </div>
      <div class="h-px bg-gray-200 flex-1 mx-4"></div>
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <span
          class="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs"
          >3</span
        >
        <span>Revise e confirme</span>
      </div>
    </div>
  `,
})
export class StepIndicatorComponent {}
