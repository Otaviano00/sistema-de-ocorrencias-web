import {Routes} from '@angular/router';
import {ModeracaoPageComponent} from './moderacao.component';

export const MODERACAO_ROUTES: Routes = [
  {
    path: '',
    component: ModeracaoPageComponent,
  },
  {
    path: ':ocorrenciaId',
    component: ModeracaoPageComponent,
  },
];
