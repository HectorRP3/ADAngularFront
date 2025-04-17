import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { JokeResource } from '../interfaces/jokes';
import { JokesCardComponent } from '../jokes-card/jokes-card.component';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'jokes-page',
  imports: [JokesCardComponent, FaIconComponent],
  templateUrl: './jokes-page.component.html',
  styleUrl: './jokes-page.component.css',
})
export class JokesPageComponent {
  #jokesService = inject(JokesService);
  #router = inject(Router);
  icon = faPlus;
  jokes = rxResource({
    loader: () => this.#jokesService.getJokes(),
  });
  goCreateJokes() {
    return this.#router.navigate(['/jokes', 'add']);
  }

  deleteJokes(joke: JokeResource) {
    this.jokes.update((js) => js?.filter((j) => j !== joke));
  }
}
