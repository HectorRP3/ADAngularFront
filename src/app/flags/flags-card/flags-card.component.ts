import { Component, input } from '@angular/core';
import { Flag } from '../interfaces/flags';

@Component({
  selector: 'flags-card',
  imports: [],
  templateUrl: './flags-card.component.html',
  styleUrl: './flags-card.component.css',
})
export class FlagsCardComponent {
  flag = input.required<Flag>();
  number = input.required<number>();
}
