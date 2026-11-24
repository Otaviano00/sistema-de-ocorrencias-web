import { Component, computed, output, signal } from '@angular/core';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

@Component({
  selector: 'app-register-form',
  template: `
    <div class="w-full max-w-md mx-auto">
      <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
        Faça parte da mudança
      </span>
      <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Crie sua conta.
      </h2>
      <p class="text-sm text-gray-500 mb-7">
        Um só lugar para registrar problemas e acompanhar melhorias na sua região.
      </p>

      <form (submit)="onSubmit($event)" class="space-y-4">
        <!-- Nome completo -->
        <div class="flex flex-col gap-1.5">
          <label for="register-name" class="text-xs font-bold text-slate-800">
            Nome completo
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Como você se chama?"
            [value]="fullName()"
            (input)="fullName.set(readInputValue($event))"
            required
            class="bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition"
          />
        </div>

        <!-- E-mail -->
        <div class="flex flex-col gap-1.5">
          <label for="register-email" class="text-xs font-bold text-slate-800">
            E-mail
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="seuemail@exemplo.com"
            [value]="email()"
            (input)="email.set(readInputValue($event))"
            required
            class="bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition"
          />
        </div>

        <!-- Senha -->
        <div class="flex flex-col gap-1.5">
          <label for="register-password" class="text-xs font-bold text-slate-800">
            Senha
          </label>
          <div class="relative flex items-center">
            <input
              id="register-password"
              [type]="showPassword() ? 'text' : 'password'"
              placeholder="Crie uma senha"
              [value]="password()"
              (input)="password.set(readInputValue($event))"
              minlength="8"
              required
              class="w-full bg-white border border-gray-200 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition"
            />
            <button
              type="button"
              (click)="togglePasswordVisibility()"
              [attr.aria-label]="showPassword() ? 'Ocultar senha' : 'Mostrar senha'"
              class="absolute right-3 text-gray-400 hover:text-gray-700 text-sm focus:outline-none cursor-pointer"
            >
              @if (showPassword()) {
                <span>🙈</span>
              } @else {
                <span>👁️</span>
              }
            </button>
          </div>
          <span class="text-[11px] text-gray-400">
            Use pelo menos 8 caracteres.
          </span>
        </div>

        <!-- Confirmar senha -->
        <div class="flex flex-col gap-1.5">
          <label for="register-confirm-password" class="text-xs font-bold text-slate-800">
            Confirmar senha
          </label>
          <div class="relative flex items-center">
            <input
              id="register-confirm-password"
              [type]="showConfirmPassword() ? 'text' : 'password'"
              placeholder="Repita sua senha"
              [value]="confirmPassword()"
              (input)="confirmPassword.set(readInputValue($event))"
              minlength="8"
              required
              class="w-full bg-white border border-gray-200 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition"
            />
            <button
              type="button"
              (click)="toggleConfirmPasswordVisibility()"
              [attr.aria-label]="showConfirmPassword() ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'"
              class="absolute right-3 text-gray-400 hover:text-gray-700 text-sm focus:outline-none cursor-pointer"
            >
              @if (showConfirmPassword()) {
                <span>🙈</span>
              } @else {
                <span>👁️</span>
              }
            </button>
          </div>
          @if (passwordMismatch()) {
            <span class="text-[11px] font-medium text-rose-600" role="alert">
              As senhas não coincidem.
            </span>
          }
        </div>

        <!-- Aceite de termos -->
        <label class="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer select-none pt-1">
          <input
            type="checkbox"
            [checked]="acceptedTerms()"
            (change)="acceptedTerms.set(readCheckedValue($event))"
            required
            class="w-4 h-4 mt-0.5 rounded border-gray-300 text-emerald-700 focus:ring-emerald-700"
          />
          <span class="leading-relaxed">
            Li e aceito os
            <button
              type="button"
              (click)="termsClick.emit()"
              class="font-semibold text-emerald-800 hover:text-emerald-900 underline-offset-2 hover:underline cursor-pointer"
            >
              Termos de uso
            </button>
            e a
            <button
              type="button"
              (click)="privacyClick.emit()"
              class="font-semibold text-emerald-800 hover:text-emerald-900 underline-offset-2 hover:underline cursor-pointer"
            >
              Política de privacidade.
            </button>
          </span>
        </label>

        <!-- Botão Principal -->
        <button
          type="submit"
          class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <span>Criar minha conta</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <!-- Link Entrar -->
      <p class="text-xs text-center text-gray-500 mt-5">
        Já tem uma conta?
        <button
          type="button"
          (click)="loginClick.emit()"
          class="font-semibold text-emerald-800 hover:text-emerald-900 underline-offset-2 hover:underline cursor-pointer ml-0.5"
        >
          Entrar na minha conta
        </button>
      </p>

      <!-- Ajuda -->
      <p class="text-[11px] text-center text-gray-400 mt-10">
        Precisa de ajuda?
        <button
          type="button"
          (click)="helpClick.emit()"
          class="text-gray-500 hover:text-slate-700 underline-offset-2 hover:underline cursor-pointer ml-0.5"
        >
          Fale com a gente
        </button>
      </p>
    </div>
  `
})
export class RegisterFormComponent {
  fullName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  acceptedTerms = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  passwordMismatch = computed(() => {
    const pwd = this.password();
    const confirm = this.confirmPassword();
    return confirm.length > 0 && pwd !== confirm;
  });

  registerSubmit = output<RegisterPayload>();
  loginClick = output<void>();
  termsClick = output<void>();
  privacyClick = output<void>();
  helpClick = output<void>();

  togglePasswordVisibility() {
    this.showPassword.update(current => !current);
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.update(current => !current);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.passwordMismatch()) {
      return;
    }

    this.registerSubmit.emit({
      fullName: this.fullName(),
      email: this.email(),
      password: this.password(),
      acceptedTerms: this.acceptedTerms()
    });
  }

  protected readInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected readCheckedValue(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }
}