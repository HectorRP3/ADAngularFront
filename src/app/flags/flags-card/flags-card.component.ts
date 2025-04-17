import { Component, input } from '@angular/core';
import { Flag } from '../interfaces/flags';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'flags-card',
  imports: [FaIconComponent],
  templateUrl: './flags-card.component.html',
  styleUrl: './flags-card.component.css',
})
export class FlagsCardComponent {
  flag = input.required<Flag>();
  number = input.required<number>();
  icons = { faTrash, faEdit, faPlus };
}
