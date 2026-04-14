import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../../shared/consants/pokemon/Pokemon';

/**
 * Card de exibição resumida de um Pokémon.
 *
 * Responsável por mostrar:
 * - Nome e imagem
 * - Tipo com cor associada
 * - Emissão de evento ao selecionar Pokémon
 */
@Component({
  selector: 'app-pokemon-card',
  standalone: false,
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  /** Dados do Pokémon exibido no card */
  @Input() pokemon!: Pokemon;
  /**
   * Evento emitido quando o card é selecionado.
   *
   * @param {Pokemon} pokemon - Pokémon clicado pelo usuário
   */
  @Output() selected = new EventEmitter<Pokemon>();

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
}
