// src/app/app.routes.ts
import {Routes} from '@angular/router';
import {AdministracaoPageComponent} from './features/administracao/administracao.component';

export const routes: Routes = [
  {
    path: '',
    component: AdministracaoPageComponent,
  },
];
