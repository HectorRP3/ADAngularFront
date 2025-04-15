import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  title = 'Angular-Jokes';
  year: number = new Date().getFullYear();
  author = 'Hector Rodriguez';
}
