import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonMetaData, PokemonService } from './services/pokemon.service';
import { Store } from '@ngxs/store';
import { PokemonState } from './state/pokemon/pokemon.state';
import { PokemonActions } from './state/pokemon/pokemon.actions';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-pokeapi';
  private _store = inject(Store);
  total: Signal<number> = this._store.selectSignal(PokemonState.getTotalPokemons);
  displayedColumns = ['name', 'url'];
  constructor() {}

  ngOnInit(): void {
  }
  
  get test() {
    return this.title;
  }

}
