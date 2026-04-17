import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-result-component',
  standalone: false,
  templateUrl: './quiz-result-component.html'
})
export class QuizResultComponent {
  @Input() score = 0;
  @Input() maxScore = 0;
  @Input() scoreMessage = '';
  @Input() isNewHighScore = false;
  @Output() restart = new EventEmitter<void>();
}
