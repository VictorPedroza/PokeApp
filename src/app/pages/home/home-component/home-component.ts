import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {
  navItens = [
    { title: 'Pokédex', desc: 'Consulte dados e tipos.', link: 'pokedex', color: 'border-red-500', icon: '🔴' },
    { title: 'Quiz Master', desc: 'Teste seus conhecimentos.', link: 'quiz', color: 'border-yellow-400', icon: '❓' },
    { title: 'Team Builder', desc: 'Monte a estratégia perfeita.', link: 'team-builder', color: 'border-blue-600', icon: '⚔️' }
  ];

  featuredPokemon = [
    { id: 131, name: 'Lapras', types: [{ name: 'ÁGUA', color: 'bg-blue-300' }, { name: 'GELO', color: 'bg-cyan-300' }], color: 'from-blue-50' },
    { id: 257, name: 'Blaziken', types: [{ name: 'FOGO', color: 'bg-red-300' }, { name: 'LUTADOR', color: 'bg-gray-300' }], color: 'from-orange-50' },
    { id: 94, name: 'Gengar', types: [{ name: 'FANTASMA', color: 'bg-purple-300' }, { name: 'VENENO', color: 'bg-green-300' }], color: 'from-purple-50' },
    { id: 154, name: 'Meganium', types: [{ name: 'GRAMA', color: 'bg-green-300' }], color: 'from-green-50' }
  ];

  getUrlImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
