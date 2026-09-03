import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonType } from '../../../../shared/constants/pokemon/pokemon';
import { PokemonService } from '../../service/pokemon-service';

@Component({
  selector: 'pokemon-hero',
  standalone: false,
  templateUrl: './pokemon-hero.html'
})
export class PokemonHero {
  @Input() pokemon!: Pokemon;

  constructor (private pokemonService: PokemonService) {}

  getStyle(type: string) {
    return this.pokemonService.getTypeStyle(type);
  }
}

