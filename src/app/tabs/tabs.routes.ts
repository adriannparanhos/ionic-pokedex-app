import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pokedex',
        loadComponent: () =>
          import('../pokemon-list/pokemon-list.page').then((m) => m.PokemonListPage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('../favorites/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/pokedex',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/pokedex',
    pathMatch: 'full',
  },
];
