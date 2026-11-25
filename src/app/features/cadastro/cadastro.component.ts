import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {BrandPanelComponent} from '../../shared/components/brand-panel/brand-panel.component';
import {
  RegisterFormComponent,
  RegisterPayload,
} from './components/register-form/register-form.component';

@Component({
  selector: 'app-cadastro-page',
  imports: [BrandPanelComponent, RegisterFormComponent],
  template: `
    <div
      class="min-h-screen bg-[#f9fbf9] text-slate-800 flex flex-col lg:flex-row"
    >
      <app-brand-panel />

      <div class="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div class="flex justify-end mb-6 lg:mb-0">
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
          <app-register-form
            (registerSubmit)="handleRegister($event)"
            (loginClick)="goToLogin()"
            (termsClick)="openTerms()"
            (privacyClick)="openPrivacy()"
            (helpClick)="openHelp()"
          />
        </main>

        <div class="hidden lg:block h-4"></div>
      </div>
    </div>
  `,
})
export class CadastroPageComponent {
  private router = inject(Router);

  handleRegister(payload: RegisterPayload) {
    console.log('Dados de cadastro enviados:', payload);
    void this.router.navigate(['/mapa']);
  }

  goToLogin() {
    void this.router.navigate(['/login']);
  }

  goToMap() {
    void this.router.navigate(['/mapa']);
  }

  openTerms() {
    console.log('Abrir termos de uso');
  }

  openPrivacy() {
    console.log('Abrir política de privacidade');
  }

  openHelp() {
    console.log('Abrir canal de ajuda');
  }
}
