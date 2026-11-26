import {Component, OnDestroy, OnInit, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';

export interface CurrentLocationInfo {
  label: string;
  coordsText: string;
  status: 'loading' | 'located' | 'fallback';
}

export interface OccurrencePhotoPreview {
  fileName: string;
  previewUrl: string;
}

export interface OccurrenceDraft {
  titulo: string;
  categoria: string;
  descricao: string;
  localizacao: string;
  photoName?: string;
}

@Component({
  selector: 'app-registrar-ocorrencia-page',
  imports: [SidebarComponent],
  template: `
    <div class="flex h-screen bg-gray-50 text-slate-800 overflow-hidden">
      <app-sidebar activeItem="registrar" />

      <div class="flex-1 flex flex-col min-w-0">
        <!-- Topbar -->
        <header
          class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 shrink-0"
        >
          <div class="flex items-center gap-3 text-sm text-gray-600 min-w-0">
            <span
              class="flex items-center gap-1.5 font-semibold text-slate-900 whitespace-nowrap"
            >
              <span aria-hidden="true">📍</span>
              <span>{{ location().label }}</span>
            </span>
            <span class="text-gray-300" aria-hidden="true">|</span>
            <span class="truncate">Plataforma de participação cidadã</span>
          </div>

          <div class="flex items-center gap-4 shrink-0">
            <button
              type="button"
              (click)="navigateTo('/acompanhamentos')"
              class="text-sm text-gray-600 hover:text-slate-900 transition cursor-pointer"
            >
              Área do cidadão
            </button>
            <button
              type="button"
              (click)="navigateTo('/login')"
              class="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-slate-800 text-xs font-medium px-3.5 py-2 rounded-lg transition cursor-pointer"
            >
              Minha conta · Cidadão
            </button>
          </div>
        </header>

        <!-- Conteúdo Principal -->
        <main class="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div class="max-w-3xl mx-auto">
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
            >
              <div>
                <span
                  class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1"
                >
                  Participação cidadã
                </span>
                <h1
                  class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight"
                >
                  Registrar ocorrência
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 mt-1">
                  A ocorrência será vinculada automaticamente à sua localização
                  atual.
                </p>
              </div>

              <button
                type="button"
                (click)="goToMap()"
                class="bg-white hover:bg-gray-50 border border-gray-200 text-slate-800 font-medium px-4 py-2 rounded-lg text-sm transition cursor-pointer self-start sm:self-auto"
              >
                ← Voltar ao mapa
              </button>
            </div>

            <!-- Banner da Localização Atual -->
            <div
              class="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div class="flex items-start gap-3">
                <span class="text-base mt-0.5" aria-hidden="true">📍</span>
                <div>
                  <p class="text-xs font-bold text-emerald-950">
                    Localização atual: {{ location().label }}
                  </p>
                  <p class="text-[11px] text-emerald-800 mt-0.5">
                    {{ location().coordsText }}
                  </p>
                </div>
              </div>

              <button
                type="button"
                (click)="detectCurrentLocation()"
                class="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline-offset-2 hover:underline cursor-pointer shrink-0"
              >
                Atualizar localização
              </button>
            </div>

            <!-- Formulário de Registro -->
            <form
              (submit)="openConfirmModal($event)"
              class="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs space-y-5"
            >
              <div class="flex flex-col gap-1.5">
                <label
                  for="occ-titulo"
                  class="text-xs font-bold text-slate-800"
                >
                  Título da ocorrência
                </label>
                <input
                  id="occ-titulo"
                  type="text"
                  placeholder="Ex.: Buraco na calçada próximo à travessia"
                  [value]="titulo()"
                  (input)="titulo.set(readInputValue($event))"
                  required
                  class="bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  for="occ-categoria"
                  class="text-xs font-bold text-slate-800"
                >
                  Categoria
                </label>
                <select
                  id="occ-categoria"
                  [value]="categoria()"
                  (change)="categoria.set(readSelectValue($event))"
                  class="bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Calçadas e vias">Calçadas e vias</option>
                  <option value="Iluminação pública">Iluminação pública</option>
                  <option value="Coleta e limpeza">Coleta e limpeza</option>
                  <option value="Áreas verdes e praças">
                    Áreas verdes e praças
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  for="occ-descricao"
                  class="text-xs font-bold text-slate-800"
                >
                  Descrição
                </label>
                <textarea
                  id="occ-descricao"
                  rows="4"
                  placeholder="Descreva o problema encontrado na sua localização atual..."
                  [value]="descricao()"
                  (input)="descricao.set(readTextareaValue($event))"
                  required
                  class="bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                ></textarea>
              </div>

              <!-- Foto (Opcional) -->
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <label
                    for="occ-foto"
                    class="text-xs font-bold text-slate-800"
                  >
                    Foto da ocorrência
                  </label>
                  <span class="text-[11px] text-gray-400">Opcional</span>
                </div>

                <label
                  for="occ-foto"
                  class="border border-dashed border-gray-300 hover:border-emerald-700 bg-gray-50/70 hover:bg-emerald-50/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition cursor-pointer"
                >
                  <span class="text-lg mb-1" aria-hidden="true">📷</span>
                  <span class="text-xs font-semibold text-slate-800">
                    Clique para escolher uma imagem
                  </span>
                  <span class="text-[11px] text-gray-500 mt-0.5">
                    PNG, JPG ou WEBP · Ajuda na validação da ocorrência
                  </span>
                  <input
                    id="occ-foto"
                    type="file"
                    accept="image/*"
                    (change)="onPhotoSelected($event)"
                    class="sr-only"
                  />
                </label>

                @if (photo(); as currentPhoto) {
                  <div
                    class="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <img
                        [src]="currentPhoto.previewUrl"
                        [alt]="currentPhoto.fileName"
                        class="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                      <div class="min-w-0">
                        <p
                          class="text-xs font-semibold text-slate-900 truncate"
                        >
                          {{ currentPhoto.fileName }}
                        </p>
                        <p class="text-[11px] text-emerald-700">Foto anexada</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      (click)="removePhoto()"
                      class="text-xs font-medium text-rose-600 hover:text-rose-700 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition cursor-pointer shrink-0"
                    >
                      Remover
                    </button>
                  </div>
                }
              </div>

              <div class="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="goToMap()"
                  class="bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 font-medium px-4 py-2.5 rounded-lg text-sm transition cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  class="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>

    <!-- Pop-up de Revisão e Confirmação -->
    @if (showConfirmModal()) {
      <div
        class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <div
          class="bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto"
        >
          <div>
            <span
              class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1"
            >
              Revisão do registro
            </span>
            <h2
              id="confirm-modal-title"
              class="text-xl font-extrabold text-slate-900"
            >
              Revise e confirme sua ocorrência
            </h2>
            <p class="text-xs text-gray-500 mt-1">
              Confira os dados abaixo antes de confirmar o pedido de registro na
              sua localização atual.
            </p>
          </div>

          <div
            class="bg-gray-50 border border-gray-200/80 rounded-xl p-4 space-y-3 text-sm"
          >
            <div>
              <span
                class="text-[11px] font-semibold text-gray-400 uppercase block"
                >Título</span
              >
              <p class="font-semibold text-slate-900">{{ titulo() }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span
                  class="text-[11px] font-semibold text-gray-400 uppercase block"
                  >Categoria</span
                >
                <p class="font-medium text-slate-800">{{ categoria() }}</p>
              </div>
              <div>
                <span
                  class="text-[11px] font-semibold text-gray-400 uppercase block"
                  >Localização atual</span
                >
                <p class="font-medium text-slate-800">{{ location().label }}</p>
              </div>
            </div>

            <div>
              <span
                class="text-[11px] font-semibold text-gray-400 uppercase block"
                >Descrição</span
              >
              <p
                class="text-gray-700 text-xs leading-relaxed whitespace-pre-line"
              >
                {{ descricao() }}
              </p>
            </div>

            <div>
              <span
                class="text-[11px] font-semibold text-gray-400 uppercase block mb-1"
                >Foto</span
              >
              @if (photo(); as currentPhoto) {
                <div class="flex items-center gap-3">
                  <img
                    [src]="currentPhoto.previewUrl"
                    [alt]="currentPhoto.fileName"
                    class="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
                  />
                  <span class="text-xs font-medium text-slate-800 truncate">
                    {{ currentPhoto.fileName }}
                  </span>
                </div>
              } @else {
                <p class="text-xs text-gray-500">
                  Nenhuma foto anexada (opcional).
                </p>
              }
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              (click)="closeConfirmModal()"
              class="bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 font-medium px-4 py-2.5 rounded-lg text-sm transition cursor-pointer"
            >
              Revisar novamente
            </button>

            <button
              type="button"
              (click)="confirmRegistration()"
              class="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition cursor-pointer"
            >
              Confirmar registro
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class RegistrarOcorrenciaPageComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  titulo = signal('');
  categoria = signal('Calçadas e vias');
  descricao = signal('');
  photo = signal<OccurrencePhotoPreview | null>(null);
  showConfirmModal = signal(false);

  location = signal<CurrentLocationInfo>({
    label: 'Brasília, DF',
    coordsText: 'Obtendo localização atual...',
    status: 'loading',
  });

  ngOnInit() {
    this.detectCurrentLocation();
  }

  ngOnDestroy() {
    this.revokeCurrentPhotoUrl();
  }

  detectCurrentLocation() {
    this.location.set({
      label: 'Brasília, DF',
      coordsText: 'Capturando localização atual...',
      status: 'loading',
    });

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      this.location.set({
        label: 'Brasília, DF',
        coordsText: 'Localização padrão (Brasília, DF)',
        status: 'fallback',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude.toFixed(5);
        const lng = pos.coords.longitude.toFixed(5);
        this.location.set({
          label: 'Localização atual (Brasília, DF)',
          coordsText: `Lat ${lat}, Lng ${lng}`,
          status: 'located',
        });
      },
      () => {
        this.location.set({
          label: 'Brasília, DF',
          coordsText:
            'Permissão não concedida · Usando localização padrão (Brasília, DF)',
          status: 'fallback',
        });
      },
      {enableHighAccuracy: true, timeout: 8000},
    );
  }

  onPhotoSelected(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    const file = inputEl.files?.[0];
    if (!file) {
      return;
    }

    this.revokeCurrentPhotoUrl();
    const previewUrl = URL.createObjectURL(file);
    this.photo.set({
      fileName: file.name,
      previewUrl,
    });

    inputEl.value = '';
  }

  removePhoto() {
    this.revokeCurrentPhotoUrl();
    this.photo.set(null);
  }

  openConfirmModal(event: Event) {
    event.preventDefault();
    this.showConfirmModal.set(true);
  }

  closeConfirmModal() {
    this.showConfirmModal.set(false);
  }

  confirmRegistration() {
    const payload: OccurrenceDraft = {
      titulo: this.titulo(),
      categoria: this.categoria(),
      descricao: this.descricao(),
      localizacao: `${this.location().label} (${this.location().coordsText})`,
      photoName: this.photo()?.fileName,
    };

    console.log('Ocorrência confirmada:', payload);
    this.showConfirmModal.set(false);
    void this.router.navigate(['/acompanhamentos']);
  }

  goToMap() {
    void this.router.navigate(['/mapa']);
  }

  navigateTo(route: string) {
    void this.router.navigate([route]);
  }

  private revokeCurrentPhotoUrl() {
    const current = this.photo();
    if (current?.previewUrl) {
      URL.revokeObjectURL(current.previewUrl);
    }
  }

  protected readInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected readSelectValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }

  protected readTextareaValue(event: Event): string {
    return (event.target as HTMLTextAreaElement).value;
  }
}
