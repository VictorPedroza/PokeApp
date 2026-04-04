import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Pokemon } from '../../shared/consants/pokemon/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 151, offset: number = 0): Observable<Pokemon[]> {
    console.log('Buscando lista de Pokémon...');

    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map(response => {
          console.log('Lista recebida:', response);
          return response.results;
        }),
        switchMap((pokemons: any[]) => {
          console.log(`Buscando detalhes de ${pokemons.length} Pokémon...`);
          const requests = pokemons.map(pokemon =>
            this.http.get<Pokemon>(pokemon.url)
          );
          return forkJoin(requests);
        }),
        map((pokemons: Pokemon[]) => {
          console.log(`${pokemons.length} Pokémon carregados com sucesso`);
          console.log('Exemplo do primeiro Pokémon:', pokemons[0]);
          return pokemons;
        }),
        catchError(error => {
          console.error('Erro ao carregar Pokémon:', error);
          return of([]);
        })
      );
  }
}
