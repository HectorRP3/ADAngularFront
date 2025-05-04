import { Routes } from '@angular/router';

export const categoryRoutes: Routes = [
  {
    path: '',
    title: ' Category | SPRING JOKES',
    loadComponent: () =>
      import('./category-page/category-page.component').then(
        (c) => c.CategoryPageComponent
      ),
  },
  {
    path: 'add',
    title: 'Añadir Category  | SPRING JOKES',
    loadComponent: () =>
      import('./category-form/category-form.component').then(
        (c) => c.CategoryFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./category-form/category-form.component').then(
        (c) => c.CategoryFormComponent
      ),
  },
];
