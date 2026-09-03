import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../shared/constants/pokemon/pokemon';
import { PokemonService } from '../../service/pokemon-service';

@Component({
  selector: 'pokemon-card',
  standalone: false,
  templateUrl: './pokemon-card.html'
})
export class PokemonCard {
  @Input() pokemon!: Pokemon;

  constructor (private pokemonService: PokemonService) {}

    getStyle(type: string) {
      return this.pokemonService.getTypeStyle(type);
    }
}
