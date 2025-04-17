import { Component, input } from '@angular/core';
import { JokeResource } from '../interfaces/jokes';
import { JokesCardComponent } from '../jokes-card/jokes-card.component';

@Component({
  selector: 'jokes-detail',
  imports: [JokesCardComponent],
  templateUrl: './jokes-detail.component.html',
  styleUrl: './jokes-detail.component.css',
})
export class JokesDetailComponent {
  jokes = input.required<JokeResource>();
}
