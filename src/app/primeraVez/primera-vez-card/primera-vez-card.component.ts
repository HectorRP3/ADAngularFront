import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ServicesService } from '../services/services.service';
import { PrimeraVezJokes } from '../interfaces/PrimeraVez';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'primera-vez-card',
  imports: [FaIconComponent],
  templateUrl: './primera-vez-card.component.html',
  styleUrl: './primera-vez-card.component.css',
})
export class PrimeraVezCardComponent {
  primeraVez = input.required<PrimeraVezJokes>();
  number = input<number>();
  icons = { faTrash, faEdit };
  delete = output<void>();
  #primeraVezService = inject(ServicesService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  deletePrimeraVez(id: number) {
    this.#primeraVezService
      .deletePrimeraVez(id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.delete.emit());
  }

  goEdit() {
    this.#router.navigate(['/primeravez', 'edit', this.primeraVez().id!]);
  }
}
