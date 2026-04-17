import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-header',
  standalone: false,
  templateUrl: './quiz-header-component.html',
})
export class QuizHeaderComponent {
  @Input() currentQuestion = 0;
  @Input() totalQuestions = 10;
  @Input() score = 0;
  @Input() sessionScore = 0;
}
