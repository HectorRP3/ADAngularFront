import { Component, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Category, CategoryInsert } from '../interfaces/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'category-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
  #categoryService = inject(CategoryService);
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);
  #title = inject(Title);
  id = input<number>();
  categoryPlues = signal<Category>({
    id: 0,
    category: '',
  });

  category = this.#fb.group({
    category: ['', { validators: [], nonNullable: true }],
  });

  categoryResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) =>
      this.#categoryService.getCategoryById(id).pipe(
        tap((c) => {
          this.#title.setTitle(c.id + '| SPRING CATEGORIES');
          this.categoryPlues().id = c.id;
          this.categoryPlues().category = c.category;
          console.log(this.categoryPlues());
        })
      ),
  });

  constructor() {
    effect(() => {
      if (this.categoryResource.value()) {
        this.category.patchValue({
          category: this.categoryPlues().category,
        });
      }
    });
  }

  addCategory() {
    const CategoryInsert: CategoryInsert = {
      category: this.category.value.category!,
    };
    if (this.categoryPlues().id === 0) {
      this.#categoryService.createCategory(CategoryInsert).subscribe(() => {
        this.#router.navigate(['/category']);
      });
    } else {
      const category: Category = {
        id: this.categoryPlues().id,
        category: this.category.value.category!,
      };
      this.#categoryService.updateCategory(category).subscribe(() => {
        this.#router.navigate(['/category']);
      });
    }
  }
}
