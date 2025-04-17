import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { JokeResource } from '../interfaces/jokes';
import { JokesService } from '../services/jokes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jokes-card',
  imports: [FaIconComponent],
  templateUrl: './jokes-card.component.html',
  styleUrl: './jokes-card.component.css',
})
export class JokesCardComponent {
  joke = input.required<JokeResource>();
  number = input<number>();
  icons = { faTrash, faEdit };
  delete = output<void>();
  #jokesService = inject(JokesService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  deleteJokes(id: number) {
    this.#jokesService
      .deleteJoke(id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.delete.emit());
  }
  goEdit() {
    this.#router.navigate(['/jokes', 'edit', this.joke().id!]);
  }

  goAddFlags() {
    this.#router.navigate(['/jokes', 'flags', this.joke().id!]);
  }
}
