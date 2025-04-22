import { Component, effect, inject, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { JokeResource } from '../interfaces/jokes';
import { JokesCardComponent } from '../jokes-card/jokes-card.component';
import { JokesService } from '../services/jokes.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jokes-page',
  imports: [JokesCardComponent, FaIconComponent, FormsModule],
  templateUrl: './jokes-page.component.html',
  styleUrl: './jokes-page.component.css',
})
export class JokesPageComponent {
  #jokesService = inject(JokesService);
  #router = inject(Router);
  icon = { faPlus, faFilter };
  jokes = rxResource({
    loader: () => this.#jokesService.getJokes(this.search()),
  });
  search = signal('');
  searchDebounce = toSignal(
    toObservable(this.search).pipe(debounceTime(600), distinctUntilChanged())
  );

  constructor() {
    effect(() => {
      if (this.searchDebounce()) {
        this.#jokesService.getJokes(this.search()).subscribe((jokes) => {
          this.jokes.update(() => jokes);
        });
      } else {
        this.#jokesService.getJokes().subscribe((jokes) => {
          this.jokes.update(() => jokes);
        });
      }
    });
  }
  goCreateJokes() {
    return this.#router.navigate(['/jokes', 'add']);
  }

  deleteJokes(joke: JokeResource) {
    this.jokes.update((js) => js?.filter((j) => j !== joke));
  }

  goFilterWithPrimeraVez() {
    console.log('goFilterWithPrimeraVez');
    this.#jokesService.getJokesWithPrimeraVez().subscribe((jokes) => {
      this.jokes.update(() => jokes);
    });
  }
  goFilterWithoutPrimeraVez() {
    console.log('goFilterWithoutPrimeraVez');
    this.#jokesService.getJokesWithoutPrimeraVez().subscribe((jokes) => {
      this.jokes.update(() => jokes);
    });
  }
  goResetFilter() {
    this.#jokesService.getJokes().subscribe((jokes) => {
      this.jokes.update(() => jokes);
    });
  }
}
