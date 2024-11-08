import { Component, inject, Signal } from '@angular/core';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { AlphabetTableComponent } from './components/alphabet-table/alphabet-table.component';
import { PokemonData } from './services/pokemon.service';
import { Store } from '@ngxs/store';
import { PokemonState } from './state/pokemon/pokemon.state';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { FavoritePokemonDialogComponent } from './components/favorite-pokemon-dialog/favorite-pokemon-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PokemonTableComponent,
    PokemonCardComponent,
    AlphabetTableComponent,
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _store = inject(Store);
  readonly dialog = inject(MatDialog);

  title = 'angular-pokeapi';
  favoritePokemon: Signal<PokemonData | null> = this._store.selectSignal(
    PokemonState.getFavoritePokemon
  );

  constructor() {}

  onClick() {
    this.dialog.open(FavoritePokemonDialogComponent);
  }
}
