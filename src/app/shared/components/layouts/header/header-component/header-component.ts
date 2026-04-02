import { Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  standalone: false,
  templateUrl: './header-component.html'
})
export class HeaderComponent {
  // Estado do menu mobile
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
