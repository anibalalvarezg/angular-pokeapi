import { AfterViewInit, Component, inject, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { PokemonState } from '../../state/pokemon/pokemon.state';
import { PokemonMetaData } from '../../services/pokemon.service';
import { PokemonActions } from '../../state/pokemon/pokemon.actions';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './pokemon-table.component.html',
  styleUrl: './pokemon-table.component.scss'
})
export class PokemonTableComponent implements AfterViewInit {
  private _store = inject(Store);
  total$: Signal<number> = this._store.selectSignal(PokemonState.getTotalPokemons);
  pokemons$: Signal<PokemonMetaData[]> = this._store.selectSignal(PokemonState.getPokemons);
  displayedColumns = ['name', 'url'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
}
