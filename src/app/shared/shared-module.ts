import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layouts/header/header-component/header-component';
import { AppRoutingModule } from "../app-routing-module";
import { LucideHouse, LucideX } from '@lucide/angular';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [CommonModule, AppRoutingModule, LucideHouse, LucideX],
  exports: [HeaderComponent, LucideHouse, LucideX],
})
export class SharedModule {}
