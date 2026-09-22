import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing-module';
import { PokedexPage } from './pages/pokedex-page/pokedex-page';
import { PokemonCard } from './components/pokemon-card/pokemon-card';
import { PokemonHero } from './components/pokemon-hero/pokemon-hero';
import { SharedModule } from '../../shared/shared-module';
import { PokedexPokemonPage } from './pages/pokedex-pokemon-page/pokedex-pokemon-page';
import { RouterModule } from '@angular/router';
import { EvolutionChainComponent } from './components/evolution-chain-component/evolution-chain-component';

@NgModule({
  declarations: [
    PokedexPage,
    PokemonCard,
    PokemonHero,
    PokedexPokemonPage,
    EvolutionChainComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, PokedexRoutingModule],
})
export class PokedexModule {}
