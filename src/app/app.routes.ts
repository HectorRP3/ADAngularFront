import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'jokes',
    loadChildren: () =>
      import('./jokes/jokes.routes').then((m) => m.jokesRoutes),
  },
  {
    path: 'flags',
    loadChildren: () =>
      import('./flags/flags.routes').then((m) => m.flagsRoutes),
  },
  {
    path: 'home',
    title: 'HOME | SPRING JOKES',
    loadComponent: () =>
      import('./shared/home/home.component').then((m) => m.HomeComponent),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
