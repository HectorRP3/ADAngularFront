import { Component, inject, input } from '@angular/core';
import { Types } from '../interfaces/types';
import { Router } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'types-card',
  imports: [FaIconComponent],
  templateUrl: './types-card.component.html',
  styleUrl: './types-card.component.css',
})
export class TypesCardComponent {
  type = input.required<Types>();
  number = input<number>();
  icons = {
    faTrash,
    faEdit,
  };
  #router = inject(Router);

  goEdit() {
    this.#router.navigate(['/types', 'edit', this.type().id!]);
  }
}
