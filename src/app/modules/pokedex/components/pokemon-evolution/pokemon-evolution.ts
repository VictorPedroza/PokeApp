import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EvolutionChain } from '../../../../shared/constants';

@Component({
  selector: 'pokemon-evolution-chain',
  standalone: false,
  templateUrl: './pokemon-evolution.html',
})
export class PokemonEvolution {
  constructor(private router: Router) {}

  @Input({ required: true }) evolution!: EvolutionChain;

  navigate(pokemon: string): void {
    this.router.navigate(['/pokedex/pokemon', pokemon]);
  }
}
