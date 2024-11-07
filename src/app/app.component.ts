import { Component } from '@angular/core';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pokeapi';
  constructor() {}
}
