import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/pokemon-details/pokemon-details.page').then((m) => m.PokemonDetailsPage),
  },
];