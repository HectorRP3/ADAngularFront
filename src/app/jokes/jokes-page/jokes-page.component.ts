import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { JokesCardComponent } from '../jokes-card/jokes-card.component';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'jokes-page',
  imports: [JokesCardComponent],
  templateUrl: './jokes-page.component.html',
  styleUrl: './jokes-page.component.css',
})
export class JokesPageComponent {
  #jokesService = inject(JokesService);

  jokes = rxResource({
    loader: () => this.#jokesService.getJokes(),
  });
}
