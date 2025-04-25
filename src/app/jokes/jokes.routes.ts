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
    path: 'flags/:id',
    loadComponent: () =>
      import('./jokes-flags/jokes-flags.component').then(
        (c) => c.JokesFlagsComponent
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
