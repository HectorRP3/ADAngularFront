import { Routes } from '@angular/router';

export const flagsRoutes: Routes = [
  {
    path: '',
    title: 'FLAGS | SPRING JOKES',
    loadComponent: () =>
      import('./flags-page/flags-page.component').then(
        (c) => c.FlagsPageComponent
      ),
  },
  {
    path: 'add',
    title: 'Añadir FLAGS  | SPRING JOKES',
    loadComponent: () =>
      import('./flags-form/flags-form.component').then(
        (c) => c.FlagsFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./flags-card/flags-card.component').then(
        (c) => c.FlagsCardComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./flags-form/flags-form.component').then(
        (c) => c.FlagsFormComponent
      ),
  },
];
