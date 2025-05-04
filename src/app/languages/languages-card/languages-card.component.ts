import { Component, inject, input } from '@angular/core';
import { Language } from '../interfaces/languages';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'languages-card',
  imports: [FaIconComponent],
  templateUrl: './languages-card.component.html',
  styleUrl: './languages-card.component.css',
})
export class LanguagesCardComponent {
  language = input.required<Language>();
  number = input<number>();
  icons = {
    faTrash,
    faEdit,
  };
  #router = inject(Router);

  goEdit() {
    this.#router.navigate(['/languages', 'edit', this.language().id!]);
  }
}
