import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => 
      import("./modules/home/home-module")
        .then(m => m.HomeModule)
  },
  {
    path: "pokedex",
    loadChildren: () => 
      import("./modules/pokedex/pokedex-module")
        .then(m => m.PokedexModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
