import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../../shared/consants/pokemon/Pokemon';

/**
 * Modal de detalhes de um Pokémon.
 *
 * Responsável por exibir informações completas como:
 * - Estatísticas
 * - Tipos com cores dinâmicas
 * - Detalhes visuais do Pokémon selecionado
 *
 */
@Component({
  selector: 'app-pokemon-modal',
  standalone: false,
  templateUrl: './pokemon-modal.html',
})
export class PokemonModal {
  /** Pokémon selecionado para exibição no modal */
  @Input() pokemon!: Pokemon;

  /** Evento emitido quando o modal é fechado */
  @Output() closed = new EventEmitter<void>();

  typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  /**
   * Mapeamento de cores por tipo de Pokémon.
   *
   * @param {string} type - Tipo do Pokemon (Exemplo: fire, water...)
   **/
  getColorType(type: string): string {
    return this.typeColors[type] || '#68A090';
  }

  /**
   * Calcula largura da barra de estatística do Pokémon
   * 
   * @param {number} value - Valor do Status
   * 
   * @returns Percentual para o CSS (Exemplo: 45%)
   **/
  getStatBarWidth(value: number): string {
    return `${Math.min((value / 255) * 100, 100)}%`;
  }
}
