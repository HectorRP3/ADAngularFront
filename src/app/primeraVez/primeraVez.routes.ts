import { Routes } from '@angular/router';

export const primeraVezRoutes: Routes = [
  {
    path: '',
    title: ' PrimeraVex | SPRING JOKES',
    loadComponent: () =>
      import('./primera-vez-page/primera-vez-page.component').then(
        (c) => c.PrimeraVezPageComponent
      ),
  },
  {
    path: 'add',
    title: 'Añadir PrimeraVex  | SPRING JOKES',
    loadComponent: () =>
      import('./primera-vez-form/primera-vez-form.component').then(
        (c) => c.PrimeraVezFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./primera-vez-detail/primera-vez-detail.component').then(
        (c) => c.PrimeraVezDetailComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./primera-vez-form/primera-vez-form.component').then(
        (c) => c.PrimeraVezFormComponent
      ),
  },
];
