import { AfterViewInit, Component, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonMetaData } from './services/pokemon.service';
import { Store } from '@ngxs/store';
import { PokemonState } from './state/pokemon/pokemon.state';
import { PokemonActions } from './state/pokemon/pokemon.actions';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-pokeapi';
  private _store = inject(Store);
  total$: Signal<number> = this._store.selectSignal(PokemonState.getTotalPokemons);
  pokemons$: Signal<PokemonMetaData[]> = this._store.selectSignal(PokemonState.getPokemons);
  displayedColumns = ['name', 'url'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this._store.dispatch(new PokemonActions.GetPokemons({ offset: 0, limit: 20}));
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe().subscribe((result) => {
      this._store.dispatch(new PokemonActions.GetPokemons({ offset: result.pageIndex * result.pageSize, limit: 20}));
    });
  }

  onClick(url: string) {
    
  }
  
  get test() {
    return this.title;
  }

}
