import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { PokemonState } from '../../state/pokemon/pokemon.state';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-alphabet-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule],
  templateUrl: './alphabet-table.component.html',
  styleUrl: './alphabet-table.component.scss',
})
export class AlphabetTableComponent implements OnInit, AfterViewInit {
  private _store = inject(Store);
  displayedColumns = ['letter', 'count'];
  dataSource!: MatTableDataSource<{ letter: string; count: number }>;

  letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase());
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.proceessData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  proceessData() {
    const pokemonArray = this._store.selectSnapshot(
      PokemonState.getAllPokemons
    );
    const alphabetCount = this.letters.map((letter) => {
      const count = pokemonArray.reduce((acc, pokemon) => {
        return pokemon.name.charAt(0).toLowerCase() === letter ? acc + 1 : acc;
      }, 0);
      return { letter, count };
    });

    this.dataSource = new MatTableDataSource(alphabetCount);
  }
}
