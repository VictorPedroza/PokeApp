import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './components/layout/sidebar-component/sidebar-component';
import { HeaderComponent } from './components/layout/header-component/header-component';
import { SidebarItem } from './components/layout/sidebar-component/sidebar-item/sidebar-item';

import { LucideBookOpen, LucideHome, LucideMenu, LucideX } from '@lucide/angular';
import { LoadingComponent } from './components/common/loading-component/loading-component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, SidebarItem, LoadingComponent],
  imports: [CommonModule, RouterModule, LucideBookOpen, LucideHome, LucideMenu, LucideX],
  exports: [SidebarComponent, HeaderComponent, LoadingComponent],
})
export class SharedModule {}
