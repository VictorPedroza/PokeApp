import { Component, Input } from '@angular/core';
import { EvolutionChain } from '../../../../shared/constants/pokemon/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-evolution-chain-component',
  standalone: false,
  templateUrl: './evolution-chain-component.html',
})
export class EvolutionChainComponent {
  @Input({ required: true }) evolution!: EvolutionChain;
}
