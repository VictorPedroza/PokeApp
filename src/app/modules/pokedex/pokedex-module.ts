import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PokedexRoutingModule } from './pokedex-routing-module';
import { SharedModule } from '../../shared/shared-module';

import { PokemonPage, PokedexPage } from './pages';
import { PokemonCard, PokemonEvolution, PokemonHero } from './components';

@NgModule({
  declarations: [PokedexPage, PokemonPage, PokemonCard, PokemonHero, PokemonEvolution],
  imports: [CommonModule, SharedModule, RouterModule, PokedexRoutingModule],
})
export class PokedexModule {}
