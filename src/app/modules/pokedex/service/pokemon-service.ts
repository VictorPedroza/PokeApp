import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/service/api-service';
import { Pokemon, PokemonResponse } from '../../../shared/constants/pokemon/pokemon';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private api: ApiService) {}

  buscarPokemons(): Observable<Pokemon[]> {
    return this.api.get<PokemonResponse>(this.baseUrl, 'pokemon').pipe(
      switchMap((response) => {
        const requests = response.results.map((pokemon) => this.buscarPokemon(pokemon.name));

        return forkJoin(requests);
      }),
    );
  }

  buscarPokemon(pokemon: string) {
    return this.api.get<Pokemon>(this.baseUrl, `pokemon/${pokemon}`);
  }
}
