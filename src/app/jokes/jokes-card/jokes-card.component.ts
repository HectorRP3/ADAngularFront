import { Component, input } from '@angular/core';
import { Joke } from '../interfaces/jokes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'jokes-card',
  imports: [RouterLink],
  templateUrl: './jokes-card.component.html',
  styleUrl: './jokes-card.component.css',
})
export class JokesCardComponent {
  joke = input.required<Joke>();
  number = input<number>();
}
