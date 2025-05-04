import { Component, inject, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Category } from '../interfaces/category';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'category-card',
  imports: [FaIconComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  category = input.required<Category>();
  number = input<number>();
  icons = {
    faTrash,
    faEdit,
  };
  #router = inject(Router);

  goEdit() {
    this.#router.navigate(['/category', 'edit', this.category().id!]);
  }
}
