import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BrandPanelComponent } from '../../shared/components/brand-panel/brand-panel.component';
import {
  LoginFormComponent,
  LoginCredentials
} from './components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  imports: [BrandPanelComponent, LoginFormComponent],
  template: `
    <div class="min-h-screen bg-[#f9fbf9] text-slate-800 flex flex-col lg:flex-row">
      <app-brand-panel />

      <div class="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div class="flex justify-end mb-8 lg:mb-0">
          <button
            type="button"
            (click)="goToMap()"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-slate-900 transition cursor-pointer"
          >
            <span aria-hidden="true">←</span>
            <span>Voltar ao mapa</span>
          </button>
        </div>

        <main class="flex-1 flex items-center justify-center py-4">
          <app-login-form
            (loginSubmit)="handleLogin($event)"
            (registerClick)="goToRegister()"
            (guestMapClick)="goToMap()"
          />
        </main>

        <div class="hidden lg:block h-4"></div>
      </div>
    </div>
  `
})
export class LoginPageComponent {
  private router = inject(Router);

  handleLogin(credentials: LoginCredentials) {
    console.log('Tentativa de login:', credentials);
    this.router.navigate(['/mapa']);
  }

  goToRegister() {
    this.router.navigate(['/cadastro']);
  }

  goToMap() {
    this.router.navigate(['/mapa']);
  }
}