import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../shared/constants/pokemon/pokemon';
import { PokemonService } from '../../service/pokemon-service';
import { Router } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  standalone: false,
  templateUrl: './pokemon-card.html'
})
export class PokemonCard {
  @Input() pokemon!: Pokemon;

  constructor (private pokemonService: PokemonService, private router: Router ) {}

    getStyle(type: string) {
      return this.pokemonService.getTypeStyle(type);
    }

    navigate() {
      this.router.navigate(['/pokedex/pokemon', this.pokemon.id]);
    }
}
