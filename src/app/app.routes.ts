import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mapa',
    pathMatch: 'full'
  },
  {
    path: 'mapa',
    loadChildren: () =>
      import('./features/mapa/mapa.routes').then(m => m.MAPA_ROUTES)
  },
  {
    path: 'registrar-ocorrencia',
    loadChildren: () =>
      import('./features/registrar-ocorrencia/registrar-ocorrencia.routes').then(
        m => m.REGISTRAR_OCORRENCIA_ROUTES
      )
  },
  {
    path: 'acompanhamentos',
    loadChildren: () =>
      import('./features/acompanhamentos/acompanhamentos.routes').then(
        m => m.ACOMPANHAMENTOS_ROUTES
      )
  },
  {
    path: 'estatisticas',
    loadChildren: () =>
      import('./features/estatisticas/estatisticas.routes').then(m => m.ESTATISTICAS_ROUTES)
  },
  {
    path: 'moderacao',
    loadChildren: () =>
      import('./features/moderacao/moderacao.routes').then(m => m.MODERACAO_ROUTES)
  },
  {
    path: 'administracao',
    loadChildren: () =>
      import('./features/administracao/administracao.routes').then(m => m.ADMINISTRACAO_ROUTES)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.routes').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./features/cadastro/cadastro.routes').then(m => m.CADASTRO_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'mapa'
  }
];