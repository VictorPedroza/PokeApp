import { Component, Input } from '@angular/core';
import { QuizState } from '../../constants/Quiz';

@Component({
  selector: 'app-quiz-feedback-component',
  standalone: false,
  templateUrl: './quiz-feedback-component.html',
})
export class QuizFeedbackComponent {
  @Input() state: QuizState = 'playing';
  @Input() pokemonName = '';
  @Input() pointsEarned = 0;
}
