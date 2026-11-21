// src/app/app.routes.ts
import {Routes} from '@angular/router';
import {AdministracaoPageComponent} from './features/administracao/administracao.component';
import {MapaPageComponent} from './features/mapa/mapa.component';
import {ModeracaoPageComponent} from './features/moderacao/moderacao.component';
import {EstatisticasPageComponent} from './features/estatisticas/estatisticas.component';
import {AcompanhamentosPageComponent} from './features/acompanhamentos/acompanhamentos.component';
import {RegistrarOcorrenciaPageComponent} from './features/registrar-ocorrencia/registrar-ocorrencia.component';

export const routes: Routes = [
  {
    path: '',
    component: AdministracaoPageComponent,
  },
];
