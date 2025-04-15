import { Routes } from '@angular/router';

export const jokesRoutes: Routes = [
  {
    path: '',
    title: 'JOKES | SPRING JOKES',
    loadComponent: () =>
      import('./jokes-page/jokes-page.component').then(
        (c) => c.JokesPageComponent
      ),
  },
  {
    path: 'add',
    title: 'Añadir JOKES  | SPRING JOKES',
    loadComponent: () =>
      import('./jokes-form/jokes-form.component').then(
        (c) => c.JokesFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./jokes-detail/jokes-detail.component').then(
        (c) => c.JokesDetailComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./jokes-form/jokes-form.component').then(
        (c) => c.JokesFormComponent
      ),
  },
];
