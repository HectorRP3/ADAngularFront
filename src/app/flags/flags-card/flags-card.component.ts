import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { Flag } from '../interfaces/flags';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FlagsService } from '../services/flags.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'flags-card',
  imports: [FaIconComponent],
  templateUrl: './flags-card.component.html',
  styleUrl: './flags-card.component.css',
})
export class FlagsCardComponent {
  flag = input.required<Flag>();
  number = input.required<number>();
  icons = { faTrash, faEdit, faPlus };
  #flagsService = inject(FlagsService);
  #destroyRef = inject(DestroyRef);
  delete = output<void>();
  #router = inject(Router);
  deleteFlags(id: number) {
    this.#flagsService
      .deleteFlag(id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.delete.emit());
  }

  goEdit() {
    this.#router.navigate(['/flags', 'edit', this.flag().id]);
  }
  goAddJokes() {
    this.#router.navigate(['/flags', 'jokes', this.flag().id]);
  }
}
