import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonService } from '../../../services/pokemon/pokemon-service';
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';

@Injectable()
export class PokemonSearchService {
  constructor(private pokemonService: PokemonService) {}

  search(term: string, localList: Pokemon[]): Observable<{ pokemons: Pokemon[]; error: string | null }> {
    const normalized = term.trim().toLowerCase();

    if (!normalized) return of({ pokemons: localList, error: null });

    return this.pokemonService.searchPokemon(normalized).pipe(
      map(pokemon => {
        if (pokemon) return { pokemons: [pokemon], error: null };

        const filtered = localList.filter(
          p => p.name.toLowerCase().includes(normalized) || p.id.toString().includes(normalized)
        );

        return {
          pokemons: filtered,
          error: filtered.length === 0 ? 'Pokémon não encontrado.' : null,
        };
      }),
    );
  }
}