import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layouts/header/header-component/header-component';
import { AppRoutingModule } from "../app-routing-module";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
