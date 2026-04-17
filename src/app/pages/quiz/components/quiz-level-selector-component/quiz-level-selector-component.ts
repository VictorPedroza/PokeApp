import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LEVEL_CONFIGS, QuizLevel } from '../../constants/Quiz';

interface LevelOption {
  value: QuizLevel;
  emoji: string;
  label: string;
  description: string;
  basePoints: number;
}

@Component({
  selector: 'app-quiz-level-selector-component',
  standalone: false,
  templateUrl: './quiz-level-selector-component.html',
})
export class QuizLevelSelectorComponent {
  @Input() selected: QuizLevel = 1;
  @Output() levelChange = new EventEmitter<QuizLevel>();

  levelOptions: LevelOption[] = [
    {
      value: 1,
      emoji: '🌱',
      label: LEVEL_CONFIGS[1].label,
      description: LEVEL_CONFIGS[1].description,
      basePoints: LEVEL_CONFIGS[1].basePoints,
    },
    {
      value: 2,
      emoji: '⚡',
      label: LEVEL_CONFIGS[2].label,
      description: LEVEL_CONFIGS[2].description,
      basePoints: LEVEL_CONFIGS[2].basePoints,
    },
    {
      value: 3,
      emoji: '🔥',
      label: LEVEL_CONFIGS[3].label,
      description: LEVEL_CONFIGS[3].description,
      basePoints: LEVEL_CONFIGS[3].basePoints,
    },
  ];

  select(level: QuizLevel): void {
    this.levelChange.emit(level);
  }
}
