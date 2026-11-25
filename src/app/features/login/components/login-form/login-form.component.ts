import { Component, output, signal } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login-form',
  template: `
    <div class="w-full max-w-md mx-auto">
      <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
        Bem-vindo ao Zelar
      </span>
      <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Bom ter você por aqui.
      </h2>
      <p class="text-sm text-gray-500 mb-8">
        Entre para registrar ocorrências e acompanhar melhorias na sua cidade.
      </p>

      <form (submit)="onSubmit($event)" class="space-y-5">
        <!-- E-mail -->
        <div class="flex flex-col gap-1.5">
          <label for="login-email" class="text-xs font-bold text-slate-800">
            E-mail
          </label>
          <input
            id="login-email"
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
          <label for="login-password" class="text-xs font-bold text-slate-800">
            Senha
          </label>
          <div class="relative flex items-center">
            <input
              id="login-password"
              [type]="showPassword() ? 'text' : 'password'"
              placeholder="Digite sua senha"
              [value]="password()"
              (input)="password.set(readInputValue($event))"
              required
              class="w-full bg-white border border-gray-200 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition"
            />
            <button
              type="button"
              (click)="togglePasswordVisibility()"
              [attr.aria-label]="showPassword() ? 'Ocultar senha' : 'Mostrar senha'"
              class="absolute right-3 text-gray-400 hover:text-gray-700 text-sm focus:outline-none"
            >
              @if (showPassword()) {
                <span>🙈</span>
              } @else {
                <span>👁️</span>
              }
            </button>
          </div>
        </div>

        <!-- Manter conectada -->
        <label class="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer select-none pt-0.5">
          <input
            type="checkbox"
            [checked]="rememberMe()"
            (change)="rememberMe.set(readCheckedValue($event))"
            class="w-4 h-4 rounded border-gray-300 text-emerald-700 focus:ring-emerald-700"
          />
          <span>Manter minha conta conectada</span>
        </label>

        <!-- Botão Principal -->
        <button
          type="submit"
          class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Entrar na minha conta</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <!-- Link Criar Conta -->
      <p class="text-xs text-center text-gray-500 mt-5">
        Ainda não tem conta?
        <button
          type="button"
          (click)="registerClick.emit()"
          class="font-semibold text-emerald-800 hover:text-emerald-900 underline-offset-2 hover:underline cursor-pointer ml-0.5"
        >
          Criar minha conta
        </button>
      </p>

      <!-- Divisor -->
      <div class="flex items-center gap-3 my-6">
        <div class="h-px bg-gray-200 flex-1"></div>
        <span class="text-xs text-gray-400">ou explore sem entrar</span>
        <div class="h-px bg-gray-200 flex-1"></div>
      </div>

      <!-- Botão Consultar Mapa -->
      <button
        type="button"
        (click)="guestMapClick.emit()"
        class="w-full bg-white hover:bg-gray-50 border border-gray-200 text-emerald-800 font-semibold py-2.5 px-4 rounded-lg text-sm transition cursor-pointer"
      >
        Consultar mapa sem entrar
      </button>
    </div>
  `
})
export class LoginFormComponent {
  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  showPassword = signal(false);

  loginSubmit = output<LoginCredentials>();
  registerClick = output<void>();
  guestMapClick = output<void>();

  togglePasswordVisibility() {
    this.showPassword.update(current => !current);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loginSubmit.emit({
      email: this.email(),
      password: this.password(),
      rememberMe: this.rememberMe()
    });
  }

  protected readInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected readCheckedValue(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }
}