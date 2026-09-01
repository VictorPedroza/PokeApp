import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing-module';
import { PokedexPage } from './pages/pokedex-page/pokedex-page';
import { PokemonCard } from './components/pokemon-card/pokemon-card';

@NgModule({
  declarations: [PokedexPage, PokemonCard],
  imports: [CommonModule, PokedexRoutingModule],
})
export class PokedexModule {}
