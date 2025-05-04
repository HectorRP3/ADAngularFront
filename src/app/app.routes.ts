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
    path: 'primeravez',
    title: 'PrimeraVez | SPRING JOKES',
    loadChildren: () =>
      import('./primeraVez/primeraVez.routes').then((m) => m.primeraVezRoutes),
  },
  {
    path: 'category',
    title: 'Category | SPRING JOKES',
    loadChildren: () =>
      import('./category/category.routes').then((m) => m.categoryRoutes),
  },
  {
    path: 'types',
    title: 'Types | SPRING JOKES',
    loadChildren: () =>
      import('./types/types.routes').then((m) => m.typesRoutes),
  },
  {
    path: 'languages',
    title: 'Languages | SPRING JOKES',
    loadChildren: () =>
      import('./languages/languages.routes').then((m) => m.languagesRoutes),
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
