import {Routes} from '@angular/router';
import {MapaPageComponent} from './mapa.component';

export const MAPA_ROUTES: Routes = [
  {
    path: '',
    component: MapaPageComponent,
  },
  {
    path: ':ocorrenciaId',
    component: MapaPageComponent,
  },
];
