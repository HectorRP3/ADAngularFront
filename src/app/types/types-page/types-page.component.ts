import { Component, inject } from '@angular/core';
import { TypesService } from '../services/types.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TypesCardComponent } from '../types-card/types-card.component';

@Component({
  selector: 'types-page',
  imports: [FaIconComponent, TypesCardComponent],
  templateUrl: './types-page.component.html',
  styleUrl: './types-page.component.css',
})
export class TypesPageComponent {
  icon = { faPlus };
  #typesService = inject(TypesService);
  #router = inject(Router);

  types = rxResource({
    loader: () => this.#typesService.getTypes(),
  });

  goCreateTypes() {
    console.log('goCreateCategory');
    return this.#router.navigate(['/types', 'add']);
  }
}
