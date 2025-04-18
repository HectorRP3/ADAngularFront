import { Component, effect, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JokeResource, JokeResourceInsert } from '../../jokes/interfaces/jokes';
import { JokesService } from '../../jokes/services/jokes.service';
import { flagInsert2 } from '../interfaces/flags';
import { FlagsService } from '../services/flags.service';

@Component({
  selector: 'flags-jokes',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './flags-jokes.component.html',
  styleUrl: './flags-jokes.component.css',
})
export class FlagsJokesComponent {
  #flagsService = inject(FlagsService);
  #jokeService = inject(JokesService);
  #fb = inject(NonNullableFormBuilder);
  id = input.required<number>();
  #router = inject(Router);

  jokesResources = rxResource({
    loader: () => this.#jokeService.getJokes(),
  });

  flagJokesForm = this.#fb.group({
    jokes: this.#fb.array(new Array([])),
  });

  flagResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) => this.#flagsService.getFlagById(id),
  });

  constructor() {
    effect(() => {
      console.log(this.flagResource.value());
      const jokes = this.jokesResources.value();
      const jokesArray = this.flagJokesForm.get('jokes') as FormArray;
      const selectedJokes = this.flagResource.value()?.jokeses;
      if (jokes && jokes.length !== jokesArray.length) {
        jokesArray.clear();
        jokes.forEach((joke) => {
          const isSelected = selectedJokes?.some(
            (selectedJoke) => selectedJoke === joke.id
          );
          jokesArray.push(this.#fb.control(isSelected));
        });
      }
    });
  }

  addJokes() {
    const jokesResor: JokeResource[] = this.jokesResources.value() ?? [];
    const seletectedJokes = jokesResor.filter((joke, index) => {
      return this.flagJokesForm.get('jokes')?.value[index] === true;
    });
    const jokesId: JokeResourceInsert[] = seletectedJokes.map((joke) => {
      return {
        id: joke.id,
      };
    });
    console.log(jokesId);
    const flagNew: flagInsert2 = {
      id: this.flagResource.value()?.id ?? 0,
      flag: this.flagResource.value()?.flag ?? '',
      jokeses: jokesId,
    };

    console.log(flagNew);

    this.#flagsService
      .updateFlag2(flagNew, this.flagResource.value()?.id ?? 0)
      .subscribe(() => {
        this.#router.navigate(['/flags']);
      });
  }
}
