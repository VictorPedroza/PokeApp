import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing-module';
import { PokedexPage } from './pages/pokedex-page/pokedex-page';
import { PokemonCard } from './components/pokemon-card/pokemon-card';
import { PokemonHero } from './components/pokemon-hero/pokemon-hero';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [PokedexPage, PokemonCard, PokemonHero],
  imports: [CommonModule, SharedModule, PokedexRoutingModule],
})
export class PokedexModule {}
