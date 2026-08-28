import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './components/layout/sidebar-component/sidebar-component';
import { HeaderComponent } from './components/layout/header-component/header-component';
import { SidebarItem } from './components/layout/sidebar-component/sidebar-item/sidebar-item';

import { LucideBookOpen } from '@lucide/angular';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, SidebarItem],
  imports: [CommonModule, RouterModule, LucideBookOpen],
  exports: [SidebarComponent, HeaderComponent],
})
export class SharedModule {}
