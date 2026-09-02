import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../shared/constants/pokemon/pokemon';

@Component({
  selector: 'pokemon-hero',
  standalone: false,
  templateUrl: './pokemon-hero.html'
})
export class PokemonHero {
  @Input() pokemon!: Pokemon;
}
