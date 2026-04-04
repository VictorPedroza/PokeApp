import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layouts/header/header-component/header-component';
import { AppRoutingModule } from "../app-routing-module";
import { LucideMenu, LucideX } from '@lucide/angular';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [CommonModule, AppRoutingModule, LucideMenu, LucideX],
  exports: [HeaderComponent, LucideMenu, LucideX],
})
export class SharedModule {}
