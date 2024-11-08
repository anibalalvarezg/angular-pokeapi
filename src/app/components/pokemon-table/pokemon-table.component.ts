import {
  AfterViewInit,
  Component,
  inject,
  Signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { PokemonState } from '../../state/pokemon/pokemon.state';
import { PokemonMetaData } from '../../services/pokemon.service';
import { PokemonActions } from '../../state/pokemon/pokemon.actions';
import { ExtractPokemonIdPipe } from '../../pipes/extract-pokemon-id.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    ExtractPokemonIdPipe,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './pokemon-table.component.html',
  styleUrl: './pokemon-table.component.scss',
})
export class PokemonTableComponent implements AfterViewInit {
  private _store = inject(Store);
  total$: Signal<number> = this._store.selectSignal(
    PokemonState.getTotalPokemons
  );
  searhControl: FormControl = new FormControl('');
  dataSource: MatTableDataSource<PokemonMetaData> = new MatTableDataSource();
  displayedColumns = ['#', 'name', 'url'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this._store.selectSnapshot(PokemonState.getAllPokemons)
    );
    this.searhControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value: string) => {
        this.applyFilter(value);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onClick(url: string) {
    this._store.dispatch(new PokemonActions.GetPokemonById(url));
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
