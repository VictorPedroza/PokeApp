import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  LucideBookOpen,
  LucideHome,
  LucideLayers,
  LucideMap,
  LucideMenu,
  LucideX,
} from '@lucide/angular';

import { HeaderComponent } from './components/layout/header-component/header-component';

import { LoadingComponent } from './components/common/loading-component/loading-component';
import { Sidebar } from './components/layout/sidebar/sidebar';
import { SidebarHead } from './components/layout/sidebar/components/sidebar-head/sidebar-head';
import { SidebarFoot } from './components/layout/sidebar/components/sidebar-foot/sidebar-foot';
import { SidebarItem } from './components/layout/sidebar/components/sidebar-item/sidebar-item';
@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    Sidebar,
    SidebarHead,
    SidebarFoot,
    SidebarItem,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideBookOpen,
    LucideHome,
    LucideMap,
    LucideLayers,
    LucideMenu,
    LucideX,
  ],
  exports: [Sidebar, HeaderComponent, LoadingComponent],
})
export class SharedModule {}
