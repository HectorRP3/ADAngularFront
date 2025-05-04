import { Routes } from '@angular/router';

export const typesRoutes: Routes = [
  {
    path: '',
    title: ' PrimeraVex | SPRING JOKES',
    loadComponent: () =>
      import('./types-page/types-page.component').then(
        (c) => c.TypesPageComponent
      ),
  },
  {
    path: 'add',
    title: 'Añadir PrimeraVex  | SPRING JOKES',
    loadComponent: () =>
      import('./types-form/types-form.component').then(
        (c) => c.TypesFormComponent
      ),
  },
  {
    path: 'edit/:id',
    title: 'Editar PrimeraVex  | SPRING JOKES',
    loadComponent: () =>
      import('./types-form/types-form.component').then(
        (c) => c.TypesFormComponent
      ),
  },
];
