import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar-item',
  standalone: false,
  templateUrl: './sidebar-item.html',
})
export class SidebarItem {
  @Input() label = '';
  @Input() routerLink = '';
  @Input() exact: boolean = true;
}
