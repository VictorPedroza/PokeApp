import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../shared/constants/pokemon/pokemon';

@Component({
  selector: 'pokemon-card',
  standalone: false,
  templateUrl: './pokemon-card.html'
})
export class PokemonCard {
  @Input() pokemon!: Pokemon;
}
