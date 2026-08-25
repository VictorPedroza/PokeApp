import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/layout/sidebar-component/sidebar-component';
import { HeaderComponent } from './components/layout/header-component/header-component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, HeaderComponent],
})
export class SharedModule {}
