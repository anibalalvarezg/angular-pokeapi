import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PokemonData } from '../../services/pokemon.service';
import { PokemonState } from '../../state/pokemon/pokemon.state';
import { PokemonInfoComponent } from '../pokemon-info/pokemon-info.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-favorite-pokemon-dialog',
  standalone: true,
  imports: [PokemonInfoComponent, MatDialogModule],
  templateUrl: './favorite-pokemon-dialog.component.html',
  styleUrl: './favorite-pokemon-dialog.component.scss',
})
export class FavoritePokemonDialogComponent {
  private _store = inject(Store);
  constructor(public dialogRef: MatDialogRef<FavoritePokemonDialogComponent>) {}

  favoritePokemon: Signal<PokemonData | null> = this._store.selectSignal(
    PokemonState.getFavoritePokemon
  );

  onClose(): void {
    this.dialogRef.close(true);
  }
}
