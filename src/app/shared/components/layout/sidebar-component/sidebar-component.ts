import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideHome } from '@lucide/angular';

@Component({
  selector: 'sidebar-component',
  standalone: false,
  templateUrl: './sidebar-component.html'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();
}
