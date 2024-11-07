import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface PokeAPI {
  count: number;
  next: string;
  previous: any;
  results: PokemonMetaData[];
}

export interface PokemonMetaData {
  name: string;
  url: string;
}

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly _url = 'https://pokeapi.co/api/v2/pokemon/'
  private _http = inject(HttpClient)

  getTotalPokemons(): Observable<number> {
    return this._http.get<PokeAPI>(this._url).pipe(map(response => response.count));
  }

  getPokemons(offset = 0, limit = 20): Observable<PokemonMetaData[]> {
    const params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit);
    return this._http.get<PokeAPI>(this._url, { params }).pipe(map(response => response.results));
  }

  getPokemonById(url: string): Observable<PokemonData> {
    return this._http.get<PokemonData>(url);
  }
}
