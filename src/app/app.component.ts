import { Component } from '@angular/core';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { AlphabetTableComponent } from './components/alphabet-table/alphabet-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonTableComponent, PokemonCardComponent, AlphabetTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pokeapi';
  constructor() {}
}
