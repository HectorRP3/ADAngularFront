import { Component, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Types, TypesInsert } from '../interfaces/types';
import { TypesService } from '../services/types.service';

@Component({
  selector: 'types-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './types-form.component.html',
  styleUrl: './types-form.component.css',
})
export class TypesFormComponent {
  #typesService = inject(TypesService);
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);
  #title = inject(Title);
  id = input<number>();
  typesPlues = signal<Types>({
    id: 0,
    type: '',
  });

  types = this.#fb.group({
    type: ['', { validators: [], nonNullable: true }],
  });

  typesResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) =>
      this.#typesService.getTypeById(id).pipe(
        tap((c) => {
          this.#title.setTitle(c.id + '| SPRING TYPES');
          this.typesPlues().id = c.id;
          this.typesPlues().type = c.type;
          console.log(this.typesPlues());
        })
      ),
  });

  constructor() {
    effect(() => {
      if (this.typesResource.value()) {
        this.types.patchValue({
          type: this.typesPlues().type,
        });
      }
    });
  }

  addTypes() {
    const type: TypesInsert = {
      type: this.types.value.type!,
    };
    if (this.typesPlues().id === 0) {
      this.#typesService.addType(type).subscribe(() => {
        this.#router.navigate(['/types']);
      });
    } else {
      this.#typesService.updateType(type, this.id()!).subscribe(() => {
        this.#router.navigate(['/types']);
      });
    }
  }
}
