import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexPage } from './pages/pokedex-page/pokedex-page';
import { PokedexPokemonPage } from './pages/pokedex-pokemon-page/pokedex-pokemon-page';

const routes: Routes = [
  { path: "", component: PokedexPage },
  { path: "pokemon/:id", component: PokedexPokemonPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
