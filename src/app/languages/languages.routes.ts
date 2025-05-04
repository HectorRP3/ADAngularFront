import { Routes } from '@angular/router';

export const languagesRoutes: Routes = [
  {
    path: '',
    title: ' Languages | SPRING JOKES',
    loadComponent: () =>
      import('./languages-page/languages-page.component').then(
        (c) => c.LanguagesPageComponent
      ),
  },
  {
    path: 'add',
    title: 'Añadir Languages  | SPRING JOKES',
    loadComponent: () =>
      import('./languages-form/languages-form.component').then(
        (c) => c.LanguagesFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./languages-form/languages-form.component').then(
        (c) => c.LanguagesFormComponent
      ),
  },
];
