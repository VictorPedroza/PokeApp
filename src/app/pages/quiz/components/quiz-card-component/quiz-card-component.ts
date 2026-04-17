import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BLUR_STEPS } from '../../constants/Quiz';

@Component({
  selector: 'app-quiz-card-component',
  standalone: false,
  templateUrl: './quiz-card-component.html',
})
export class QuizCardComponent {
  @Input() spriteUrl = '';
  @Input() pokemonName = '';
  @Input() revealed = false;
  @Input() blurStep = 0; // 0 = máximo blur (nível 1 início)
  @Input() hasBlur = false; // true apenas no nível 1
  @Input() canRequestHint = false;

  @Output() hintRequested = new EventEmitter<void>();

  imageFilter = 'brightness(0)';

  get showHintButton(): boolean {
    return this.hasBlur && this.canRequestHint && !this.revealed;
  }

  ngOnChanges(): void {
    this._updateFilter();
  }

  private _updateFilter(): void {
    if (this.revealed) {
      this.imageFilter = 'none';
      return;
    }
    if (this.hasBlur) {
      const blur = BLUR_STEPS[this.blurStep] ?? BLUR_STEPS[0];
      // silhueta preta + blur combinados
      this.imageFilter = blur > 0 ? `brightness(0) blur(${blur}px)` : 'brightness(0)';
    } else {
      this.imageFilter = 'brightness(0)';
    }
  }
}
