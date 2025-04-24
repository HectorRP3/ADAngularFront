import { Component, inject } from '@angular/core';
import { PrimeraVezJokes } from '../interfaces/PrimeraVez';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ServicesService } from '../services/services.service';
import { PrimeraVezCardComponent } from '../primera-vez-card/primera-vez-card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'primera-vez-page',
  imports: [PrimeraVezCardComponent, FaIconComponent],
  templateUrl: './primera-vez-page.component.html',
  styleUrl: './primera-vez-page.component.css',
})
export class PrimeraVezPageComponent {
  #primeraVezService = inject(ServicesService);
  #router = inject(Router);
  icon = { faPlus, faFilter };
  primeraVez = rxResource({
    loader: () => this.#primeraVezService.getPrimeraVez(),
  });

  goCreatePrimeraVez() {
    return this.#router.navigate(['/primeravez', 'add']);
  }

  deletePrimeraVez(primeraVez: PrimeraVezJokes) {
    this.primeraVez.update((js) => js?.filter((j) => j !== primeraVez));
  }
}
