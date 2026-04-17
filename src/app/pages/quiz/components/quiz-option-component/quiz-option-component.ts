import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../../shared/consants/pokemon/Pokemon';

@Component({
  selector: 'app-quiz-option-component',
  standalone: false,
  templateUrl: './quiz-option-component.html',
})
export class QuizOptionComponent {
  @Input() options: Pokemon[] = [];
  @Input() correctId: number | null = null;
  @Input() selectedId: number | null = null;

  @Output() optionSelected = new EventEmitter<Pokemon>();

  get answered(): boolean {
    return this.selectedId !== null;
  }

  getOptionClass(pokemon: Pokemon): string {
  if (!this.answered)
    return 'border-gray-200 bg-white text-gray-700 hover:border-yellow-300 hover:bg-yellow-50 cursor-pointer';
  if (pokemon.id === this.correctId)
    return 'border-green-500 bg-green-50 text-green-800';
  if (pokemon.id === this.selectedId)
    return 'border-red-500 bg-red-50 text-red-800';
  return 'border-gray-200 bg-white text-gray-400 opacity-50 cursor-default';
}
}
