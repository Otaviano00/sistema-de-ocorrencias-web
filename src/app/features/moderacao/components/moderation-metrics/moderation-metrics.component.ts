import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moderation-metrics',
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-extrabold text-slate-900 mb-0.5">08</h2>
          <p class="text-xs text-gray-500">ocorrências pendentes</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-extrabold text-amber-600 mb-0.5">03</h2>
          <p class="text-xs text-gray-500">aguardando validação</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-extrabold text-emerald-700 mb-0.5">05</h2>
          <p class="text-xs text-gray-500">validadas, ainda pendentes</p>
        </div>
      </div>
    </div>
  `
})
export class ModerationMetricsComponent {}