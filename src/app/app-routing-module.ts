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
  },
  {
    path: "region",
    loadChildren: () =>
      import("./modules/region/region-module")
        .then(m => m.RegionModule)
  },
  {
    path: "type",
    loadChildren: () =>
      import("./modules/type/type-module")
        .then(m => m.TypeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
