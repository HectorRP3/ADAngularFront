import { Component, effect, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FlagResource } from '../../flags/interfaces/flags';
import { FlagsService } from '../../flags/services/flags.service';
import { Joke } from '../interfaces/jokes';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'jokes-flags',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './jokes-flags.component.html',
  styleUrl: './jokes-flags.component.css',
})
export class JokesFlagsComponent {
  #flags = inject(FlagsService);
  #jokeService = inject(JokesService);
  #fb = inject(NonNullableFormBuilder);
  id = input.required<number>();
  #router = inject(Router);

  flagsResource = rxResource({
    loader: () => this.#flags.getFlags(),
  });

  jokesFlagsForm = this.#fb.group({
    flags: this.#fb.array(
      new Array(this.flagsResource.value()?.length).fill(true)
    ),
  });

  jokesResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) => this.#jokeService.getJokeById(id),
  });

  constructor() {
    effect(() => {
      const flags = this.flagsResource.value();
      const flagsArray = this.jokesFlagsForm.get('flags') as FormArray;
      const selectedFlags = this.jokesResource.value()?.flags;

      if (flags && flags.length !== flagsArray.length) {
        flagsArray.clear();
        flags.forEach((flag) => {
          console.log(selectedFlags);
          const isSelected = selectedFlags?.includes(flag.flag);
          console.log(isSelected);
          flagsArray.push(this.#fb.control(isSelected));
        });
      }
    });
  }
  languages = [
    { id: 1, name: 'Czech' },
    { id: 2, name: 'German' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Spanish' },
    { id: 5, name: 'French' },
    { id: 6, name: 'Portuguese' },
  ];
  categories = [
    { id: 1, name: 'Any' },
    { id: 2, name: 'Misc' },
    { id: 3, name: 'Programming' },
    { id: 4, name: 'Dark' },
    { id: 5, name: 'Pun' },
    { id: 6, name: 'Spooky' },
    { id: 7, name: 'Christmas' },
  ];
  types = [
    { id: 1, name: 'single' },
    { id: 2, name: 'twopart' },
  ];

  addFlag() {
    const categoriName = this.categories.find(
      (c) => c.name === this.jokesResource.value()?.category
    );
    const typeName = this.types.find(
      (t) => t.name === this.jokesResource.value()?.type
    );

    const languageName = this.languages.find(
      (l) => l.name === this.jokesResource.value()?.language
    );
    const flagResorource: FlagResource[] = this.flagsResource.value() ?? [];
    console.log(flagResorource);
    const selectedFlags: FlagResource[] = flagResorource.filter(
      (flag, index) => {
        return (this.jokesFlagsForm.value.flags ?? [])[index] === true;
      }
    );
    const newFlagses: FlagResource[] = selectedFlags.map((flag) => {
      return {
        id: flag.id,
        flag: flag.flag,
      };
    });
    console.log(newFlagses);
    const jokeNew: Joke = {
      id: this.id()!,
      text1: this.jokesResource.value()?.text1,
      text2: this.jokesResource.value()?.text2,
      categories: {
        id: categoriName?.id ?? 0,
        category: categoriName?.name ?? '',
      },
      types: {
        id: typeName?.id ?? 0,
        type: typeName?.name ?? '',
      },
      language: {
        id: languageName?.id ?? 0,
      },
      flagses: newFlagses,
    };
    console.log(jokeNew);
    this.#jokeService.updateJoke2(jokeNew, this.id()!).subscribe({
      next: () => {
        this.#router.navigate(['/jokes']);
      },
    });
  }
}
