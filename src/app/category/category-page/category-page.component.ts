import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'category-page',
  imports: [FaIconComponent, CategoryCardComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css',
})
export class CategoryPageComponent {
  icon = { faPlus };
  #categorieService = inject(CategoryService);
  #router = inject(Router);

  categories = rxResource({
    loader: () => this.#categorieService.getCategory(),
  });

  goCreateCategory() {
    console.log('goCreateCategory');
    return this.#router.navigate(['/category', 'add']);
  }
}
