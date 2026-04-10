import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Pokemon } from '../../shared/consants/pokemon/Pokemon';

export interface PokemonPage {
  pokemons: Pokemon[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 20, offset: number = 0): Observable<PokemonPage> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      switchMap((response) => {
        const total = response.count;
        const requests = response.results.map((pokemon: any) =>
          this.http.get<Pokemon>(pokemon.url),
        );
        return forkJoin(requests as Observable<Pokemon>[]).pipe(
          map((pokemons: Pokemon[]) => ({ pokemons, total })),
        );
      }),
      catchError((error) => {
        console.error('Erro ao carregar Pokémon:', error);
        return of({ pokemons: [], total: 0 });
      }),
    );
  }
}
